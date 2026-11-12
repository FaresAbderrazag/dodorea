# ADR-007 — Parcours classique sans photo

**Statut :** accepted (principe) · **Date :** 2026-11-11 · **Acceptation :** 2026-11-11 par le responsable produit

## Contexte

ADR-003 fait de la photo le parcours de personnalisation. `agent/context.md` évoquait une photo facultative sans qu'aucun parcours alternatif ne soit spécifié. Certains parents refuseront de téléverser une photo d'enfant.

## Options étudiées

1. Photo obligatoire : barrière forte, exclut les parents prudents, aucune lecture possible sans données sensibles.
2. Parcours sans photo avec héros illustré par défaut (prénom inséré dans le texte) : accès immédiat, minimisation des données, découverte du produit.
3. Avatar configurable manuellement : coût de conception plus élevé, hors périmètre MVP.

## Décision

Option 2. Les histoires peuvent être lues sans photo ; la personnalisation par photo (ADR-003) reste l'offre différenciante et n'est pas remplacée.

## Conséquences

- `PersonalizedBook.characterId` devient optionnel (héros par défaut si absent).
- Chaque histoire nécessite des illustrations par défaut, générées une fois et réutilisées (pas de coût IA par lecteur).
- Point ouvert : place du parcours sans photo dans l'offre commerciale (gratuit, découverte ou payant — OQ-07).

## Traçabilité

ADR-003, OQ-03, OQ-07 ; `docs/product/scope.md` ; `docs/technical/data-model.md` ; T-104, T-301, T-304.

## Conditions de révision

Résultat d'entretien parent ou mesure de conversion ; consigner dans un nouvel ADR si changement majeur.
