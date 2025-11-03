---
title: say
layout: default
---

# `say`

Exécute la commande pour faire parler le bot.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.texte` | `string` | - Le contenu du message à envoyer. |
| `args.channel` | `string` | - L'ID du channel où envoyer le message. |
| `args.piecejointe` | `string` | - L'URL de la pièce jointe à envoyer. |

**Returns:** `Promise<string>` - message de confirmation ou d'erreur.

