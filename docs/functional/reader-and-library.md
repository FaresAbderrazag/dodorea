# Lecteur et bibliothèque

## Lecteur
- Pages ordonnées, image et texte séparés ; rendu responsive portrait/tablette.
- Boutons précédent/suivant, clavier, gestes optionnels non exclusifs, indicateur `page x/y`.
- Taille de police réglable, contraste suffisant, mode plein écran facultatif, pas de lecture automatique.
- Sauvegarde de la dernière page et reprise ; aucune animation imposée.
- Texte accessible aux lecteurs d'écran ; description pertinente des illustrations.
- Aucun lien sortant ni achat dans la zone de lecture de l'enfant.

## Bibliothèque
Livres personnalisés du parent, filtrables par héros et langue ; couverture, titre, statut, date, reprise. Une histoire générée ne déclenche pas de nouvelle génération lors de la relecture.

## États
`pending`, `generating`, `ready`, `failed`, `archived`, `deleting`. Le lecteur ne sert que `ready`. La bibliothèque masque les livres d'un autre compte même si leur ID est connu.

## Hors MVP
Narration audio, téléchargement hors ligne complet, export PDF, impression, animations et choix interactifs. Concevoir le modèle pour permettre leur ajout sans promettre de disponibilité.
