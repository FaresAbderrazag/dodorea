# ADR-004 — Stratégie de génération des scènes

**Statut :** accepted · **Date :** 2026-11-11 · **Révision :** 2026-11-12 (après benchmark M0) · **Acceptation :** 2026-11-12 par le responsable produit

## Contexte

Une planche unique ne prouve pas la cohérence entre pages générées séparément.

## Options étudiées

- A : chaque scène complète générée séparément à partir de l'image du personnage validé.
- B : décors préparés + personnage composé. Coût et contrôle meilleurs, interactions physiques artificielles, décors à produire.
- C : hybride A/B, choix par scène.

## Décision initiale (2026-11-11)

Benchmarker avant sélection ; tester A seule, B seulement si le coût de A échoue (D9).

## Décision (2026-11-12, acceptée)

Retenir **A** pour le MVP. B et C ne sont pas développées.

## Justification

Benchmark M0 (`docs/research/m0-benchmark-results.md`) : A atteint tous les seuils (coût 0,022 €/page contre 0,15 €, p95 22 s, cohérence 4/5, 0 défaut grave) sans décors à produire ni pipeline de composition.

## Conséquences

Pipeline plus simple (un appel par page). Risque résiduel : cohérence au seuil exact, à surveiller pendant le pilote ; B/C restent des options de repli (nouvel ADR).

## Conditions de révision

Nouvelle preuve technique, contrainte légale, résultat d'entretien ou mesure de coût ; consigner dans un nouvel ADR si changement majeur.
