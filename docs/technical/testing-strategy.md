# Stratégie de tests et qualité

## Unitaires
Templates de prénom FR/DE ; versioning d'histoire ; règles de droits ; quotas ; calcul de coûts ; transitions de jobs ; mapping d'erreurs fournisseur.

## Intégration
DB + stockage mock/isolé ; création livre idempotente ; accès parent croisé ; webhook signé et rejoué ; annulation et suppression pendant génération ; limite de retries ; purge d'assets.

## E2E
Compte parent → profil → upload de photo synthétique → génération simulée → validation → livre → lecture → relecture → suppression. Cas mobile, clavier, lecteur d'écran et langues FR/DE.

## Benchmark IA
Utiliser au moins un jeu de test synthétique/autorisé, plusieurs sujets et scènes. Exécuter chaque page séparément, répéter pour détecter variabilité, mesurer coût, latence, réussite, cohérence et défauts. Voir `docs/research/benchmark-template.md`.

## Tests sécurité
IDOR, auth bypass, upload polyglotte, EXIF, URL signées expirées, replay webhook, rate limiting, injection prompt dans métadonnées, accès admin, concurrence suppression/génération, absence de données dans logs.

## Gates de sortie (proposés)
Zéro vulnérabilité critique connue ; zéro fuite inter-compte ; suppression vérifiée ; toutes les pages requises prêtes ; qualité images acceptée par évaluateurs ; coûts et temps sous seuils approuvés ; traductions relues ; accessibilité revue.
