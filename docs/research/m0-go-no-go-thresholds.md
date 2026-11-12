# M0 — Seuils go/no-go (T-000, OQ-06)

**Statut :** validé par le responsable produit · **Date :** 2026-11-11 · **Fixé avant toute mesure.**

## Seuils

| Critère                         | Mesure                                                             | Seuil                                  |
| ------------------------------- | ------------------------------------------------------------------ | -------------------------------------- |
| Ressemblance au visage source   | 2 évaluateurs, note 1–5 « reconnaît-on la personne ? »             | moyenne ≥ 4/5                          |
| Cohérence du héros entre scènes | notes 1–5 visage, cheveux, tenue sur les 3 scènes                  | moyenne ≥ 4/5, aucune scène ≤ 2        |
| Images utilisables              | part sans défaut grave (mains, texte parasite, personnage en trop) | ≥ 80 %                                 |
| Régénérations                   | essais moyens pour obtenir une page acceptée                       | ≤ 1,5 par page                         |
| Latence                         | durée de génération d'une page, p95                                | ≤ 60 s                                 |
| Coût                            | coût réel par page, régénérations incluses                         | ≤ 0,15 € (≈ 1,20 € / livre de 8 pages) |

## Règle de décision

- **Go** : tous les seuils atteints → M1.
- **À retravailler** : 1 ou 2 seuils manqués de peu → ajustement et nouveau test dans le budget restant (plafond global 50 €).
- **No-go** : ressemblance ou cohérence < 3/5 → révision de l'approche (ADR-004).

## Limites

- Coût et latence sont des **estimations**, à confronter aux tarifs réels en T-002 ; tout ajustement exige une nouvelle validation du responsable produit, documentée ici, **avant** les mesures.
- Ressemblance mesurée sur des visages fictifs (T-001) : à re-valider sur photos réelles après T-501 (T-504).
- Évaluation humaine uniquement, aucune comparaison biométrique (`docs/functional/personalization.md`).

## Traçabilité

OQ-06 ; T-000, T-005, T-007 ; ADR-004 ; `docs/research/benchmark-template.md`.
