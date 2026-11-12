# ADR-001 — Web PWA et monolithe Next.js

**Statut :** accepted · **Date :** 2026-11-11 · **Acceptation :** 2026-11-11 par le responsable produit

## Contexte

Besoin de livrer vite avec une équipe réduite.

## Décision

Démarrer en Next.js App Router avec API intégrée, DB et worker externe.

## Alternatives considérées

Application native ou Next.js + NestJS séparé.

## Conséquences

Déploiement plus simple ; extraire les modules seulement si charge justifie.

## Conditions de révision

Nouvelle preuve technique, contrainte légale, résultat d'entretien ou mesure de coût ; consigner dans un nouvel ADR si changement majeur.
