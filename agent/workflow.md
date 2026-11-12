# Workflow de réalisation

## Cycle
**Discovery → Décision → Implémentation → Vérification → Documentation → Passation**.

### Discovery
Lire exigences, relever inconnues, comparer alternatives. Classer : confirmé / proposé / à mesurer.
### Décision
Rédiger ADR pour tout changement structurant (IA, stockage, auth, paiement, i18n, rétention). Statuts `proposed`, `accepted`, `superseded`, `rejected`.
### Implémentation
Vertical slices : profil → référence personnage → job → livre → lecteur. Garder les traitements longs hors requêtes HTTP synchrones.
### Vérification
Tests fonctionnels, sécurité d'accès parent, idempotence des jobs, réessais bornés, suppression, qualité des images, traduction et accessibilité.
### Documentation
Mettre à jour spécifications pertinentes, matrice de traçabilité, tâches et état.
### Passation
Reporter ce qui est prouvé et ce qui reste hypothétique.

## Branches et commits (proposition)
Branches `feat/*`, `fix/*`, `docs/*`, `spike/*`; petites PR, revue des migrations, aucune image personnelle dans Git.
