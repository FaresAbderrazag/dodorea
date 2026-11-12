# M0 — Résultats du benchmark et décision go/no-go (T-005, T-007)

**Date :** 2026-11-12 · **Seuils :** `docs/research/m0-go-no-go-thresholds.md` (fixés le 2026-11-11, avant toute mesure, non modifiés depuis)

## Conditions

| Élément              | Valeur                                                                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fournisseur / modèle | OpenAI `gpt-image-2.5-flare`, `/v1/images/edits`, qualité `medium`, 1024×1024 (ADR-008)                                                                 |
| Style                | Maison 2D plat, `house-2d-flat-v1` (ADR-009)                                                                                                            |
| Stratégie            | A : chaque scène générée par un appel séparé, à partir de l'image du personnage validé, jamais de la photo (D9)                                         |
| Sujets               | F1, F2, F3 (enfants fictifs générés avec Gemini) + F5 (adulte consentant, témoin) — `m0-test-dataset-protocol.md`                                       |
| Matrice              | 4 personnages + 4 × 8 scènes × 2 répétitions = 68 images                                                                                                |
| Consignes            | `spike/m0/src/scenes.ts` (S1 face, S2 profil, S3 dos/mouvement, S4 gros plan émotion, S5 changement de tenue, S6 animal, S7 nuit/groupe, S8 plan large) |
| Exécution            | 2026-11-12, banc `spike/m0/`, mesures dans `spike/m0/out/` (hors Git)                                                                                   |

## Mesures automatiques

| Mesure                        | Personnages (4) | Scènes (64)    |
| ----------------------------- | --------------- | -------------- |
| Erreurs / refus de modération | 0               | 0              |
| Coût moyen par image          | 0,0205 €        | **0,0221 €**   |
| Latence                       | 11,6–13,2 s     | **p95 22,2 s** |
| Coût total                    | 0,083 €         | 1,415 €        |

Coûts calculés à partir des jetons facturés (`usage`), avec 1 $ = 1 € (légère surestimation). Dépense totale M0, essais de calibrage inclus : ≈ 1,52 € sur 50 €.

Coût indicatif d'un livre de 8 pages : 8 × 0,022 € + 1 personnage amorti ≈ **0,20 €** sans régénération.

## Évaluation humaine

- Grille : `dodorea-m0-data/ratings.csv` (hors dépôt), 68 images, 1 évaluateur (responsable produit).
- Toutes les images ont reçu la note **4/5** sur chaque critère, sans aucun défaut grave signalé. L'uniformité a été signalée par l'agent ; le responsable produit a **confirmé la notation** le 2026-11-12.
- Contrôle indicatif de l'agent (F3 S4, F3 S7) : lunettes, cheveux, peau et tenue cohérents, aucun défaut. Ce contrôle ne remplace pas l'évaluation humaine.

## Comparaison aux seuils

| Critère                | Seuil                     | Résultat                  | Statut        |
| ---------------------- | ------------------------- | ------------------------- | ------------- |
| Ressemblance           | moyenne ≥ 4/5             | 4,0                       | ✅ (au seuil) |
| Cohérence entre scènes | moyenne ≥ 4/5, aucune ≤ 2 | 4,0 ; minimum 4           | ✅ (au seuil) |
| Images utilisables     | ≥ 80 %                    | 100 %                     | ✅            |
| Régénérations          | ≤ 1,5 essai/page          | 1,0 (aucune régénération) | ✅            |
| Latence p95            | ≤ 60 s                    | 22,2 s                    | ✅            |
| Coût par page          | ≤ 0,15 €                  | 0,022 €                   | ✅            |

## Décision

**GO technique selon la règle validée (T-000)** : tous les seuils sont atteints. La stratégie A suffit ; la composition (B) n'a pas été testée, conformément à D9 (elle n'était prévue qu'en cas d'échec du coût).

## Limites (à ne pas masquer)

1. **Ressemblance et cohérence exactement au seuil**, avec un seul évaluateur et des notes uniformes : marge nulle. À re-mesurer avec 2 évaluateurs indépendants lors du pilote.
2. **Visages d'enfants fictifs** : la ressemblance sur de vraies photos d'enfants n'est pas démontrée (re-test prévu en T-504, après T-501).
3. Une seule histoire de 8 scènes, 2 répétitions : la variabilité réelle sur 10 histoires reste à observer.
4. Pas de comparaison avec d'autres fournisseurs (choix ADR-008).
5. Production non couverte : DPA, ZDR/résidence UE et analyse juridique restent à obtenir (`m0-openai-conditions.md`, T-501).

## Suite

- Passage à M1 soumis à confirmation du responsable produit.
- ADR-004 : proposition de retenir la stratégie A (en attente d'acceptation).
- Purge de `dodorea-m0-data/` à la clôture de M0 (règle 5 du protocole T-001).
