/** Histoire pilote : 8 scènes couvrant les cas de test (D2). Aucun texte narratif dans l'image (ADR-002). */
// Style maison ADR-009 (2D plat). Consignes en anglais : mieux suivies par le modèle.
export const STYLE_VERSION = "house-2d-flat-v1";

export const STYLE_PROMPT =
  "Children's picture book illustration in a flat 2D cartoon style, like a modern animated TV series for kids: " +
  "clean bold outlines, flat bright colors, minimal soft shading, simplified shapes, slightly larger head and expressive eyes. " +
  "Not photorealistic, not painterly, not 3D. No text, no letters, no logos anywhere in the image.";

export const CHARACTER_PROMPT =
  "Turn the person in the photo into a cartoon character for a children's book. " +
  "Keep their distinctive features recognizable: face shape, hair color, hair texture and haircut, eye color, skin tone, glasses if any. " +
  "Front view, full body, standing, neutral outfit (plain t-shirt and trousers), plain white background.";

export interface Scene {
  id: string;
  tests: string;
  prompt: string;
}

export const SCENES: readonly Scene[] = [
  {
    id: "S1",
    tests: "face, décor simple",
    prompt:
      "The hero standing, facing the viewer, in their bedroom, calm smile.",
  },
  {
    id: "S2",
    tests: "profil, extérieur",
    prompt: "The hero walking, seen in side profile, on a sunny forest path.",
  },
  {
    id: "S3",
    tests: "dos/trois-quarts, mouvement",
    prompt:
      "The hero running towards a hill, seen from a three-quarter back view.",
  },
  {
    id: "S4",
    tests: "émotion forte, gros plan",
    prompt: "Close-up of the hero's face, very surprised, mouth open.",
  },
  {
    id: "S5",
    tests: "changement de vêtements",
    prompt:
      "The hero wearing blue pyjamas with stars, sitting on their bed holding a flashlight.",
  },
  {
    id: "S6",
    tests: "interaction secondaire",
    prompt: "The hero petting a friendly red fox sitting next to them.",
  },
  {
    id: "S7",
    tests: "scène complexe, nuit",
    prompt:
      "At night, the hero and three forest animals around a campfire under the stars.",
  },
  {
    id: "S8",
    tests: "plan large",
    prompt:
      "Wide shot of a valley at sunrise, the hero small in the left third of the frame, facing the viewer.",
  },
];

export const NEGATIVE_RULES =
  "The hero is the exact same character as in the reference image: same face, hair, skin tone, eye color and glasses if any. " +
  "Only one instance of the hero. No additional human characters. No text.";
