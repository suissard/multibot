---
title: ping
layout: default
---

# `ping`

## Description

Répond pong

Exécute la commande ping. Répond "Pong" et peut inclure un texte ou mentionner un utilisateur si fourni en argument.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.user` | `string` | - L'ID de l'utilisateur à mentionner. |
| `args.texte` | `string` | - Le texte à inclure dans la réponse. |

**Returns:** `string` - réponse de la commande.

