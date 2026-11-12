# ADR-006 — Internationalisation FR/DE/EN/AR dès la conception

**Statut :** accepted · **Date :** 2026-11-11 · **Révision :** 2026-11-11 (extension EN/AR demandée par le responsable produit) · **Acceptation :** 2026-11-11 par le responsable produit

## Contexte

Un prototype en allemand montre un cas d'usage, sans preuve de demande de marché. Le responsable produit demande que l'i18n couvre aussi l'anglais et l'arabe. L'arabe impose une écriture de droite à gauche (RTL), coûteuse à ajouter après coup.

## Options étudiées

1. Les 4 langues livrées intégralement au lancement (40 versions relues) : coût et délai élevés.
2. Architecture prête pour 4 langues dès M1, contenus publiés par langue après relecture : coût technique faible, coût éditorial étalé.
3. FR/DE seulement, ajout ultérieur : dette RTL coûteuse.
4. (Version initiale) Français seul ou traduction à la volée : qualité non maîtrisée.

## Décision (acceptée)

Option 2. Locales : `fr`, `de`, `en`, `ar`. Interface et lecteur compatibles RTL dès M1 (`dir`, propriétés CSS logiques, navigation inversée en arabe). Messages au format ICU (pluriels). Chaque `StoryVersion` n'est publiée dans une locale qu'après relecture native. Les illustrations restent sans texte (ADR-002) et ne sont jamais mirrorées.

## Conséquences

Travail éditorial et typographique accru (police arabe adaptée aux enfants), tests RTL/bidi et accessibilité par langue.

Précisions validées (2026-11-11) :

- Langue du pilote parents : **français**.
- Arabe : **arabe standard moderne**, texte **vocalisé** (tashkīl) pour les jeunes lecteurs.
- Textes **accordés au genre grammatical du héros** (masculin/féminin) dans toutes les langues ; champ minimal dans le profil enfant.

## Traçabilité

FR-015, T-104, T-304, T-403, T-503 ; `docs/technical/data-model.md` (`StoryVersion.locale`).

## Conditions de révision

Nouvelle preuve technique, contrainte légale, résultat d'entretien ou mesure de coût ; consigner dans un nouvel ADR si changement majeur.
