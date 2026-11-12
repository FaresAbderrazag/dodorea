import type {
  CharacterRequest,
  ImageGenerationProvider,
  ImageResult,
  SceneRequest,
} from "../types.js";

/** Fournisseur simulé : aucun appel réseau, aucun coût. Sert à valider le banc. */
export class MockProvider implements ImageGenerationProvider {
  readonly id = "mock";
  private counter = 0;

  constructor(
    private readonly costPerImageEur = 0.05,
    private readonly failEvery = 0
  ) {}

  estimateCostEur(): number {
    return this.costPerImageEur;
  }

  private async fake(): Promise<ImageResult> {
    this.counter++;
    if (this.failEvery > 0 && this.counter % this.failEvery === 0) {
      throw new Error("Erreur simulée du fournisseur");
    }
    return {
      bytes: new Uint8Array([0]),
      model: "mock-1",
      costEur: this.costPerImageEur,
      costIsEstimate: false,
      durationMs: 10 + (this.counter % 7),
      requestId: `mock-${this.counter}`,
    };
  }

  generateCharacter(_req: CharacterRequest): Promise<ImageResult> {
    return this.fake();
  }

  generateScene(_req: SceneRequest): Promise<ImageResult> {
    return this.fake();
  }
}
