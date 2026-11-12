# M0 — Conditions et tarifs OpenAI GPT Image (T-002, OQ-05)

**Statut :** vérification documentaire faite le 2026-11-11 sur les sources officielles · aucune analyse juridique (T-501) · fournisseur retenu pour M0 par ADR-008.

## Sources consultées (2026-11-11)

- Guide génération d'images : https://developers.openai.com/api/docs/guides/image-generation
- Contrôles des données : https://developers.openai.com/api/docs/guides/your-data
- Tarifs : https://developers.openai.com/api/docs/pricing
- Services Agreement (en vigueur au 2026-01-01) : https://openai.com/policies/services-agreement/
- Usage Policies (version applicable au 2026-11-20) : https://openai.com/policies/usage-policies/

## Critères éliminatoires

| Critère                      | Constat                                                                                                                                                                                                                                                                                                                                                                                                              | Source                                   | Statut                  |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ----------------------- |
| Entraînement sur nos données | Données API non utilisées pour l'entraînement, sauf opt-in explicite                                                                                                                                                                                                                                                                                                                                                 | your-data ; Services Agreement §4.2      | vérifié                 |
| Conservation                 | `/v1/images/edits` et `/generations` : journaux de surveillance des abus **30 jours**, pas d'état applicatif. Zero Data Retention possible **sur approbation** (équipe commerciale). Exception : image suspectée CSAM conservée pour revue même en ZDR                                                                                                                                                               | your-data                                | vérifié                 |
| Usage commercial / propriété | Le client conserve ses entrées et **possède les sorties** ; cession des droits éventuels d'OpenAI                                                                                                                                                                                                                                                                                                                    | Services Agreement §4.1                  | vérifié                 |
| Contrat RGPD (DPA)           | DPA intégré par référence au contrat (§5.3) ; client EEE contractant avec OpenAI Ireland Ltd                                                                                                                                                                                                                                                                                                                         | Services Agreement §5.3, §17             | DPA lui-même **à lire** |
| Transferts hors UE           | Traitement global par défaut. Résidence UE (`eu.api.openai.com`) : approbation requise + ZDR ou Modified Abuse Monitoring, surcoût 10 %                                                                                                                                                                                                                                                                              | your-data                                | vérifié ; non activé    |
| Mineurs                      | Interdits : sexualisation, contenus inadaptés, usage de l'image d'une personne sans consentement. Les mineurs ne peuvent pas utiliser le service sans consentement parental (§3.3 c). Aucune interdiction explicite trouvée sur la stylisation d'une photo d'enfant avec consentement : **à confirmer juridiquement (T-501)**. Politiques mises à jour le 2026-11-20 (« protections enfants clarifiées ») : à relire | Usage Policies ; Services Agreement §3.3 | partiel                 |

**Conclusion pour M0** (visages générés + adulte consentant) : aucune condition éliminatoire identifiée.
**Pour la production** (photos d'enfants) : DPA, ZDR/MAM et résidence UE à obtenir, plus T-501. Ce n'est pas acquis.

## Modèles disponibles (2026-11-11)

- `gpt-image-1` est **arrêté depuis le 2026-10-23**.
- Actuels : `gpt-image-2.6-sunburst` / `-flare`, `gpt-image-2.5-sunburst` / `-flare`, `gpt-image-2`, `gpt-image-1.5`, `gpt-image-1-mini`.
- Compatibles ZDR et résidence UE : 2.5 (sunburst/flare), `gpt-image-2`, `gpt-image-1.5`, `gpt-image-1-mini`. **Les modèles 2.6 n'y figurent pas.**
- Une vérification de l'organisation peut être exigée avant d'utiliser GPT Image.

## Tarifs officiels (par million de jetons, offre Standard)

| Modèle                                     | Image entrée | Image sortie | Texte entrée |
| ------------------------------------------ | ------------ | ------------ | ------------ |
| 2.6 / 2.5 sunburst et flare, `gpt-image-2` | 8 $          | 30 $         | 5 $          |
| `gpt-image-1-mini`                         | 2,50 $       | 8 $          | 2 $          |

Coût de sortie publié par image en 1024×1024 :

| Modèle             | Basse   | Moyenne | Haute   |
| ------------------ | ------- | ------- | ------- |
| `gpt-image-2`      | 0,006 $ | 0,053 $ | 0,211 $ |
| `gpt-image-1-mini` | 0,005 $ | 0,011 $ | 0,036 $ |

S'ajoutent les jetons d'entrée (prompt + image de référence). `gpt-image-2` traite toujours les images en haute fidélité, donc les jetons d'entrée sont plus élevés. Pour 2.5 et 2.6, le nombre de jetons par qualité n'est pas publié : **coût à mesurer** via le champ `usage` de la réponse.

## Limites annoncées par OpenAI (pertinentes pour M0)

- Cohérence : le modèle « peut parfois avoir du mal à maintenir la cohérence visuelle des personnages récurrents ». C'est précisément le risque testé.
- Latence : jusqu'à 2 minutes pour les requêtes complexes, à comparer au seuil p95 de 60 s.
- Modération : paramètre `moderation` (`auto` par défaut). Erreurs `moderation_blocked` à ne pas relancer automatiquement.
- Identifiant de sécurité recommandé (`safety_identifier`, haché, sans donnée personnelle).

## Reste à faire (responsable produit)

- [ ] Limite de dépense configurée sur le compte (≤ 50 €).
- [ ] Vérification d'organisation, si OpenAI la demande.
- [ ] Choix du modèle et de la qualité du benchmark.
- [ ] Lecture du DPA (requise avant la production, pas pour M0).
