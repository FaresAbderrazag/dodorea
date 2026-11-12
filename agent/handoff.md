# Passation entre agents

## Résumé de reprise

Le projet est au stade documentaire. Ne pas supposer que le code existe. Le premier objectif est de valider la cohérence d'un héros dessiné à partir d'une photo autorisée, d'une page à l'autre.

## Ordre de lecture

`README.md` → `AGENTS.md` → `agent/rules.md` → `agent/context.md` → `agent/current-state.md` → `agent/handoff.md` → `agent/workflow.md` → `tasks.md` → `docs/product/scope.md` → `docs/technical/image-pipeline.md`.

## Dernière session (2026-11-11)

- Validations du responsable produit : photos de test fictives uniquement ; budget IA M0 ≤ 50 € ; aucun appel payant avant validation fournisseur ; i18n étendue à FR/DE/EN/AR (architecture prête, contenus par phases).
- Fichiers modifiés : `tasks.md` (T-000 seuils avant mesures, critères T-001/T-002, langues), `README.md`, `docs/technical/data-model.md` (`GenerationJob.parentId`, locales), `docs/decisions/ADR-006-internationalization.md` (révisé, toujours proposed).
- Aucun code, aucun test exécuté (dépôt documentaire).
- En attente : contradiction 2 (machine d'états unique par entité), à traiter au début de M1 (technique, sans décision produit).
- Contradiction 4 résolue : détection de présence de visage seulement, ressemblance jugée par le parent, aucune biométrie (`personalization.md`, `user-journeys.md`, `image-pipeline.md`) ; confirmation juridique en T-501.
- Mise à jour (même jour) : ADR-001 et ADR-006 **acceptés** ; pilote FR ; arabe standard vocalisé ; accords au genre du héros (`ChildProfile.grammaticalGender`) ; **ADR-007 accepté** (parcours sans photo, `PersonalizedBook.characterId` optionnel) ; `scope.md`, `open-questions.md`, `README.md`, `data-model.md` alignés.
- T-000 terminé : seuils go/no-go validés (`docs/research/m0-go-no-go-thresholds.md`).
- ADR-008 : OpenAI GPT Image retenu par le responsable produit pour le prototype M0 (production conditionnée au go/no-go). T-002 recentrée sur la vérification des conditions OpenAI.
- Validé (D2, D3, D5, D8, D9) : 3 visages fictifs Firefly × 8 scènes × 2 répétitions ; plafond 50 € ; stratégie A seule.
- Créés : `docs/research/m0-test-dataset-protocol.md`, `.gitignore` (images, `.env`, `spike/m0/data|out`), banc `spike/m0/` (TypeScript : interface `ImageGenerationProvider`, `BudgetGuard`, matrice, stats p95, CSV sans chemin d'image, `MockProvider`, tests Vitest).
- Vérifié (2026-11-11, exécuté par le responsable produit) : `npm install`, `tsc --noEmit` OK, `vitest` 8/8 OK.
- `npm audit` : 6 vulnérabilités (dépendances de dev : vitest 2 / vite / esbuild), sans exposition réseau dans le banc local. Ne pas lancer `npm audit fix --force` sans revue ; mise à jour de vitest à envisager avant d'ajouter l'adaptateur OpenAI.
- **Blocage données (2026-11-11)** : `~/Desktop/dodorea-m0-data/faces/F1–F3.jpg` sont des photos réelles de **mineurs** (frère et sœurs du responsable produit), pas des visages générés. Refus de les utiliser malgré l'autorisation du responsable produit : consentement à recueillir auprès des représentants légaux, conditions OpenAI sur les mineurs non vérifiées (T-002), contrainte M0 et T-501. F4.jpg = photo du responsable produit (adulte consentant), autorisée comme témoin F5.
- 2026-11-11 (suite) : photos de mineurs retirées ; F1–F3 générés avec Gemini, F5 = photo du responsable produit ; registre T-001 rempli.
- T-002 (2026-11-11) : `docs/research/m0-openai-conditions.md` — pas d'entraînement, 30 j de journaux, sorties possédées par le client, résidence UE/ZDR sur approbation ; `gpt-image-1` arrêté (ADR-008 corrigé) ; modèles 2.6 non éligibles ZDR/UE. En attente : limite de dépense, choix du modèle/qualité.
- Modèle choisi : `gpt-image-2.5-flare`, qualité moyenne ; limite de dépense confirmée par le responsable produit. Adaptateur OpenAI écrit et testé (16/16, réseau simulé). Aucun appel réel effectué.
- Essai de calibrage (2026-11-11, F1, 1 appel) : refusé `429 credit_balance_exhausted` (compte API sans crédit), 0 € facturé. Correctif : un 429 n'est relancé que pour `rate_limit_exceeded` ; 16/16 tests OK. À relancer après ajout de crédit.
- 2e essai (2026-11-11, après ajout de crédit annoncé) : même refus `credit_balance_exhausted`, 0 € facturé. Hypothèses : délai d'activation du crédit, ou clé rattachée à une autre organisation/projet que celle créditée.
- 3e et 4e essais (2026-11-11) : crédit reconnu ; refus `429 rate_limit_exceeded` « Request too large … (for limit gpt-image) … TPM: Limit 0 ». L'organisation n'a aucun quota pour les modèles d'images (vérification d'organisation probablement requise). 0 € facturé. Correctifs : respect de `retry-after`, message OpenAI conservé, pas de relance si « Request too large » ; 16/16 tests OK.
- **Calibrage réussi (2026-11-12)** après vérification d'organisation : personnage F1, `gpt-image-2.5-flare` qualité moyenne 1024², **0,0189 € mesuré** (jetons `usage`), **12,7 s**, aucune erreur. Image dans `dodorea-m0-data/runs/2026-11-12T15-01-54-483Z/`. Constat agent : rendu plutôt peinture semi-réaliste que « dessin animé 2D » ; ressemblance à juger par le responsable produit.
- **ADR-009 accepté (2026-11-12)** : style maison unique, dessin animé 2D plat. Consignes de `spike/m0/src/scenes.ts` réécrites en anglais (`STYLE_VERSION = house-2d-flat-v1`). 2e essai F1 : rendu 2D plat conforme, 0,0190 €, 12,0 s (`runs/2026-11-12T15-12-24-723Z/`). En attente : validation du personnage F1 par le responsable produit, puis personnages F2, F3, F5.
- 2026-11-12 : F1 validé par le responsable produit (sans note chiffrée). Option A choisie : F2, F3, F5 générés (0,064 €) et retenus sans validation individuelle ; F2/F3 contrôlés visuellement par l'agent (aucun défaut), **F5 non contrôlé** (limite d'affichage) ; le responsable produit veut tout voir à la fin. Références dans `dodorea-m0-data/characters/`. Scènes lancées : 4 visages × 8 × 2 = 64 appels.
- **Scènes terminées (2026-11-12)** : 64/64, 0 erreur, 1,415 €, coût moyen 0,0221 €/scène, latence p95 22,2 s (`out/measurements-openai-scenes-1794497966414.csv`). Images : `dodorea-m0-data/runs/2026-11-12T15-20-24-882Z/`. Planche `dodorea-m0-data/review.html`, grille vide `dodorea-m0-data/ratings.csv` (2 évaluateurs). Total M0 dépensé ≈ 1,52 €. Prochaine action : notation humaine (T-005), puis consolidation et go/no-go (T-007).
- Notation reçue (2026-11-12) : `ratings.csv` enregistré au format Numbers, exporté en `ratings-export.csv` (séparateur `;`). **Toutes les cellules = 4** (68 lignes, y compris la colonne `evaluator`), aucun défaut grave, un seul évaluateur. Uniformité à confirmer avant de conclure (T-005 non clos). Contrôle agent indicatif (F3 S7 r1, F3 S4 r2) : lunettes, cheveux, peau et tenue cohérents, aucun défaut.
- Notation **confirmée** par le responsable produit (2026-11-12). Bilan `docs/research/m0-benchmark-results.md` : **GO technique** (tous seuils atteints, ressemblance/cohérence au seuil exact). T-003, T-005, T-007 clôturées ; T-006 en attente de l'acceptation d'ADR-004 révisé (stratégie A, proposed). Prochaine action : confirmation du passage à M1 et décision ADR-004.
- 2026-11-12 : **ADR-004 accepté** (stratégie A) ; **passage à M1 confirmé**. Prochaine action : unifier les machines d'états (contradiction 2) et cadrer T-101 (dépôt Git absent, Node 21.1 non LTS).
- Prochaine action : essai de calibrage (1 personnage F1) après feu vert explicite, puis personnages F1–F3, validation humaine, scènes.
- Ancienne note : T-002 (limite de dépense et conditions OpenAI), adaptateur OpenAI, puis premier essai sur un visage après feu vert.

## Travail à effectuer ensuite

1. Confirmer les décisions ouvertes critiques (photo, fournisseur, politique de rétention).
2. Préparer un jeu de test autorisé ou synthétique.
3. Écrire protocole de benchmark reproductible et métriques.
4. Exécuter le spike M0 et consigner résultats dans `docs/research/benchmark-template.md`.
5. Revoir ADR-004 et les coûts avant de construire l'application.

## Format de passation future

Date ; objectif ; fichiers modifiés ; décisions prises ; commandes/tests et résultats ; problèmes ; prochaine action précise ; risques nouveaux. Ne jamais mettre de secrets ou photos personnelles dans ce fichier.
