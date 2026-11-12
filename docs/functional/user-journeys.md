# Parcours utilisateur et cas alternatifs

## UJ-01 — Première histoire

1. Parent ouvre le catalogue sans fournir de photo.
2. Il consulte une histoire, son âge conseillé et un aperçu.
3. Il crée un compte, accepte les conditions nécessaires et crée un profil (prénom/pseudo, âge approximatif).
4. Il téléverse une photo qu'il est autorisé à utiliser, après information sur le traitement.
5. Le service valide type, taille, présence d'un visage unique (détection de présence uniquement, sans empreinte biométrique, voir `personalization.md`) et sécurité du fichier.
6. Le job génère un héros dessiné ; le parent voit le rendu et peut accepter ou demander une nouvelle tentative dans une limite annoncée.
7. Il sélectionne une histoire disponible dans sa langue et crée son livre ; droits d'accès vérifiés.
8. L'application affiche progression, puis livre prêt ; le parent lit et retrouve le livre dans sa bibliothèque.

## UJ-02 — Nouvelle aventure

Parent choisit un héros existant et une autre histoire ; pas de nouvelle photo requise ; nouveau livre créé avec son propre état et ses propres images.

## UJ-03 — Relecture

Le livre est ouvert depuis la bibliothèque ; les images existantes sont servies par URL temporaires ; aucun appel IA et aucune nouvelle facturation.

## UJ-04 — Suppression

Parent demande la suppression du profil et des données associées ; confirmation explicite ; accès révoqué ; jobs en cours annulés si possible ; assets et références purgés selon politique légale validée ; reçu sans données sensibles.

## Erreurs à gérer

- Photo invalide, plusieurs visages, image floue, format non supporté.
- Refus d'autorisation ou consentement manquant.
- Génération échouée, délai dépassé, quota épuisé, fournisseur indisponible.
- Ressemblance jugée insuffisante ; régénération bornée ou support.
- Paiement en attente, webhook reçu plusieurs fois, annulation.
- Histoire indisponible dans la langue choisie.
- Accès à un livre d'un autre parent : refus 404/403 sans fuite d'information.

## États UI

`idle`, `uploading`, `queued`, `processing`, `review`, `ready`, `failed`, `cancelled`, `deleting`. Chaque état possède texte accessible et action suivante.
