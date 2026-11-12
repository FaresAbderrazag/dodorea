# M0 — Protocole du jeu de visages fictifs (T-001, OQ-03)

**Statut :** protocole validé (2026-11-11) · visages F1–F3 **produits avec Google Gemini** (2026-11-11), F5 photo du responsable produit · **Outil prévu :** Adobe Firefly (D5) ; Gemini accepté car distinct du fournisseur testé

## Règles

1. Visages d'enfants **générés** uniquement. **Aucune photo de mineur réel**, même avec l'accord d'un proche (contrainte M0 ; T-501).
   - Exception validée (2026-11-11) : la photo du **responsable produit**, adulte consentant pour lui-même, comme témoin adulte réel (F5).
2. Outil distinct du fournisseur testé (OpenAI, ADR-008) pour éviter le biais de style.
3. Rendu **photoréaliste**, de face, lumière neutre, fond uni, comme une photo prise par un parent.
4. Stockage **hors du dépôt** : `~/Desktop/dodorea-m0-data/faces/`. Jamais dans `Desktop/dodorea/`, ni dans les logs, ni dans le chat. Seuls les fichiers inscrits au registre peuvent s'y trouver au moment d'une exécution.
5. Purge : suppression de `~/Desktop/dodorea-m0-data/` à la clôture de T-007, consignée dans le tableau ci-dessous.
6. Si l'outil refuse un portrait d'enfant photoréaliste : utiliser un visage d'adulte fictif et le noter (limite de validité).

## Visages

| ID             | Instruction à saisir dans Firefly                                                                                                                | Variété                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| F1             | Photo portrait réaliste d'une fillette de 6 ans, peau claire, cheveux blonds raides, de face, regard caméra, lumière douce neutre, fond gris uni | âge bas, cheveux raides    |
| F2             | Photo portrait réaliste d'un garçon de 7 ans, peau foncée, cheveux crépus courts, de face, regard caméra, lumière douce neutre, fond gris uni    | carnation, texture cheveux |
| F3             | Photo portrait réaliste d'une fille de 8 ans, peau mate, longs cheveux bruns, lunettes rondes, de face, lumière douce neutre, fond gris uni      | lunettes, cheveux longs    |
| F4 _(réserve)_ | Photo portrait réaliste d'un garçon de 7 ans aux traits est-asiatiques, frange, de face, lumière douce neutre, fond gris uni                     | traits, frange             |
| F5 _(témoin)_  | Photo réelle du responsable produit (adulte, consentement personnel), de face, lumière neutre, EXIF retiré                                       | adulte réel                |

Le benchmark utilise **F1–F3** (D2 : 3 visages). F4/F5 servent de remplacement en cas de refus ou d'image inutilisable.

## Registre (à remplir par le responsable produit)

| ID  | Fichier (`~/dodorea-m0-data/faces/`) | Date       | Outil et version                   | Licence / conditions vérifiées                      | Purgé le |
| --- | ------------------------------------ | ---------- | ---------------------------------- | --------------------------------------------------- | -------- |
| F1  | F1.png                               | 2026-11-11 | Google Gemini (application)        | à vérifier (conditions Gemini)                      |          |
| F2  | F2.png                               | 2026-11-11 | Google Gemini (application)        | à vérifier (conditions Gemini)                      |          |
| F3  | F3.png                               | 2026-11-11 | Google Gemini (application)        | à vérifier (conditions Gemini)                      |          |
| F5  | F5.jpg                               | 2026-11-11 | Photo réelle (responsable produit) | consentement personnel ; envoi à OpenAI après T-002 |          |

## Critères d'acceptation (T-001)

Protocole documenté ✅ · 3 visages variés produits ✅ · source consignée ✅, licence ⏳ (à vérifier) · stockage hors Git ✅ (règle + `.gitignore`) · règle de purge ✅ · aucune image dans le dépôt ✅.
