# Contrats API — ébauche REST

**Préfixe proposé** `/api/v1`. Tous les endpoints privés exigent session parent et vérification de propriété côté serveur. Réponses structurées `{ data, error, requestId }`. Aucun secret ou chemin objet permanent exposé.

| Méthode | Route | Usage |
|---|---|---|
| GET | `/stories?locale=fr-FR&ageBand=6-8` | catalogue publié |
| GET | `/stories/{storyId}` | métadonnées + aperçu |
| GET/POST | `/children` | profils du parent / création |
| PATCH/DELETE | `/children/{childId}` | modification / demande suppression |
| POST | `/children/{childId}/photo-upload` | URL upload courte + contraintes |
| POST | `/children/{childId}/characters` | démarrer génération de héros |
| GET | `/characters/{characterId}` | statut et aperçu autorisé |
| POST | `/characters/{characterId}/approve` | validation explicite |
| POST | `/books` | création idempotente avec entitlement |
| GET | `/books` | bibliothèque parentale |
| GET | `/books/{bookId}` | statut et pages si prêt |
| GET | `/books/{bookId}/pages/{n}/asset` | URL signée temporaire |
| POST | `/billing/checkout` | session de paiement |
| POST | `/webhooks/stripe` | événement signé, non session utilisateur |
| POST | `/privacy/deletion-requests` | suppression asynchrone |

## Exemple de création de livre
```json
{
  "storyVersionId": "sv_123",
  "characterId": "char_456",
  "idempotencyKey": "client-generated-uuid"
}
```
Réponse `202 Accepted` :
```json
{ "data": { "bookId": "book_789", "status": "queued" }, "requestId": "req_abc" }
```

## Codes
`400 VALIDATION_ERROR`, `401 UNAUTHENTICATED`, `403 FORBIDDEN`, `404 NOT_FOUND`, `409 CONFLICT`, `413 FILE_TOO_LARGE`, `422 UNSUPPORTED_IMAGE`, `429 RATE_LIMITED`, `503 GENERATION_UNAVAILABLE`. Ne pas distinguer par message un ID inexistant d'un ID appartenant à un autre parent si cela crée une fuite.

## Sécurité et robustesse
CSRF selon mode d'authentification ; limites upload, taille, débit ; contrôle MIME réel ; antivirus selon menace ; URL signées ; idempotence sur jobs et paiements ; validation Zod côté serveur ; webhooks vérifiés sur corps brut ; tests de replay et concurrence.

## À compléter avant implémentation
Schémas OpenAPI/Zod exhaustifs, pagination/cursors, règles d'autorisation par route, durée URL signée, SLA et format des erreurs localisées.
