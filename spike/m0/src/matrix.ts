import type { Scene } from "./scenes.js";

export interface MatrixItem {
  faceId: string;
  sceneId: string;
  repetition: number;
}

/** Plan de génération : visages × scènes × répétitions (D2 : 3 × 8 × 2 = 48 scènes). */
export function buildMatrix(
  faceIds: readonly string[],
  scenes: readonly Scene[],
  repetitions: number
): MatrixItem[] {
  if (!Number.isInteger(repetitions) || repetitions < 1)
    throw new Error("repetitions doit être un entier ≥ 1");
  if (new Set(faceIds).size !== faceIds.length)
    throw new Error("faceIds en double");
  const items: MatrixItem[] = [];
  for (const faceId of faceIds) {
    for (let repetition = 1; repetition <= repetitions; repetition++) {
      for (const scene of scenes)
        items.push({ faceId, sceneId: scene.id, repetition });
    }
  }
  return items;
}
