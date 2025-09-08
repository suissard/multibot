---
title: SharePromoCommand
layout: default
---

# `SharePromoCommand`

Commande de gestion des shareChannel

Exécute la commande pour envoyer un message promotionnel à un groupe de partage. Le message est envoyé sous forme d'embed et peut contenir une image.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.texte` | `string` | - Le texte du message promotionnel. |
| `args.imageurl` | `string` | - L'URL d'une image à inclure dans l'embed. |

**Returns:** `Promise<string>` - message de confirmation ou d'erreur.

