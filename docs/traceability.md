# Traçabilité exigences → conception → tests

| Exigences | Spécifications | Tests / preuves attendues |
|---|---|---|
| FR-001, NFR-001 | `technical/api.md`, `security-privacy.md` | auth, IDOR, session |
| FR-002, FR-004 | `functional/personalization.md`, `technical/image-pipeline.md` | benchmark héros, approbation |
| FR-003, FR-015, NFR-007 | `functional/story-content.md`, `i18n-accessibility.md` | interpolation et FR/DE |
| FR-005, FR-009 | `technical/data-model.md`, `reader-and-library.md` | relecture sans appel IA |
| FR-006, FR-014 | `functional/story-content.md`, `admin-and-payments.md` | publication et versioning |
| FR-007 | `functional/requirements.md`, `technical/api.md` | catalogue/filtre |
| FR-008, NFR-006 | `reader-and-library.md`, `i18n-accessibility.md` | mobile, clavier, lecteur écran |
| FR-010, NFR-003/004/009 | `technical/image-pipeline.md`, `cost-model.md` | retries, budget, DLQ |
| FR-011, FR-018 | `technical/data-model.md`, `security-privacy.md` | séparation familles |
| FR-012, FR-016 | `admin-and-payments.md`, `technical/api.md` | webhook, entitlement, replay |
| FR-013, NFR-008 | `security-privacy.md` | purge E2E, races |
| FR-017 | `technical/api.md`, `cost-model.md` | rate limit et quotas |
| NFR-002/005 | `security-privacy.md`, `infrastructure-operations.md` | audit stockage et logs |
| NFR-010 | `reader-and-library.md`, `testing-strategy.md` | mesure mobile réelle |

Cette matrice doit être mise à jour à chaque modification d'exigence ou de conception.
