# ADR-009 — Style graphique maison unique

**Statut :** accepted · **Date :** 2026-11-12 · **Acceptation :** 2026-11-12 par le responsable produit

## Contexte

Le personnage validé par le parent est dessiné dans un style donné et réutilisé d'une histoire à l'autre (ADR-003). Le premier essai M0 (F1) a produit un rendu peint semi-réaliste, alors que la cible est un dessin animé. La question posée : le style doit-il dépendre de l'histoire ?

## Options étudiées

1. **Style maison unique** pour toutes les histoires : héros identique partout, une seule validation parentale, identité de marque.
2. Style propre à chaque histoire : variété, mais un personnage et une validation par style, et un héros qui change de visage d'un livre à l'autre.
3. Deux ou trois styles maison au choix de l'histoire : compromis, plus de validations et de complexité.

## Décision

Option 1, avec le style **dessin animé 2D plat** : contours nets, aplats de couleurs vives, ombrage minimal. L'ambiance d'une histoire passe par la palette, la lumière et les décors, jamais par le trait du personnage.

## Conséquences

- Une seule référence de personnage par enfant (`styleVersion` unique au MVP) ; aucune revalidation entre les histoires.
- La consigne de style est un paramètre versionné (`renderConfigVersion`). La changer impose de régénérer les références.
- Le benchmark M0 mesure la cohérence dans ce seul style.
- Révisable vers l'option 3 si les retours des parents le justifient (nouvel ADR).

## Traçabilité

ADR-003, ADR-004, ADR-008 ; T-003 à T-007 ; `docs/functional/personalization.md` (`styleVersion`) ; `spike/m0/src/scenes.ts`.
