---
title: WebHook
layout: default
---

# `WebHook`

Crée une nouvelle instance de WebHook.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `postURL` | `string` | - L'URL du webhook Discord. |

Récupère les informations sur le webhook.

**Returns:** `Promise<object>` - objet contenant les informations du webhook.

Envoie des données brutes au webhook.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `data` | `object` | - Le payload à envoyer au webhook. |

**Returns:** `Promise<Response>` - réponse de l'API Discord.

Envoie un message simple au webhook.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `content` | `string` | - Le contenu du message à envoyer. |

**Returns:** `Promise<Response>` - réponse de l'API Discord.

Envoie un message "embed" simple au webhook.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `title` | `string` | - Le titre de l'embed. |
| `description` | `string` | - La description de l'embed. |

**Returns:** `Promise<Response>` - réponse de l'API Discord.

