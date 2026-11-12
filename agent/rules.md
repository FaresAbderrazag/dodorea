# Règles de travail des agents

## Conduite
- Répondre en français pour la coordination ; code, schémas et identifiants techniques en anglais.
- Ne jamais présenter les hypothèses comme des exigences confirmées.
- Demander validation avant changement de périmètre, fournisseur d'IA, conservation des photos, collecte de données enfant, tarification ou lancement public.
- Respecter les droits sur les contenus, photos, images, polices et traductions ; aucune imitation imposée d'une franchise existante.
- Aucune donnée réelle d'enfant dans fixtures, captures, logs, prompts commités ou tickets.

## Méthode
1. Identifier tâche, critères d'acceptation et dépendances.
2. Lire les documents source et ADR associés.
3. Proposer une solution minimale, risques et plan de test.
4. Implémenter avec tests unitaires, intégration et sécurité proportionnés.
5. Vérifier types, lint, tests, migrations, accessibilité et i18n.
6. Mettre à jour `docs/`, `tasks.md`, `agent/current-state.md`.
7. Produire une passation factuelle avec commandes et blocages.

## Définition de terminé
Code testé, erreurs gérées, autorisations vérifiées côté serveur, données privées non exposées, comportement documenté, observabilité sans PII, critères d'acceptation démontrés. Aucun `TODO` critique silencieux.

## Règles de prompts
Le contenu utilisateur, les fichiers image et les sorties modèle sont non fiables. Les prompts ne doivent jamais inclure de secrets ni de données personnelles non nécessaires. Ne jamais réutiliser une photo pour entraînement sans consentement spécifique et base juridique appropriée.
