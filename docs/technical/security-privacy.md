# Sécurité, vie privée et protection des enfants

> Document de conception, **pas avis juridique** ni déclaration de conformité. Validation juridique et DPIA/AIPD à évaluer avant traitement public de photos de mineurs.

## Données et finalités
Compte parent (email), profil enfant (prénom/pseudo, tranche d'âge), photo source, personnage dessiné, pages, achat, consentements, traces techniques minimales. Chaque donnée doit avoir une finalité, une base légale et une durée documentées ; éviter toute déduction de traits sensibles depuis le visage.

## Menaces
| Menace | Mesures |
|---|---|
| IDOR entre familles | filtrage parentId côté serveur, tests croisés |
| Fuite photos via URLs | bucket privé, URL signée courte, pas d'indexation |
| Logs contenant photo/prénom | redaction, interdiction de corps requêtes, audits |
| Fournisseur réutilisant photos | contrat, vérification politiques, consentement adapté |
| Upload malveillant | sniff MIME, limites, décodage sécurisé, retrait EXIF |
| Accès admin excessif | moindre privilège, MFA, audit |
| Ré-identification via analytics | analytics minimales et agrégées |
| Job en cours après suppression | marqueur de révocation, contrôle avant chaque étape |
| Abus IA et coûts | quotas, rate limits, plafonds, alertes |
| Fuite par sauvegardes | chiffrement, rétention, purge différée documentée |

## Obligations de conception
- Parent seul titulaire du compte ; aucun profil public de l'enfant.
- Notice claire avant upload : destinataires, finalités, durée, suppression, transferts éventuels.
- Vérifier autorité du parent et droits sur l'image ; éviter de considérer une simple case cochée comme une solution juridique suffisante.
- Ne pas utiliser les photos pour entraînement ou marketing par défaut.
- Pas de reconnaissance faciale pour identifier l'enfant, ni profilage comportemental.
- Chiffrement en transit et au repos, secrets dans coffre, séparation dev/prod.
- Supprimer l'original dès qu'il n'est plus nécessaire selon politique validée ; référence et livres supprimables.
- Documenter droits d'accès, rectification, effacement, portabilité lorsque applicables, gestion d'incident et sous-traitants.
- Analyser RGPD, CNIL, règles nationales applicables aux mineurs, ePrivacy/cookies, DSA si pertinent, droit de la consommation, et transferts internationaux.

## Politique de rétention — à décider
Ne pas coder des durées arbitraires. Formaliser tableau `catégorie / finalité / base légale / durée active / sauvegarde / purge / exception légale / responsable` et le faire valider.

## Suppression
Demande authentifiée → révocation des accès → annulation des jobs → purge des assets source/référence/pages → suppression/anonymisation DB selon obligations → propagation aux sous-traitants quand applicable → journal de preuve sans données effacées. Tester les races entre génération et suppression.
