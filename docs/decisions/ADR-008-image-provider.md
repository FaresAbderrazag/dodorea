# ADR-008 — Fournisseur de génération d'images

**Statut :** accepted pour le prototype M0 (2026-11-11, responsable produit) · **Adoption en production :** conditionnée au go/no-go M0 (T-007) et à T-501

## Contexte

Le héros doit être créé à partir d'une photo, puis réutilisé dans des scènes générées séparément, à un coût compatible avec le modèle économique. Candidats étudiés : OpenAI GPT Image, Google Nano Banana (Gemini), FLUX Kontext (Black Forest Labs).

## Options étudiées (informations non vérifiées sur sources officielles au 2026-11-11)

|         | OpenAI GPT Image                                                           | Google Nano Banana                                            | FLUX Kontext                                          |
| ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------- |
| Atouts  | SDK TypeScript mûr, édition multi-références, option de fidélité au visage | Prix bas (Flash), références multiples                        | Conservation d'identité, prix bas                     |
| Limites | Coût élevé en haute qualité, modération possible sur photos d'enfants      | Offre gratuite interdite (entraînement), versions « preview » | Fournisseur plus petit, licence [dev] non commerciale |

## Décision

Utiliser **OpenAI GPT Image** comme unique fournisseur du prototype M0. Les autres candidats ne sont pas testés à ce stade ; ils restent des alternatives si M0 échoue.

## Justification

Choix explicite du responsable produit ; intégration la plus simple en TypeScript ; un seul fournisseur réduit le coût et la durée du benchmark.

## Conséquences

- Le benchmark ne compare plus plusieurs fournisseurs : il vérifie qu'OpenAI atteint les seuils de T-000 (`docs/research/m0-go-no-go-thresholds.md`).
- Risque de dépendance limité par l'interface `ImageGenerationProvider` (un adaptateur par fournisseur).
- Prérequis avant tout appel : conditions OpenAI vérifiées (entraînement, conservation, mineurs, usage commercial, DPA, transferts hors UE) ; limite de dépense configurée sur le compte ; uniquement des visages fictifs ou un adulte consentant (F5).
- Modèle exact, qualité et tarif à choisir pour le benchmark. Correction factuelle (2026-11-11) : `gpt-image-1` est arrêté depuis le 2026-10-23 ; modèles disponibles et tarifs dans `docs/research/m0-openai-conditions.md`.

## Traçabilité

OQ-05, T-002 à T-007, ADR-003, ADR-004 ; `docs/technical/image-pipeline.md`, `docs/technical/cost-model.md`.

## Conditions de révision

Échec aux seuils de T-000, conditions fournisseur incompatibles, hausse de tarif ou résultat juridique (T-501) : nouvel ADR, réévaluation de Nano Banana et FLUX Kontext.
