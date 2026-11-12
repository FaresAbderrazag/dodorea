import { describe, expect, it } from "vitest";
import { BudgetExceededError, BudgetGuard } from "../src/budget.js";
import { buildMatrix } from "../src/matrix.js";
import { MockProvider } from "../src/providers/mock.js";
import { toCsv } from "../src/report.js";
import { runBenchmark } from "../src/runner.js";
import { SCENES } from "../src/scenes.js";
import { percentile, summarize } from "../src/stats.js";

const faces = () =>
  new Map(["F1", "F2", "F3"].map((id) => [id, new Uint8Array([0])] as const));

describe("matrice", () => {
  it("3 visages × 8 scènes × 2 répétitions = 48", () => {
    expect(SCENES).toHaveLength(8);
    expect(buildMatrix(["F1", "F2", "F3"], SCENES, 2)).toHaveLength(48);
  });
  it("refuse répétitions invalides et doublons", () => {
    expect(() => buildMatrix(["F1"], SCENES, 0)).toThrow();
    expect(() => buildMatrix(["F1", "F1"], SCENES, 1)).toThrow();
  });
});

describe("budget", () => {
  it("bloque avant dépassement", () => {
    const b = new BudgetGuard(1);
    b.record(0.9);
    expect(() => b.assertCanSpend(0.2)).toThrow(BudgetExceededError);
    expect(() => b.assertCanSpend(0.1)).not.toThrow();
  });
  it("le banc s'arrête au plafond sans le dépasser", async () => {
    const budget = new BudgetGuard(0.5);
    const r = await runBenchmark({
      provider: new MockProvider(0.1),
      faces: faces(),
      repetitions: 2,
      budget,
    });
    expect(r.stoppedByBudget).toBe(true);
    expect(budget.spentEur).toBeLessThanOrEqual(0.5 + 1e-9);
    expect(r.measurements).toHaveLength(5);
  });
});

describe("exécution simulée", () => {
  it("3 personnages + 48 scènes, coût total cohérent", async () => {
    const r = await runBenchmark({
      provider: new MockProvider(0.05),
      faces: faces(),
      repetitions: 2,
      budget: new BudgetGuard(50),
    });
    const s = summarize(r.measurements);
    expect(s.calls).toBe(51);
    expect(s.errors).toBe(0);
    expect(s.totalCostEur).toBeCloseTo(2.55);
  });
  it("les erreurs fournisseur sont consignées sans interrompre le banc", async () => {
    const r = await runBenchmark({
      provider: new MockProvider(0.05, 10),
      faces: faces(),
      repetitions: 1,
      budget: new BudgetGuard(50),
    });
    expect(summarize(r.measurements).errors).toBeGreaterThan(0);
  });
  it("mode personnages seuls : aucune scène générée", async () => {
    const r = await runBenchmark({
      provider: new MockProvider(),
      faces: faces(),
      repetitions: 2,
      budget: new BudgetGuard(50),
      charactersOnly: true,
    });
    expect(r.measurements.map((m) => m.kind)).toEqual([
      "character",
      "character",
      "character",
    ]);
  });
  it("un personnage validé est réutilisé sans être régénéré", async () => {
    const validatedCharacters = new Map([["F1", new Uint8Array([1])]]);
    const r = await runBenchmark({
      provider: new MockProvider(),
      faces: new Map([["F1", new Uint8Array([0])]]),
      repetitions: 1,
      budget: new BudgetGuard(50),
      validatedCharacters,
    });
    expect(r.measurements.filter((m) => m.kind === "character")).toHaveLength(
      0,
    );
    expect(r.measurements).toHaveLength(8);
  });
});

describe("statistiques", () => {
  it("p95 par rang le plus proche", () => {
    expect(
      percentile(
        [...Array(20).keys()].map((i) => i + 1),
        95,
      ),
    ).toBe(19);
    expect(Number.isNaN(percentile([], 95))).toBe(true);
  });
});

describe("confidentialité", () => {
  it("le CSV ne contient ni chemin ni contenu d'image", async () => {
    const r = await runBenchmark({
      provider: new MockProvider(),
      faces: faces(),
      repetitions: 1,
      budget: new BudgetGuard(50),
    });
    const csv = toCsv(r.measurements);
    expect(csv).not.toMatch(/dodorea-m0-data|\/Users\/|\.png|\.jpg|base64/i);
  });
});
