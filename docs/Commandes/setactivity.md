---
title: setactivity
layout: default
---

# `setactivity`

## Description

change le status du bot

Exécute la commande pour changer l'activité du bot.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.status` | `string` | - Le texte de l'activité à afficher. |
| `args.type` | `string` | - Le type d'activité (non implémenté actuellement). |

**Returns:** `Promise<string>` - message de confirmation.

