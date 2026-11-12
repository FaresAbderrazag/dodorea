import type {
  CharacterRequest,
  ImageGenerationProvider,
  ImageResult,
  SceneRequest,
} from "../types.js";

/** Tarifs officiels Standard au 2026-11-11, $ par million de jetons (docs/research/m0-openai-conditions.md). */
export const PRICING_USD_PER_MTOK = {
  imageInput: 8,
  textInput: 5,
  imageOutput: 30,
} as const;

export interface OpenAIUsage {
  input_tokens?: number;
  output_tokens?: number;
  input_tokens_details?: { image_tokens?: number; text_tokens?: number };
}

/** Coût en euros ; 1 $ = 1 € par défaut (surestime légèrement le coût, prudent pour le plafond). */
export function costFromUsage(u: OpenAIUsage, eurPerUsd = 1): number {
  const imageIn = u.input_tokens_details?.image_tokens ?? 0;
  const textIn =
    u.input_tokens_details?.text_tokens ??
    Math.max(0, (u.input_tokens ?? 0) - imageIn);
  const out = u.output_tokens ?? 0;
  const p = PRICING_USD_PER_MTOK;
  return (
    ((imageIn * p.imageInput + textIn * p.textInput + out * p.imageOutput) /
      1e6) *
    eurPerUsd
  );
}

export class ProviderError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code: string,
    public readonly retryable: boolean,
    public readonly retryAfterMs?: number,
  ) {
    super(message);
    this.name = "ProviderError";
  }
}

export interface OpenAIOptions {
  apiKey: string;
  model: string;
  quality: "low" | "medium" | "high";
  size: string;
  /** Estimation prudente par appel pour la garde de budget (avant mesure réelle). */
  estimateEur: number;
  maxRetries?: number;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
  sleep?: (ms: number) => Promise<void>;
}

function mimeOf(bytes: Uint8Array): string {
  if (bytes[0] === 0x89 && bytes[1] === 0x50) return "image/png";
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return "image/jpeg";
  if (bytes[0] === 0x52 && bytes[1] === 0x49) return "image/webp";
  throw new ProviderError(
    "Format d'image non supporté (PNG, JPEG ou WebP attendu)",
    0,
    "unsupported_image",
    false,
  );
}

/** Adaptateur `/v1/images/edits` : génère une image à partir d'une image de référence. */
export class OpenAIProvider implements ImageGenerationProvider {
  readonly id = "openai";
  private readonly fetchImpl: typeof fetch;
  private readonly sleep: (ms: number) => Promise<void>;

  constructor(private readonly o: OpenAIOptions) {
    if (!o.apiKey) throw new Error("OPENAI_API_KEY manquante");
    this.fetchImpl = o.fetchImpl ?? fetch;
    this.sleep = o.sleep ?? ((ms) => new Promise((r) => setTimeout(r, ms)));
  }

  estimateCostEur(): number {
    return this.o.estimateEur;
  }

  generateCharacter(req: CharacterRequest): Promise<ImageResult> {
    return this.edit(req.photo, req.stylePrompt, req.faceId);
  }

  generateScene(req: SceneRequest): Promise<ImageResult> {
    return this.edit(
      req.characterReference,
      `${req.stylePrompt}\n${req.scenePrompt}`,
      req.faceId,
    );
  }

  private async edit(
    image: Uint8Array,
    prompt: string,
    faceId: string,
  ): Promise<ImageResult> {
    const maxRetries = this.o.maxRetries ?? 2;
    for (let attempt = 0; ; attempt++) {
      try {
        return await this.once(image, prompt, faceId);
      } catch (e) {
        if (
          !(e instanceof ProviderError) ||
          !e.retryable ||
          attempt >= maxRetries
        )
          throw e;
        await this.sleep(
          Math.min(e.retryAfterMs ?? 15_000 * 2 ** attempt, 60_000),
        );
      }
    }
  }

  private async once(
    image: Uint8Array,
    prompt: string,
    faceId: string,
  ): Promise<ImageResult> {
    const mime = mimeOf(image);
    const form = new FormData();
    form.append("model", this.o.model);
    form.append("prompt", prompt);
    form.append("quality", this.o.quality);
    form.append("size", this.o.size);
    form.append("n", "1");
    // Identifiant opaque, aucune donnée personnelle.
    form.append("safety_identifier", `dodorea-m0-${faceId}`);
    form.append(
      "image[]",
      new Blob([new Uint8Array(image)], { type: mime }),
      `ref.${mime.split("/")[1]}`,
    );

    const started = Date.now();
    let res: Response;
    try {
      res = await this.fetchImpl("https://api.openai.com/v1/images/edits", {
        method: "POST",
        headers: { Authorization: `Bearer ${this.o.apiKey}` },
        body: form,
        signal: AbortSignal.timeout(this.o.timeoutMs ?? 180_000),
      });
    } catch (e) {
      throw new ProviderError(
        `Erreur réseau ou délai dépassé (${e instanceof Error ? e.name : "inconnue"})`,
        0,
        "network",
        true,
      );
    }
    const durationMs = Date.now() - started;
    const requestId = res.headers.get("x-request-id") ?? "";

    if (!res.ok) {
      let code = "unknown";
      let detail = "";
      try {
        const err = (
          (await res.json()) as { error?: { code?: string; message?: string } }
        ).error;
        code = err?.code ?? "unknown";
        detail = (err?.message ?? "").slice(0, 200);
      } catch {
        /* corps non JSON */
      }
      // Un 429 peut aussi signaler un crédit ou quota épuisé : seule la limite de débit est relancée.
      // « Request too large » (ex. limite à 0) ne se résout pas en attendant.
      const retryable =
        res.status === 429
          ? code === "rate_limit_exceeded" &&
            !detail.startsWith("Request too large")
          : res.status >= 500;
      const retryAfterS = Number(res.headers.get("retry-after"));
      throw new ProviderError(
        `OpenAI ${res.status} ${code} (request ${requestId})${detail ? ` : ${detail}` : ""}`,
        res.status,
        code,
        retryable,
        Number.isFinite(retryAfterS) && retryAfterS > 0
          ? retryAfterS * 1000
          : undefined,
      );
    }

    const body = (await res.json()) as {
      data?: { b64_json?: string }[];
      usage?: OpenAIUsage;
    };
    const b64 = body.data?.[0]?.b64_json;
    if (!b64)
      throw new ProviderError(
        `Réponse sans image (request ${requestId})`,
        res.status,
        "no_image",
        false,
      );

    return {
      bytes: new Uint8Array(Buffer.from(b64, "base64")),
      model: this.o.model,
      costEur: body.usage ? costFromUsage(body.usage) : this.o.estimateEur,
      costIsEstimate: !body.usage,
      durationMs,
      requestId,
    };
  }
}
