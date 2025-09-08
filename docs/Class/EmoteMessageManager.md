---
title: EmoteMessageManager
layout: default
---

# `EmoteMessageManager`

Gère les messages à réaction pour l'ensemble des bots.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `bots` | `import('./BotManager')` | - Le gestionnaire de bots. |

Gère un événement d'ajout de réaction pour tous les messages à réaction.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `reaction` | `import('discord.js').MessageReaction` | - La réaction ajoutée. |
| `user` | `import('discord.js').User` | - L'utilisateur qui a réagi. |

Gère un événement de suppression de réaction pour tous les messages à réaction.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `reaction` | `import('discord.js').MessageReaction` | - La réaction retirée. |
| `user` | `import('discord.js').User` | - L'utilisateur dont la réaction a été retirée. |

Charge et initialise tous les messages à réaction depuis la base de données.

Initialise un message à réaction spécifique et l'ajoute au gestionnaire.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `emoteMessage` | `EmoteMessage` | - L'objet EmoteMessage brut de la base de données. |

Crée un nouveau message à réaction dans la base de données et l'initialise.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `body` | `object` | - Les données pour la création du message à réaction. |

Ajoute un message à réaction au gestionnaire.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `id` | `string` | - L'identifiant unique du message (`channelId-messageId`). |
| `value` | `EmoteMessage` | - L'instance de EmoteMessage à ajouter. |

Met à jour un message à réaction existant.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `id` | `string` | - L'identifiant du message à mettre à jour. |
| `value` | `object` | - Les nouvelles données pour le message. |

Récupère un message à réaction par son ID.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `id` | `string` | - L'identifiant du message (`channelId-messageId`). |

**Returns:** `EmoteMessage` - de EmoteMessage.

Récupère tous les messages à réaction gérés.

**Returns:** `Map<string, EmoteMessage>` - map de tous les messages à réaction.

