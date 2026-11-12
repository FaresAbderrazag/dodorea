# Administration, droits d'accès et paiements

## Administration
Rôles `admin` et `editor` distincts des parents. CRUD brouillon d'histoire et de traduction, prévisualisation, contrôle de version, publication et retrait avec journal d'audit. Les administrateurs ne voient pas les photos enfants par défaut ; accès exceptionnel justifié et tracé si nécessaire.

## Paiements (proposition)
Prestataire Stripe ; aucun numéro de carte stocké dans l'application. `Checkout Session` ou équivalent ; droits accordés **uniquement** après confirmation serveur via webhook signé et événement traité idempotemment. Un retour navigateur réussi ne prouve pas le paiement.

## Entitlements
Un achat unitaire autorise la lecture du livre associé selon conditions contractuelles ; un abonnement donne accès à un catalogue et quota de nouvelles créations. Politique post-résiliation et remboursement à décider avant implémentation.

## Anti-abus
Limiter créations et régénérations, protéger les endpoints de paiement et d'upload, empêcher double facturation et courses concurrentes. Support client et politique de remboursement documentés.
