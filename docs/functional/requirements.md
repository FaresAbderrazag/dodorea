# Exigences fonctionnelles — MVP

Statuts : **C** confirmé par le cadrage ; **P** proposé et à valider.

| ID | Statut | Exigence | Critère d'acceptation |
|---|---|---|---|
| FR-001 | P | Compte parent sécurisé | inscription/connexion/déconnexion, récupération testées |
| FR-002 | C | Personnage à partir d'une photo | photo autorisée → rendu dessin animé reconnaissable |
| FR-003 | C | Prénom/pseudo personnalisable | insertion correcte dans toutes les pages, sans texte incrusté |
| FR-004 | C | Validation du héros | aucun livre facturable généré avec un héros non validé |
| FR-005 | C | Réutilisation du héros | un héros validé peut servir dans deux livres distincts |
| FR-006 | C | Histoires préécrites | aucune génération libre de texte narratif en MVP |
| FR-007 | P | Catalogue filtrable | filtres langue, âge, durée et thème fonctionnels |
| FR-008 | C | Lecture page par page | navigation, texte lisible, progression sauvegardée |
| FR-009 | C | Livre réutilisable | relecture sans nouvelle génération ni facturation |
| FR-010 | P | Suivi de génération | états visibles, échec explicite, reprise sûre |
| FR-011 | P | Bibliothèque parentale | seulement les livres autorisés du compte |
| FR-012 | P | Paiement | achat/abonnement via webhook vérifié, droits idempotents |
| FR-013 | P | Suppression de données | effacement demandé et propagation vérifiable |
| FR-014 | P | Administration | publication et retrait de versions d'histoires |
| FR-015 | P | FR/DE | UI traduite et histoire disponible uniquement si version relue |
| FR-016 | P | Aperçu avant achat | aucun accès au contenu payant sans droit |
| FR-017 | P | Quotas et anti-abus | limites par compte et génération, messages clairs |
| FR-018 | P | Plusieurs profils enfant | séparation des personnages et des livres par profil |

## Exigences non fonctionnelles
| ID | Exigence | Vérification |
|---|---|---|
| NFR-001 | Contrôle d'accès serveur systématique | tests IDOR et multi-tenant |
| NFR-002 | Aucune image privée publiquement indexable | audits URL et permissions |
| NFR-003 | Jobs idempotents et réessayables | tests de concurrence et replay |
| NFR-004 | Budgets de coût par génération | plafond et métriques mesurés |
| NFR-005 | Observabilité sans photos ni prénom en clair | inspection logs et traces |
| NFR-006 | Accessibilité WCAG 2.2 AA visée | audits automatisés et manuels |
| NFR-007 | i18n FR/DE sans texte dans les images | test locale et qualité éditoriale |
| NFR-008 | Suppression traçable | tests end-to-end de purge |
| NFR-009 | Résilience aux erreurs fournisseur | timeouts, backoff, circuit breaker |
| NFR-010 | Performance lecteur mobile | budgets fixés après mesure réelle |
