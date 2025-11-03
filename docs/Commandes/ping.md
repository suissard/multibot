---
title: ping
layout: default
---

# `ping`

## Description

Répond pong

## Narrative


- La commande répond simplement "Pong".
- Si un argument 'user' est fourni, elle mentionne l'utilisateur.
- Si un argument 'texte' est fourni, elle ajoute le texte à la réponse.


Exécute la commande ping. Répond "Pong" et peut inclure un texte ou mentionner un utilisateur si fourni en argument.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.user` | `string` | - L'ID de l'utilisateur à mentionner. |
| `args.texte` | `string` | - Le texte à inclure dans la réponse. |

**Returns:** `string` - réponse de la commande.

