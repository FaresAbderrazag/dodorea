# Protocole de benchmark — cohérence du personnage

## Objectif
Établir si la génération **séparée** de 3 puis 8 scènes conserve un héros reconnaissable à coût et délai acceptables.

## Préconditions
Images de test synthétiques ou personnes ayant donné une autorisation explicite ; aucune photo réelle de mineur sans validation juridique/contractuelle. Modèle, version, paramètres, date, prompts et conditions fournisseur documentés.

## Matrice
- 3 à 5 sujets de test autorisés, apparences variées.
- 3 scènes contrastées : gros plan, action, profil / changement de tenue.
- 5 répétitions indépendantes par scène et sujet pour mesurer variabilité.
- Comparaison A (scènes complètes), B (composition), C (hybride) si faisable.
- Deux évaluateurs humains idéalement, scores 1–5.

## Mesures à remplir
| Run | Fournisseur/modèle | Sujet fictif | Stratégie | Scène | Ressemblance 1–5 | Cohérence 1–5 | Artefacts | Coût € | Latence s | Accepté |
|---|---|---|---|---|---:|---:|---|---:|---:|---|
| exemple | à mesurer | test-01 | A | forêt | — | — | — | — | — | — |

## Synthèse
Taux d'acceptation, coût moyen et p95 par page et livre, délai médian et p95, fréquence des régénérations, écart entre évaluateurs, problèmes récurrents, conformité fournisseur.

## Décision
**GO** si critères approuvés en amont atteints ; **PIVOT** si composition/hybride préférable ; **NO-GO** si confidentialité, qualité ou économie non acceptables. Ne jamais ajuster a posteriori les seuils pour forcer un GO.
