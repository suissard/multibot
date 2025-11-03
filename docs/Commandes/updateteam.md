---
title: updateteam
layout: default
---

# `updateteam`

## Description

Met à jour une équipe

Exécute la commande pour mettre à jour les informations d'une équipe. Permet de changer le nom de l'équipe, le capitaine, le BattleTag et le classement (elo).

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.teamname` | `string` | - Le nom actuel de l'équipe à modifier. |
| `args.newteamname` | `string` | - Le nouveau nom pour l'équipe. |
| `args.newcap` | `string` | - L'ID du nouveau capitaine. |
| `args.newbtag` | `string` | - Le nouveau BattleTag du capitaine. |
| `args.newrank` | `number` | - Le nouveau classement (elo) de l'équipe. |

**Returns:** `Promise<string>` - message de confirmation ou d'erreur.

