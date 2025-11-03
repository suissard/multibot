---
title: secretaryCommandMessage
layout: default
---

# `secretaryCommandMessage`

## Description

Répond au message du secretary

Exécute la commande pour répondre à un utilisateur via un salon de secrétariat. Extrait l'ID de l'utilisateur depuis le nom du salon, puis envoie la réponse à la fois en message privé à l'utilisateur et dans le salon actuel.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.interaction` | `import('discord.js').CommandInteraction` | - L'objet d'interaction original, pour récupérer les pièces jointes. |
| `args.texte` | `string` | - Le texte de la réponse. |

**Returns:** `Promise<string>` - message de confirmation ou d'erreur.

