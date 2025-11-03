---
title: SharePromoCommand
layout: default
---

# `SharePromoCommand`

## Description

Partager un message format embed sur ce salon partagé

## Narrative


- Cette commande permet d'envoyer un message promotionnel (un "embed") à tous les salons faisant partie du même groupe de partage que le salon actuel.
- Elle nécessite la permission "Administrateur" (\

Commande de gestion des shareChannel

Exécute la commande pour envoyer un message promotionnel à un groupe de partage. Le message est envoyé sous forme d'embed et peut contenir une image.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.texte` | `string` | - Le texte du message promotionnel. |
| `args.imageurl` | `string` | - L'URL d'une image à inclure dans l'embed. |

**Returns:** `Promise<string>` - message de confirmation ou d'erreur.

