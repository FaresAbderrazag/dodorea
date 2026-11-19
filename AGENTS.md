# Instructions racine pour tout agent IA

1. Lire `agent/rules.md`, `agent/context.md`, `agent/current-state.md`, `agent/handoff.md`, `agent/workflow.md`, `tasks.md` avant toute modification significative.
2. **Séparer strictement** instructions d'agents (`agent/`) et documentation du produit (`docs/`). Les spécifications du pipeline IA appartiennent à `docs/technical/image-pipeline.md`, pas à `agent/`.
3. Priorité des sources : décision explicite de l'utilisateur > ADR accepté > spécification produit approuvée > backlog > proposition. Signaler les contradictions, ne pas les résoudre silencieusement.
4. Ne jamais inventer une validation utilisateur, un benchmark, une conformité légale, un coût API ou une garantie de ressemblance.
5. Respecter les garde-fous enfants et vie privée : photos sensibles, stockage privé, consentement et suppression, minimisation, accès parent seulement.
6. Chaque modification fonctionnelle doit synchroniser critères d'acceptation, modèle de données, API, sécurité, tests et `docs/traceability.md` si concernés.
7. Modifier `agent/current-state.md` à la fin de chaque session et `agent/handoff.md` si une reprise est attendue. `tasks.md` contient les tâches, **pas** les instructions de passation.
8. N'exécuter aucune intégration payante ni transfert de photo réelle sans autorisation explicite et vérification des conditions du fournisseur.
9. Préférer une vertical slice mesurable à une architecture prématurément complexe ; aucun déploiement public sans revue de sécurité.
10. Conserver les identifiants d'exigences (`FR-*`, `NFR-*`) et décisions (`ADR-*`) stables.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
