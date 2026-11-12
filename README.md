# Dodorea — dossier de cadrage produit et agents IA

**Statut :** cadrage initial, non validé pour production · **Version documentaire :** 0.1 · **Date :** 2026-11-11

## Vision

Application web mobile-first de livres numériques illustrés pour une lecture **parent-enfant**. Un parent téléverse volontairement une photographie, fait générer un personnage de **dessin animé ressemblant** à la personne photographiée, valide le personnage, puis l'utilise comme héros de plusieurs **histoires préécrites**. Le prénom est inséré dans le texte par l'application et non dessiné dans les images. Le livre final est conservé pour relecture.

## Décisions issues du cadrage

- Numérique, et non livre papier en première intention (PWA, monolithe Next.js : ADR-001, accepté).
- Photo réelle → personnage de dessin animé reconnaissable comme parcours de personnalisation ; un **parcours classique sans photo** permet aussi de lire les histoires (ADR-007, accepté).
- Histoires éditorialisées, pas de génération libre du récit dans le MVP.
- Lecture page par page accompagnée, sans publicité ni mécanismes de captation.
- Réutilisation du personnage validé d'une histoire à l'autre.
- **Internationalisation prévue dès le départ** : français, allemand, anglais et arabe (dont lecture de droite à gauche). Les histoires sont publiées par langue après relecture native (voir ADR-006, accepté ; pilote en français, arabe standard vocalisé, textes accordés au genre du héros). Un prototype a été réalisé avec le pseudo « Sapio » et un texte allemand ; ce n'est pas une spécification de compte utilisateur.

## Hypothèses proposées (à valider)

- Cible initiale : familles avec enfants de 6 à 8 ans ; pas de promotion d'usage autonome chez les plus jeunes.
- Catalogue de lancement : 10 histoires, 6 à 8 pages illustrées par histoire.
- Stack cible : Next.js/TypeScript, PostgreSQL/Prisma, stockage objet privé, worker asynchrone, Stripe.
- Modèle commercial : découverte gratuite limitée + achat à l'unité ou abonnement, après tests utilisateurs.

## Où commencer

1. Lire `AGENTS.md`, puis `agent/context.md` et `agent/current-state.md`.
2. Lire `docs/product/vision.md`, `docs/product/scope.md`, `docs/functional/user-journeys.md`.
3. Lire `docs/technical/architecture.md`, `docs/technical/image-pipeline.md`, `docs/technical/data-model.md`.
4. Suivre `tasks.md`, sans transformer les hypothèses en décisions implicites.

## Séparation des responsabilités

- `agent/` : règles de collaboration des agents, état du travail, passation et processus.
- `docs/` : documentation **du produit**, fonctionnelle, technique, sécurité, exploitation, commercialisation.
- `tasks.md` : backlog opérationnel et critères d'acceptation.
- `AGENTS.md` : point d'entrée des agents.

## Arborescence

Voir `docs/index.md` et `docs/traceability.md` pour la navigation et les correspondances exigences → tests.

## Avertissements

Aucun fournisseur, coût, tarif, délai, licence, conformité ou choix de modèle IA n'est définitivement validé. Les exemples de données personnelles sont fictifs. Ne jamais déposer de photographie réelle d'enfant dans le dépôt, dans des logs ou dans un outil de test non autorisé.
