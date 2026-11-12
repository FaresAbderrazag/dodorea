import { describe, expect, it } from "vitest";
import {
  costFromUsage,
  OpenAIProvider,
  ProviderError,
} from "../src/providers/openai.js";

const PNG = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0, 0, 0, 0]);

function fakeFetch(responses: Array<{ status: number; body: unknown }>) {
  const calls: RequestInit[] = [];
  const impl = (async (_url: unknown, init?: RequestInit) => {
    calls.push(init ?? {});
    const r = responses[Math.min(calls.length - 1, responses.length - 1)]!;
    return new Response(JSON.stringify(r.body), {
      status: r.status,
      headers: { "x-request-id": `req_${calls.length}` },
    });
  }) as typeof fetch;
  return { impl, calls };
}

const provider = (impl: typeof fetch) =>
  new OpenAIProvider({
    apiKey: "sk-test",
    model: "gpt-image-2.5-flare",
    quality: "medium",
    size: "1024x1024",
    estimateEur: 0.2,
    fetchImpl: impl,
    sleep: async () => {},
  });

const ok = {
  data: [{ b64_json: Buffer.from("img").toString("base64") }],
  usage: {
    input_tokens: 1100,
    output_tokens: 1000,
    input_tokens_details: { image_tokens: 1000, text_tokens: 100 },
  },
};

describe("coût OpenAI", () => {
  it("calcule le coût à partir des jetons (tarifs officiels)", () => {
    // 1000×8 + 100×5 + 1000×30 = 38 500 $ / 1M = 0,0385
    expect(costFromUsage(ok.usage)).toBeCloseTo(0.0385, 6);
  });
});

describe("adaptateur OpenAI (réseau simulé)", () => {
  it("renvoie l'image, le coût mesuré et l'identifiant de requête", async () => {
    const { impl, calls } = fakeFetch([{ status: 200, body: ok }]);
    const r = await provider(impl).generateCharacter({
      faceId: "F1",
      photo: PNG,
      stylePrompt: "style",
    });
    expect(Buffer.from(r.bytes).toString()).toBe("img");
    expect(r.costIsEstimate).toBe(false);
    expect(r.requestId).toBe("req_1");
    expect((calls[0]!.headers as Record<string, string>).Authorization).toBe(
      "Bearer sk-test",
    );
  });

  it("relance sur 429/5xx puis réussit", async () => {
    const { impl, calls } = fakeFetch([
      { status: 500, body: {} },
      { status: 429, body: { error: { code: "rate_limit_exceeded" } } },
      { status: 200, body: ok },
    ]);
    await provider(impl).generateCharacter({
      faceId: "F1",
      photo: PNG,
      stylePrompt: "s",
    });
    expect(calls).toHaveLength(3);
  });

  it("ne relance pas un blocage de modération ni un quota ou crédit épuisé", async () => {
    for (const code of [
      "moderation_blocked",
      "insufficient_quota",
      "credit_balance_exhausted",
    ]) {
      const { impl, calls } = fakeFetch([
        {
          status: code === "moderation_blocked" ? 400 : 429,
          body: { error: { code } },
        },
      ]);
      await expect(
        provider(impl).generateCharacter({
          faceId: "F1",
          photo: PNG,
          stylePrompt: "s",
        }),
      ).rejects.toBeInstanceOf(ProviderError);
      expect(calls).toHaveLength(1);
    }
  });

  it("le message d'erreur ne contient pas la clé API", async () => {
    const { impl } = fakeFetch([
      { status: 401, body: { error: { code: "invalid_api_key" } } },
    ]);
    await expect(
      provider(impl).generateCharacter({
        faceId: "F1",
        photo: PNG,
        stylePrompt: "s",
      }),
    ).rejects.not.toThrow(/sk-test/);
  });

  it("refuse un format d'image inconnu sans appel réseau", async () => {
    const { impl, calls } = fakeFetch([{ status: 200, body: ok }]);
    await expect(
      provider(impl).generateCharacter({
        faceId: "F1",
        photo: new Uint8Array([1, 2, 3]),
        stylePrompt: "s",
      }),
    ).rejects.toThrow(/Format/);
    expect(calls).toHaveLength(0);
  });
});
