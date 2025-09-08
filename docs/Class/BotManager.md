---
title: BotManager
layout: default
---

# `BotManager`

Configure les gestionnaires de commandes, événements, et messages d'émote.

Émetteur d'événements pour gérer les événements globaux du BotManager.

Gestionnaire de commandes pour l'ensemble des bots, gère les commandes et leur exécution.

Gestionnaire d'événements, initialisé avec une référence au BotManager. Configure les événements pour chaque bot.

Gestionnaire des messages d'émotes, permettant de configurer les réponses d'émote pour chaque bot. Initialisé avec une référence au BotManager.

Initialise et démarre tous les bots. Cette fonction crée toutes les instances de bot, configure les commandes et les événements, puis charge les modules associés à chaque bot.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `botsData` | `Map<string, object>` | - Une map contenant les données de configuration de chaque bot. |

Détermine le bot "maître" pour une ressource Discord donnée, en priorité celui dont le "home" correspond au serveur.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `guildId` | `string` | - L'ID du serveur. |
| `channelId` | `string` | - L'ID du salon. |
| `messageId` | `string` | - L'ID du message. |

**Returns:** `Promise<{bot: Bot, guild?: import('discord.js').Guild, channel?: import('discord.js').TextChannel, message?: import('discord.js').Message}|undefined>` - de données d'accès du bot maître, ou undefined si aucun bot n'a accès.

Charge les modules pour tout les bots

**Returns:** `` - 

Charge un module pour un bot définit

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `bot` | `Bot` |  |
| `module` | `Object || Boolean` |  |

Crée et enregistre une nouvelle instance de bot.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `data` | `object` | - Données de configuration pour le bot. |
| `BOTS` | `BotManager` | - L'instance du gestionnaire de bots. |

**Returns:** `Bot` - du bot créé.

Crée toutes les instances de bot à partir de leurs données de configuration. Seuls les bots marqués comme "actifs" sont créés.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `botsData` | `Map<string, object>` | - Une map contenant les données de configuration de chaque bot. |

Arrete le bot indiqué par l'identifiant

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `id` | `String` | Identifiant de bot |

Redemarre le bot indiqué par l'identifiant

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `id` | `String` | Identifiant de bot |

Permettre l'usage a l'intégralité des bots, d'un evenement ou d'une commande

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `data` | `Command || Event` | une class heritant des commands ou des events |
| `bot` | `Bot` | instance de bot auquel rattaché l'evenement (si undefined, tout les bots ) |

Vérifie quels bots ont accès à une ressource Discord spécifique.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `guildId` | `string` | - L'ID du serveur. |
| `channelId` | `string` | - L'ID du salon. |
| `messageId` | `string` | - L'ID du message. |

**Returns:** `Promise<Array<{bot: Bot, guild?: import('discord.js').Guild, channel?: import('discord.js').TextChannel, message?: import('discord.js').Message}>>` - tableau d'objets contenant le bot et les ressources accessibles.

Lance l'api du gestionnaire de bot

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `configs` | `configs` |  |
| `discord` | `configs` |  |
| `saltRounds` | `Number` |  |

Met la référence et le contenu au bon format

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `content` | `String || Error` |  |
| `reference` | `String` |  |

**Returns:** `` - 

Diffuse un log

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `content` | `String` |  |
| `reference` | `String` |  |

Diffuse une erreur

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `content` | `String || Error` |  |
| `reference` | `String` |  |

