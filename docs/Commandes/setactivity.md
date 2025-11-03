---
title: setactivity
layout: default
---

# `setactivity`

## Description

change le status du bot

## Narrative


- Cette commande permet de changer le message d'activité (le statut "Joue à...") du bot.
- **Sécurité :** L'exécution est strictement réservée au propriétaire du bot (\

Exécute la commande pour changer l'activité du bot.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.status` | `string` | - Le texte de l'activité à afficher. |
| `args.type` | `string` | - Le type d'activité (non implémenté actuellement). |

**Returns:** `Promise<string>` - message de confirmation.

