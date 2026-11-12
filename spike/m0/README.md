# Banc de test M0 (jetable)

Mesure la faisabilité du héros (T-003 à T-007) : 3 visages fictifs × (1 personnage + 8 scènes × 2 répétitions). Stratégie A uniquement (D9). Ce code n'est **pas** l'application (M1).

## Règles

- Appels OpenAI (ADR-008, `gpt-image-2.5-flare`, qualité moyenne) uniquement avec `--confirm-paid`, après accord du responsable produit.
- Seuls les visages du registre T-001 (F1, F2, F3, F5) sont acceptés.
- Plafond 50 € codé (`BudgetGuard`), vérifié avant chaque appel ; coût réel calculé à partir des jetons facturés.
- Données hors dépôt dans `M0_DATA_DIR` : `faces/` (entrées), `characters/` (personnages validés, copiés à la main), `runs/` (sorties). CSV des mesures dans `out/` (ignoré par Git).
- Aucun chemin ni contenu d'image dans les logs ou le CSV.

## Commandes

```sh
npm install
npm run typecheck
npm test
npm run run:mock

# 1. Personnages (puis validation humaine : copier les retenus dans characters/F1.png…)
npx tsx src/run.ts --provider=openai --mode=characters --faces=F1,F2,F3 --confirm-paid
# 2. Scènes à partir des personnages validés
npx tsx src/run.ts --provider=openai --mode=scenes --faces=F1,F2,F3 --repetitions=2 --confirm-paid
```
