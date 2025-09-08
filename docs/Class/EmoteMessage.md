---
title: EmoteMessage
layout: default
---

# `EmoteMessage`

Représente un message sur Discord qui attribue des rôles en fonction des réactions des utilisateurs. Étend StrapiObject pour interagir avec une base de données Strapi.



**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `id` | `string|number` | - L'ID de l'objet Strapi. |
| `type` | `string` | - Le type de l'objet Strapi. |
| `data` | `object` | - Les données de l'objet. |
| `collection` | `import('suissard-strapi-client').StrapiCollection` | - La collection Strapi à laquelle cet objet appartient. |
| `bots` | `import('./BotManager')` | - Le gestionnaire de bots pour accéder aux instances de bot. |

Initialise le message à réaction. Vérifie que le bot a accès au serveur, au salon et au message, et que les rôles sont accessibles. Ajoute les réactions initiales au message.

**Returns:** `Promise<boolean>` - si l'initialisation réussit, sinon `false`.

Vérifie que les rôles configurés pour les réactions sont accessibles par le bot sur le serveur.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `bot` | `import('./Bot')` | - L'instance du bot qui gère ce message. |
| `message` | `Discord.Message` | - Le message Discord concerné. |

Reagit avec toutes les emotes sur le message fournit

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `message` | `Discord.Message` |  |

Vérifie si un message donné correspond à ce message à réaction (même salon et même serveur).

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `message` | `Discord.Message` | - Le message à vérifier. |

**Returns:** `this|false` - de EmoteMessage si elle correspond, sinon `false`.

Gère l'ajout d'une réaction sur le message. Attribue le rôle correspondant à l'utilisateur si configuré.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `reaction` | `Discord.MessageReaction` | - La réaction ajoutée. |
| `user` | `Discord.User` | - L'utilisateur qui a réagi. |

**Returns:** `Promise<boolean>` - si le rôle a été géré, `false` sinon.

Gère la suppression d'une réaction sur le message. Retire le rôle correspondant à l'utilisateur si configuré.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `reaction` | `Discord.MessageReaction` | - La réaction retirée. |
| `user` | `Discord.User` | - L'utilisateur dont la réaction a été retirée. |

**Returns:** `Promise<boolean>` - si le rôle a été géré, `false` sinon.

Décode les URI des clés et des valeurs d'un objet provenant de la base de données. Utile pour les données qui ont été encodées pour le stockage.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `value` | `object` | - L'objet à décoder. |

**Returns:** `object` - avec les clés et valeurs décodées.

Encode les URI des clés et des valeurs d'un objet pour le stockage en base de données.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `value` | `object` | - L'objet à encoder. |

**Returns:** `object` - avec les clés et valeurs encodées.

