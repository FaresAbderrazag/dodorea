# Périmètre du MVP

## Inclus (proposition initiale)

1. Compte parent et session sécurisée.
2. Profil enfant : prénom/pseudonyme, tranche d'âge, avatar validé ; consentements et suppression.
3. Import d'une photo autorisée, contrôles format/poids, création d'un héros dessin animé, aperçu et validation.
4. Catalogue éditorial initial de 10 histoires ; 6–8 pages illustrées ; architecture FR/DE/EN/AR (ADR-006), contenus publiés par langue après relecture ; pilote en FR.
   4bis. Parcours classique sans photo : lecture des histoires avec un héros illustré par défaut (ADR-007).
5. Génération d'un livre personnalisé à partir d'un héros existant ; suivi d'état ; cache/relecture.
6. Lecteur mobile-first, texte séparé des images, progression et bibliothèque parentale.
7. Accès gratuit limité, paiement/abonnement si validé commercialement, administration minimale.
8. Support de la suppression des données et de l'export des données parentales pertinentes.

## Exclus

Génération libre d'histoires, conversations enfant-IA, vidéo, animations avancées, chat, réseau social, comptes enfants, publicité, marketplace, impression physique, synthèse vocale et audio en MVP, application native, publication d'images.

## Principes non négociables

Aucune photo réelle d'enfant dans le code ; accès parent uniquement ; texte non incrusté ; vérification humaine des contenus ; coût maximal par livre ; jobs réessayables et idempotents.

## Conditions de lancement public

- Revue sécurité/privacité et documentation légale validées par professionnel compétent.
- Vérification des conditions de traitement et licences du fournisseur IA.
- Benchmark image et coûts satisfaisant les seuils approuvés.
- Parcours de suppression et contrôle d'accès testés.
- Textes FR/DE relus et âge cible clarifié.
- Paiement et webhooks testés en sandbox, monitoring et support opérationnels.
