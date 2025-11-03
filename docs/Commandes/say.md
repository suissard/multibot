---
title: say
layout: default
---

# `say`

Fait parler le bot.

## Narrative


- Cette commande permet de faire parler le bot dans un channel.
- Elle nécessite la permission "Administrateur" (\`Administrator\`) pour être utilisée.
- La commande peut être utilisée uniquement dans le discord considéré comme home.
- Le bot se contentera d'écrire le texte dans le channel indiqué avec la piece jointe fournit


## Arguments

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| `texte` | `STRING` | Message à envoyer | Yes |
| `channel` | `CHANNEL` | Channel où envoyer le message | No |
| `piecejointe` | `ATTACHMENT` | Pièce jointe à envoyer | No |

Exécute la commande pour faire parler le bot.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.texte` | `string` | - Le contenu du message à envoyer. |
| `args.channel` | `string` | - L'ID du channel où envoyer le message. |
| `args.piecejointe` | `string` | - L'URL de la pièce jointe à envoyer. |

**Returns:** `Promise<string>` - message de confirmation ou d'erreur.

