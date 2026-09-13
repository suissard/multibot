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

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `botsData` | <span class="badge badge-type">Map<string, object></span> | - Une map contenant les données de configuration de chaque bot. |

Détermine le bot "maître" pour une ressource Discord donnée, en priorité celui dont le "home" correspond au serveur.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `guildId` | <span class="badge badge-type">string</span> | - L'ID du serveur. |
| `channelId` | <span class="badge badge-type">string</span> | - L'ID du salon. |
| `messageId` | <span class="badge badge-type">string</span> | - L'ID du message. |

**Retour :** <span class="badge badge-type">Promise<{bot: Bot, guild?: import('discord.js').Guild, channel?: import('discord.js').TextChannel, message?: import('discord.js').Message}|undefined></span> - de données d'accès du bot maître, ou undefined si aucun bot n'a accès.

Charge les modules pour tout les bots

**Retour :** <span class="badge badge-type">void</span> - 

Charge un module pour un bot définit

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `bot` | <span class="badge badge-type">Bot</span> |  |
| `module` | <span class="badge badge-type">Object || Boolean</span> |  |

Crée et enregistre une nouvelle instance de bot.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `data` | <span class="badge badge-type">object</span> | - Données de configuration pour le bot. |
| `BOTS` | <span class="badge badge-type">BotManager</span> | - L'instance du gestionnaire de bots. |

**Retour :** <span class="badge badge-type">Bot</span> - du bot créé.

Crée toutes les instances de bot à partir de leurs données de configuration. Seuls les bots marqués comme "actifs" sont créés.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `botsData` | <span class="badge badge-type">Map<string, object></span> | - Une map contenant les données de configuration de chaque bot. |

Arrete le bot indiqué par l'identifiant

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `id` | <span class="badge badge-type">String</span> | Identifiant de bot |

Redemarre le bot indiqué par l'identifiant

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `id` | <span class="badge badge-type">String</span> | Identifiant de bot |

Permettre l'usage a l'intégralité des bots, d'un evenement ou d'une commande

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `data` | <span class="badge badge-type">Command || Event</span> | une class heritant des commands ou des events |
| `bot` | <span class="badge badge-type">Bot</span> | instance de bot auquel rattaché l'evenement (si undefined, tout les bots ) |

Vérifie quels bots ont accès à une ressource Discord spécifique.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `guildId` | <span class="badge badge-type">string</span> | - L'ID du serveur. |
| `channelId` | <span class="badge badge-type">string</span> | - L'ID du salon. |
| `messageId` | <span class="badge badge-type">string</span> | - L'ID du message. |

**Retour :** <span class="badge badge-type">Promise<Array<{bot: Bot, guild?: import('discord.js').Guild, channel?: import('discord.js').TextChannel, message?: import('discord.js').Message}>></span> - tableau d'objets contenant le bot et les ressources accessibles.

Démarre l'API (serveur HTTP) pour interagir avec les bots. Instancie la classe SelfApi avec les configurations fournies.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `configs` | <span class="badge badge-type">Object</span> | - Configuration globale de l'API (port, host, etc.). |
| `discord` | <span class="badge badge-type">Object</span> | - Configuration Discord (clientId, clientSecret, etc.) pour l'OAuth2. |
| `saltRounds` | <span class="badge badge-type">Number</span> | - Nombre de rounds pour le hachage des tokens (bcrypt). |

Met la référence et le contenu au bon format

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `content` | <span class="badge badge-type">String || Error</span> |  |
| `reference` | <span class="badge badge-type">String</span> |  |
| `isError` | <span class="badge badge-type">Boolean</span> |  |

**Retour :** <span class="badge badge-type">void</span> - 

Diffuse un log

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `content` | <span class="badge badge-type">String</span> |  |
| `reference` | <span class="badge badge-type">String</span> |  |

Diffuse une erreur

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `content` | <span class="badge badge-type">String || Error</span> |  |
| `reference` | <span class="badge badge-type">String</span> |  |

Met la référence et le contenu au bon format

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `content` | <span class="badge badge-type">String || Error</span> |  |
| `reference` | <span class="badge badge-type">String</span> |  |
| `isError` | <span class="badge badge-type">Boolean</span> |  |

**Retour :** <span class="badge badge-type">void</span> - 

Diffuse un log

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `content` | <span class="badge badge-type">String</span> |  |
| `reference` | <span class="badge badge-type">String</span> |  |

Diffuse une erreur

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `content` | <span class="badge badge-type">String || Error</span> |  |
| `reference` | <span class="badge badge-type">String</span> |  |

