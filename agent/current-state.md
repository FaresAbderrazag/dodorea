# État actuel — à mettre à jour après chaque session

**Mise à jour :** 2026-11-11
**Phase :** cadrage documentaire, avant développement.

## Réalisé

- Concept produit défini : livre numérique personnalisé par photo, personnage de dessin animé, prénom, lecture parent-enfant.
- Prototype visuel conversationnel exploratoire ; aucune validation technique reproductible.
- Premier lot de spécifications, architecture cible, exigences, sécurité, tests et backlog rédigés.

- 2026-11-11 : corrections de cohérence (T-000 ajouté, critères M0, `GenerationJob.parentId`), contraintes M0 validées (photos fictives, budget 50 €).
- 2026-11-11 : ADR-001 et ADR-006 (FR/DE/EN/AR, pilote FR, arabe standard vocalisé, accords au genre) acceptés ; ADR-007 (parcours sans photo) accepté ; règle « détection de présence de visage, pas de biométrie » consignée.
- 2026-11-11 : **T-000 terminé**, seuils go/no-go validés (`docs/research/m0-go-no-go-thresholds.md`).
- 2026-11-11 : ADR-008 (OpenAI GPT Image pour M0) ; protocole T-001 rédigé ; banc `spike/m0/` en mode simulé créé, typage OK et 8/8 tests OK.
- 2026-11-11/12 : T-002 vérifié (`docs/research/m0-openai-conditions.md`) ; adaptateur OpenAI (16/16 tests) ; premiers appels réels réussis après vérification d'organisation : ≈ 0,019 €/image, ≈ 12 s. ADR-009 (style maison 2D plat) accepté. Total dépensé ≈ 0,04 €.
- 2026-11-12 : **benchmark M0 terminé** — 68 images, 0 erreur, 0,022 €/page, p95 22 s, notes 4/5 confirmées : **GO technique** (`docs/research/m0-benchmark-results.md`). Dépense M0 ≈ 1,52 €. En attente : ADR-004 (stratégie A, proposed) et confirmation du passage à M1.
- 2026-11-12 : ADR-004 accepté (stratégie A) ; **M0 clôturé, M1 lancé**.

## Non réalisé

- Aucun dépôt applicatif initialisé ; aucune API, schéma DB ou pipeline IA implémenté.
- Aucun benchmark fournisseur, coût mesuré, revue juridique, entretien parent ou test utilisateur.
- Aucune décision finale sur abonnement, durée de conservation, fournisseurs et identité graphique.
- Machine d'états unique par entité (livre, personnage, job) à définir au début de M1.

## Prochaine action recommandée

T-001 (protocole jeu de visages fictifs), T-002 (comparaison fournisseurs), puis **M0 / spike** : une histoire pilote, 3 scènes générées séparément à partir d'une référence validée, au moins 5 répétitions, score humain de cohérence, mesure de coût et latence, sans photographie d'enfant réel.

## Blocages / décisions à obtenir

Voir `docs/product/open-questions.md` et `docs/decisions/ADR-004-image-generation-strategy.md`.
