---
title: CommandManager
layout: default
---

# `CommandManager`

Gère l'enregistrement et l'accès aux commandes du bot.

Ajoute une nouvelle commande à la collection. Ne fait rien si une commande avec le même ID existe déjà.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `id` | `string` | - L'identifiant unique de la commande. |
| `value` | `Command` | - La classe de la commande à ajouter. |

Met à jour une commande existante dans la collection.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `id` | `string` | - L'identifiant de la commande à mettre à jour. |
| `value` | `Command` | - La nouvelle classe de la commande. |

Récupère une commande par son ID.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `id` | `string` | - L'identifiant de la commande. |

**Returns:** `Command` - classe de la commande correspondante.

Récupère toutes les commandes enregistrées.

**Returns:** `Map<string, Command>` - map de toutes les commandes.

Vérifie si une commande avec l'ID spécifié existe.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `id` | `string` | - L'identifiant de la commande à vérifier. |

**Returns:** `boolean` - si la commande existe, sinon `false`.

Charger la commande

Charge toutes les commandes des bots

Réagit a un commande initié depuis une interaction

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `bot` | `*` |  |
| `interaction` | `*` |  |

Réagit a une commande initié depuis un call api

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `bot` | `Bot` |  |
| `req` | `Request` |  |
| `res` | `` |  |
| `user` | `Discord.User` |  |

DEPRECATED Réagit a une command initié depuiçs un message

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `bot` | `*` |  |
| `message` | `*` |  |

