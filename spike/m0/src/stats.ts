import type { Measurement } from "./types.js";

/** Percentile par la méthode du rang le plus proche. */
export function percentile(values: readonly number[], p: number): number {
  if (values.length === 0) return NaN;
  if (p < 0 || p > 100) throw new Error("p hors [0,100]");
  const sorted = [...values].sort((a, b) => a - b);
  const rank = Math.max(1, Math.ceil((p / 100) * sorted.length));
  return sorted[rank - 1]!;
}

export function mean(values: readonly number[]): number {
  return values.length === 0
    ? NaN
    : values.reduce((s, v) => s + v, 0) / values.length;
}

export interface Summary {
  calls: number;
  errors: number;
  totalCostEur: number;
  sceneCostMeanEur: number;
  sceneLatencyP95Ms: number;
  anyEstimatedCost: boolean;
}

export function summarize(ms: readonly Measurement[]): Summary {
  const ok = ms.filter((m) => m.status === "ok");
  const scenes = ok.filter((m) => m.kind === "scene");
  return {
    calls: ms.length,
    errors: ms.length - ok.length,
    totalCostEur: ok.reduce((s, m) => s + m.costEur, 0),
    sceneCostMeanEur: mean(scenes.map((m) => m.costEur)),
    sceneLatencyP95Ms: percentile(
      scenes.map((m) => m.durationMs),
      95
    ),
    anyEstimatedCost: ok.some((m) => m.costIsEstimate),
  };
}
