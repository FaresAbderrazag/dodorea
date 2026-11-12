# Modèle de coûts — hypothèses et méthode

## Variables
`N` = livres générés/mois ; `P` = pages par livre ; `Cg` = coût d'une génération d'image ; `r` = nombre moyen de tentatives par page ; `Ca` = coût d'un avatar ; `A` = avatars nouveaux/mois ; `Cs` = stockage/egress ; `F` = coûts fixes ; `Cp` = frais paiement.

## Formules
- **Génération mensuelle** = `N × P × r × Cg + A × Ca` (si stratégie A).
- **Coût technique mensuel** = génération + `Cs + F`.
- **Marge de contribution** = CA HT − frais paiement − coûts techniques variables − remboursements/support variables.
- **Point mort simplifié** = coûts fixes / marge de contribution par client, seulement si cette marge est positive.

## Exemple purement illustratif, NON tarif fournisseur
`N=500`, `P=8`, `r=1.2`, `Cg=0.10€`, `A=100`, `Ca=0.10€` → images scènes 480€, avatars 10€, **490€ de génération** avant stockage et frais. Une stratégie de composition réutilisant des décors peut réduire le coût variable mais exige un benchmark qualité.

## Coûts cachés
Régénérations, images rejetées, support, egress, thumbnails, stockage durable, frais de paiement, TVA, traductions/relecture, design, acquisition client, fraude, remboursements, conformité, incidents.

## Règles de pilotage
Conserver `estimatedCost` et `actualCost` par job, par modèle et par scène ; arrêter avant dépassement budget ; mesurer coût médian et p95 par livre livré ; comparer coût réel aux prix HT et à la conversion.

## Prix commerciaux
3,99 € par livre et 5,99 €/mois sont **hypothèses de test**, pas décisions. Les coûts unitaires IA doivent être recalculés avec tarifs fournisseur actuels et usages réels avant lancement.
