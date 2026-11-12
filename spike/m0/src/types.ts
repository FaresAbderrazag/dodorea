/** Contrat commun des fournisseurs (ADR-008 ; image-pipeline.md). */
export interface ImageResult {
  /** Octets de l'image : écrits sur disque hors dépôt, jamais journalisés. */
  bytes: Uint8Array;
  model: string;
  /** Coût réel en euros si connu, sinon estimation. */
  costEur: number;
  costIsEstimate: boolean;
  durationMs: number;
  requestId: string;
}

export interface CharacterRequest {
  /** Identifiant opaque du visage (F1…). Jamais le chemin du fichier dans les logs. */
  faceId: string;
  photo: Uint8Array;
  stylePrompt: string;
}

export interface SceneRequest {
  faceId: string;
  /** Image du personnage validé : la photo source n'est pas renvoyée. */
  characterReference: Uint8Array;
  sceneId: string;
  scenePrompt: string;
  stylePrompt: string;
}

export interface ImageGenerationProvider {
  readonly id: string;
  /** Coût estimé avant appel, pour la garde de budget. */
  estimateCostEur(kind: "character" | "scene"): number;
  generateCharacter(req: CharacterRequest): Promise<ImageResult>;
  generateScene(req: SceneRequest): Promise<ImageResult>;
}

export interface Measurement {
  provider: string;
  model: string;
  faceId: string;
  kind: "character" | "scene";
  sceneId: string;
  repetition: number;
  durationMs: number;
  costEur: number;
  costIsEstimate: boolean;
  requestId: string;
  status: "ok" | "error";
  error?: string;
}
