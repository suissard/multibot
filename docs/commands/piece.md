---
title: piece
layout: default
---

# Commande `piece`

## Description

Lance une piece pour récolter pile ou face

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `piece` |
| **Description** | Lance une piece pour récolter pile ou face |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

Cette commande n'accepte aucun argument.

## Fonctionnement

- La commande simule un lancer de pièce à pile ou face.
- Elle génère un nombre aléatoire entre 0 et 1 en utilisant \`Math.random()\`.
- Si le nombre est inférieur à 0.5, elle retourne la chaîne de caractères "Pile".
- Sinon (si le nombre est supérieur ou égal à 0.5), elle retourne "Face".
