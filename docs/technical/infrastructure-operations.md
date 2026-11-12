# Infrastructure, CI/CD et exploitation

## Environnements
`local`, `staging`, `production` séparés ; DB et buckets distincts ; aucune photo réelle en dev/staging sauf protocole autorisé. Secrets via variables sécurisées, jamais dans Git.

## Déploiement proposé
Next.js hébergé sur plateforme managée, PostgreSQL managé, stockage S3/R2 privé, worker persistant ou jobs managés, queue durable, CDN pour **assets publics du catalogue uniquement**. Choix final après benchmark et vérification contractuelle.

## Pipeline CI
Install lockfile → typecheck → lint → unit tests → migrations check → integration tests → build → SAST/dependency scan → deploy staging → smoke → approbation production. Migrations réversibles ou stratégie expand/contract.

## Observabilité
Mesurer sans PII : temps génération avatar, temps par scène, taux de succès, retries, coût par job, files d'attente, erreurs fournisseur, taux de livres prêts, latence lecteur, échecs de paiement, suppression en retard. Alertes sur coût quotidien, queue bloquée, fuite d'erreurs 5xx, échec webhooks.

## Runbooks
- Fournisseur IA indisponible : suspendre nouveaux jobs, afficher délai, conserver file, pas de facturation répétée.
- Coût anormal : bloquer générations au-delà du budget, examiner retries.
- Webhook Stripe en échec : rejouer idempotemment, réconcilier entitlements.
- Suppression bloquée : prioriser incident, audit des objets et sous-traitants.
- Incident données : contenir, investiguer, consulter obligations de notification.

## Sauvegardes
Backups DB chiffrés et restauration testée ; politique de rétention documentée ; ne pas faire réapparaître des données supprimées lors d'une restauration sans procédure de repurge.
