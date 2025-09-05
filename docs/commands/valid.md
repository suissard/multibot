---
title: valid
layout: default
---

# Commande `valid`

## Description

Permet de valider une commande

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `valid` |
| **Description** | Permet de valider une commande |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

Cette commande n'accepte aucun argument.

## Fonctionnement

- **ATTENTION : Cette commande semble incomplète ou faire partie d'un système inachevé.**
- L'objectif de cette commande est de "valider" une autre commande qui serait en attente.
- Elle prend en argument l'ID d'une commande à valider.
- Elle tente de récupérer cette commande depuis une collection \`this.bot.validableCommands\`.
- Cependant, le code actuel ne fait rien avec la commande une fois qu'elle est récupérée. La logique de validation elle-même n'est pas implémentée.
