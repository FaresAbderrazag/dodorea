import { BudgetExceededError, BudgetGuard } from "./budget.js";
import { buildMatrix } from "./matrix.js";
import {
  CHARACTER_PROMPT,
  NEGATIVE_RULES,
  SCENES,
  STYLE_PROMPT,
} from "./scenes.js";
import type {
  ImageGenerationProvider,
  ImageResult,
  Measurement,
} from "./types.js";

export interface RunOptions {
  provider: ImageGenerationProvider;
  faces: ReadonlyMap<string, Uint8Array>;
  repetitions: number;
  budget: BudgetGuard;
  /** Personnages déjà validés : s'ils sont fournis, aucun personnage n'est régénéré. */
  validatedCharacters?: ReadonlyMap<string, Uint8Array>;
  /** Ne génère que les personnages (calibrage, puis validation humaine avant les scènes). */
  charactersOnly?: boolean;
  /** Persistance des images hors dépôt ; facultative (mode simulé). */
  saveImage?: (name: string, bytes: Uint8Array) => Promise<void>;
}

export interface RunOutcome {
  measurements: Measurement[];
  stoppedByBudget: boolean;
}

/**
 * Stratégie A (D9) : 1 personnage par visage, puis chaque scène générée par un appel séparé
 * à partir de l'image du personnage (pas de la photo).
 */
export async function runBenchmark(o: RunOptions): Promise<RunOutcome> {
  const measurements: Measurement[] = [];
  const characters = new Map<string, Uint8Array>(o.validatedCharacters ?? []);

  const call = async (
    kind: "character" | "scene",
    faceId: string,
    sceneId: string,
    repetition: number,
    fn: () => Promise<ImageResult>,
  ): Promise<ImageResult | undefined> => {
    o.budget.assertCanSpend(o.provider.estimateCostEur(kind));
    try {
      const r = await fn();
      o.budget.record(r.costEur);
      measurements.push({
        provider: o.provider.id,
        model: r.model,
        faceId,
        kind,
        sceneId,
        repetition,
        durationMs: r.durationMs,
        costEur: r.costEur,
        costIsEstimate: r.costIsEstimate,
        requestId: r.requestId,
        status: "ok",
      });
      await o.saveImage?.(`${faceId}_${sceneId}_r${repetition}.png`, r.bytes);
      return r;
    } catch (e) {
      if (e instanceof BudgetExceededError) throw e;
      // Message d'erreur seulement : jamais de contenu d'image ni de chemin.
      measurements.push({
        provider: o.provider.id,
        model: "",
        faceId,
        kind,
        sceneId,
        repetition,
        durationMs: 0,
        costEur: 0,
        costIsEstimate: true,
        requestId: "",
        status: "error",
        error: e instanceof Error ? e.message.slice(0, 400) : "erreur inconnue",
      });
      return undefined;
    }
  };

  try {
    for (const [faceId, photo] of o.faces) {
      if (characters.has(faceId)) continue;
      const r = await call("character", faceId, "CHAR", 1, () =>
        o.provider.generateCharacter({
          faceId,
          photo,
          stylePrompt: `${CHARACTER_PROMPT} ${STYLE_PROMPT}`,
        }),
      );
      if (r) characters.set(faceId, r.bytes);
    }

    if (o.charactersOnly) return { measurements, stoppedByBudget: false };

    for (const item of buildMatrix(
      [...characters.keys()],
      SCENES,
      o.repetitions,
    )) {
      const scene = SCENES.find((s) => s.id === item.sceneId)!;
      const ref = characters.get(item.faceId)!;
      await call("scene", item.faceId, item.sceneId, item.repetition, () =>
        o.provider.generateScene({
          faceId: item.faceId,
          characterReference: ref,
          sceneId: scene.id,
          scenePrompt: `${scene.prompt} ${NEGATIVE_RULES}`,
          stylePrompt: STYLE_PROMPT,
        }),
      );
    }
  } catch (e) {
    if (e instanceof BudgetExceededError)
      return { measurements, stoppedByBudget: true };
    throw e;
  }
  return { measurements, stoppedByBudget: false };
}
