# Questions ouvertes — décision explicite requise

| ID    | Question                                                                                       | Impact            | Responsable proposé |
| ----- | ---------------------------------------------------------------------------------------------- | ----------------- | ------------------- |
| OQ-01 | Pays de lancement, marché FR/DE et langues obligatoires à J1 ?                                 | contenu, légal    | produit             |
| OQ-02 | Âge cible exact et place de la lecture audio ?                                                 | UX, sécurité      | produit             |
| OQ-03 | Une photo d'enfant réelle est-elle nécessaire au MVP public, ou seulement au pilote autorisé ? | privacy           | produit/juridique   |
| OQ-04 | Quelle durée de conservation pour photo originale, référence héros et livres ?                 | architecture/RGPD | juridique/tech      |
| OQ-05 | Quel fournisseur et quelles garanties contractuelles de traitement des images ?                | coût, privacy     | tech/juridique      |
| OQ-06 | Quel seuil acceptable de ressemblance, cohérence, coût et délai ?                              | go/no-go          | produit/tech        |
| OQ-07 | Achat unitaire, abonnement, quotas, remboursement et droit d'accès après résiliation ?         | business          | produit             |
| OQ-08 | Comment gérer plusieurs enfants sur une photo ou une photo d'adulte ?                          | consentement      | produit             |
| OQ-09 | Que faire si la génération ressemble insuffisamment à la photo ?                               | support/coûts     | produit             |
| OQ-10 | Quelles licences d'illustrations, traductions et polices ?                                     | IP                | éditorial/juridique |

Ne pas implémenter une réponse implicite à ces questions sans décision documentée.

## Réponses consignées (2026-11-11, responsable produit)

- OQ-01 (partiel) : pilote parents en **français** ; architecture FR/DE/EN/AR (ADR-006). Pays de lancement : ouvert.
- OQ-03 (partiel) : phase de test M0 avec **visages fictifs uniquement** ; un parcours sans photo existe (ADR-007). Photo réelle d'enfant au MVP public : soumise à T-501.
- OQ-06 : seuils validés le 2026-11-11, voir `docs/research/m0-go-no-go-thresholds.md` (coût et latence à confronter aux tarifs réels en T-002).
