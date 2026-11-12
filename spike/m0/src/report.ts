import type { Measurement } from "./types.js";

const COLUMNS = [
  "provider",
  "model",
  "faceId",
  "kind",
  "sceneId",
  "repetition",
  "durationMs",
  "costEur",
  "costIsEstimate",
  "requestId",
  "status",
  "error",
] as const satisfies readonly (keyof Measurement)[];

function cell(v: unknown): string {
  const s = v === undefined ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/** CSV des mesures. Ne contient ni chemin de fichier ni contenu d'image (identifiants opaques uniquement). */
export function toCsv(ms: readonly Measurement[]): string {
  const lines = [COLUMNS.join(",")];
  for (const m of ms) lines.push(COLUMNS.map((c) => cell(m[c])).join(","));
  return lines.join("\n") + "\n";
}

/** Colonnes de la grille d'évaluation humaine (notes 1–5, T-005). */
export const RATING_COLUMNS = [
  "imageId",
  "evaluator",
  "ressemblance",
  "coherenceVisage",
  "coherenceCheveux",
  "stabiliteStyle",
  "respectScene",
  "defautGrave(oui/non)",
  "commentaire",
] as const;
