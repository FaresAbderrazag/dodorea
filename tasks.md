# Backlog et plan de réalisation

**Statut :** initial · **Légende :** `[ ]` non démarré, `[~]` en cours, `[x]` terminé. Les durées sont des ordres de grandeur, pas des engagements.

## M0 — Faisabilité du héros (priorité bloquante)

**Contraintes validées par le responsable produit (2026-11-11) :**

- Photos de test : visages d'enfants fictifs (générés) uniquement, aucun mineur réel ; exception : photo du responsable produit (adulte consentant) en témoin F5 (2026-11-11).
- Budget maximal des appels IA : 50 €, avec arrêt automatique au plafond.
- Aucun appel payant avant validation du fournisseur (issue de T-002).

- [x] T-000 Fixer les seuils go/no-go (OQ-06) **avant toute mesure**.
  - Critères : seuils chiffrés (ressemblance, cohérence, latence p95, coût par page, taux de régénération) validés par le responsable produit.
  - Fait (2026-11-11) : `docs/research/m0-go-no-go-thresholds.md`, validé.
- [~] T-001 Définir le jeu de photos de test fictives et ses règles (OQ-03).
  - Critères : protocole documenté ; 3 à 5 visages fictifs variés (âge apparent, carnation, cheveux, lunettes) ; source et licence de chaque image ; stockage hors Git ; règle de purge ; aucune image dans le dépôt.
  - Avancement (2026-11-11) : protocole `docs/research/m0-test-dataset-protocol.md` (Firefly, F1–F3 + réserves), `.gitignore`. Reste : produire les visages et remplir le registre (responsable produit).
  - 2026-11-11 : F1–F3 générés avec Gemini, F5 = photo du responsable produit ; registre rempli. Reste : vérifier les conditions d'usage des images Gemini.
- [~] T-002 Vérifier les conditions et tarifs d'OpenAI GPT Image (OQ-05). _(fournisseur choisi par le responsable produit : ADR-008)_
  - Critères : conditions officielles vérifiées et datées (entraînement, conservation, mineurs, usage commercial, DPA, transferts hors UE) ; modèle et tarif par image confirmés ; limite de dépense configurée ; aucune condition éliminatoire.
  - Avancement (2026-11-11) : `docs/research/m0-openai-conditions.md` (sources officielles) ; aucune condition éliminatoire pour M0. Reste : limite de dépense confirmée, choix du modèle et de la qualité.
  - 2026-11-11 : `gpt-image-2.5-flare`, qualité moyenne, choisi ; limite de dépense confirmée par le responsable produit (non vérifiable par l'agent). Reste : lecture du DPA avant production.
- [x] T-003 Créer référence personnage dessin animé à partir d'une photo. _(dépend de T-000, T-001, T-002)_
  - 2026-11-12 : style maison 2D plat (ADR-009) ; personnage F1 généré (0,019 €, 12 s). Reste : validation F1, personnages F2, F3, F5.
  - Fait (2026-11-12) : 4 références (F1, F2, F3, F5), notées 4/5 et validées par le responsable produit.
- [x] T-004 Générer 8 scènes **séparément** avec même référence, 3 visages × 2 répétitions (D2, validé 2026-11-11). Stratégie A seule ; B seulement si le coût échoue (D9).
  - Fait (2026-11-12) : F1, F2, F3 + témoin F5 × 8 × 2 = 64 scènes, 0 erreur, 0,0221 €/scène en moyenne, p95 22,2 s, total 1,41 €.
  - Banc `spike/m0/` (mode simulé, plafond 50 €) créé ; `tsc --noEmit` OK, 8/8 tests Vitest OK (2026-11-11). Reste : adaptateur OpenAI après T-002.
  - 2026-11-11 : adaptateur OpenAI (`/v1/images/edits`, coût depuis `usage`, relances 429/5xx, pas de relance modération/quota), modes `characters`/`scenes`, liste blanche F1/F2/F3/F5, `--confirm-paid` ; `tsc` OK, 16/16 tests OK. Aucun appel réel.
- [x] T-005 Évaluer ressemblance, cohérence, latence, coût et régénérations.
  - 2026-11-12 : coût et latence mesurés ; notation humaine en attente (`dodorea-m0-data/ratings.csv`, planche `review.html`).
  - Fait (2026-11-12) : notes confirmées par le responsable produit (4/5 partout, 1 évaluateur, 0 défaut grave).
- [x] T-006 Tester composition 2D vs scènes complètes, choisir stratégie via ADR-004.
  - 2026-11-12 : B non testée (coût de A conforme, D9) ; ADR-004 révisé pour proposer A, en attente d'acceptation.
  - Fait (2026-11-12) : ADR-004 accepté, stratégie A retenue.
- [x] T-007 Consigner le benchmark et décider go/no-go selon les seuils de T-000.
  - Fait (2026-11-12) : `docs/research/m0-benchmark-results.md` ; **GO technique** selon la règle T-000, avec limites (marge nulle, 1 évaluateur, visages fictifs). Passage à M1 à confirmer.

**M0 clôturé (2026-11-12)** : passage à M1 confirmé par le responsable produit. Restent ouverts sans bloquer M1 : licence Gemini (T-001), lecture du DPA OpenAI avant production (T-002), purge de `dodorea-m0-data/`.

## M1 — Fondation applicative

- [ ] T-101 Initialiser Next.js/TS, qualité, CI, environnements.
- [ ] T-102 Configurer PostgreSQL/Prisma et migrations.
- [ ] T-103 Auth parent, sessions, contrôles de propriété et tests IDOR.
- [ ] T-104 Modèle catalogue, story versions et seed fictif FR/DE/EN/AR (dont RTL).
- [ ] T-105 Stockage objet privé, URLs temporaires et upload sécurisé.

## M2 — Personnalisation

- [ ] T-201 Profil enfant et consentements/versioning.
- [ ] T-202 Upload photo, retrait EXIF, validation.
- [ ] T-203 Job création personnage, statuts, quota et validation parent.
- [ ] T-204 Référence personnage réutilisable ; tests sécurité.

## M3 — Livre numérique

- [ ] T-301 Créer livre idempotent avec droits.
- [ ] T-302 Worker scènes, retry/backoff, DLQ, budget par livre.
- [ ] T-303 Contrôle qualité et finalisation atomique `ready`.
- [ ] T-304 Lecteur accessible mobile, texte indépendant, support RTL (arabe).
- [ ] T-305 Bibliothèque, progression, relecture sans appel IA.

## M4 — Commercialisation

- [ ] T-401 Définir offres, droits et politique post-résiliation.
- [ ] T-402 Stripe checkout + webhooks signés/idempotents.
- [ ] T-403 Administration éditoriale, publication par langue et traduction relue (FR/DE/EN/AR).
- [ ] T-404 Tableau de coûts et événements anonymisés.

## M5 — Protection et lancement pilote

- [ ] T-501 Valider analyse juridique, DPIA/AIPD si nécessaire, fournisseurs et notices (prérequis à toute photo réelle d'enfant).
- [ ] T-502 Implémenter suppression complète et tests de course.
- [ ] T-503 Revue sécurité, accessibilité et qualité des langues publiées (FR/DE/EN/AR).
- [ ] T-504 Tester avec ≥10 parents volontaires, sans collecte excessive (re-valider la ressemblance sur photos réelles après T-501).
- [ ] T-505 Mesurer conversion, coût/livre, qualité, rétention et décider go/no-go.

## Definition of Done commune

Tests pertinents passés ; contrôle serveur et absence de fuite ; logs sans PII ; documents et traçabilité à jour ; décision ouverte non masquée ; passation rédigée.

## Après MVP (non engagé)

Audio écran éteint ; hors ligne ; export PDF ; livres multi-héros ; séries ; choix interactifs ; application native.
