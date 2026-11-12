# Modèle éditorial des histoires

## Structure
Une histoire possède ID stable, version immuable, langue, tranche d'âge, thème, durée estimée, synopsis, couverture, nombre de pages, pages ordonnées et indicateur de publication. Une page contient un texte **édité**, des variables autorisées, une description de scène et les contraintes de placement du héros.

## Variables de texte autorisées
`{heroName}` uniquement au MVP. Prévoir règles de déclinaison grammaticale par langue : le prénom peut nécessiter une formulation alternative, notamment en allemand. Ne pas concaténer des fragments non traduits.

## Exemple de page (conceptuel)
```json
{
  "storyId": "lost-kingdom",
  "version": 1,
  "locale": "de-DE",
  "pageNumber": 2,
  "text": "Eines Morgens entdeckte {heroName} eine leuchtende Karte.",
  "sceneKey": "forest-map",
  "heroPose": "kneeling",
  "safetyNotes": ["no-violence", "warm-tone"]
}
```

## Politique éditoriale
- Textes adaptés à l'âge ; pas de violence graphique, sexualisation, peur excessive, manipulation ou stéréotypes discriminatoires.
- Pas de personnages protégés ni d'imitation de styles sous droits sans licence.
- Un relecteur humain valide chaque histoire et chaque traduction avant publication.
- Prévoir diversité des familles et personnages sans inférer d'identité sensible depuis la photo.
- Aucune publicité, lien externe ou collecte de réponses de l'enfant dans le lecteur.

## Versioning
Une modification crée `storyVersion + 1`. Les livres déjà créés pointent vers la version d'origine. Retrait d'une histoire : la politique d'accès aux achats passés doit être définie légalement.
