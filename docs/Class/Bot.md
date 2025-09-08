---
title: Bot
layout: default
---

# `Bot`

Initialise un nouveau bot avec les données spécifiées. Gère les options de connexion, les intentions d'accès, et divers paramètres de configuration du bot.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `data` | `StrapiObject` | - Objet contenant les informations nécessaires pour configurer le bot. |
| `data.getID` | `Function` | - Fonction pour obtenir un identifiant unique pour le bot. |
| `data.name` | `string` | - Nom du bot, obligatoire. |
| `data.ownerId` | `string` | - ID de l'utilisateur propriétaire du bot, obligatoire. |
| `data.home` | `string` | - Identifiant du serveur Discord considéré comme la "maison" du bot, obligatoire. |
| `data.devMode` | `boolean` | - Indicateur du mode développement, obligatoire. |
| `data.prefix` | `string` | - Préfixe des commandes du bot, par défaut "!!". |
| `data.admin` | `Array<string>` | - Liste des IDs d'administrateurs autorisés, ajoute automatiquement le propriétaire. |
| `data.activity` | `string` | - Activité par défaut du bot affichée aux utilisateurs. |
| `data.modules` | `Object` | - Modules supplémentaires du bot. |
| `data.unauthorizedEvents` | `Array<string>` | - Liste d'événements non autorisés par le bot. |
| `data.unauthorizedCommands` | `Array<string>` | - Liste de commandes non autorisées par le bot. |
| `data.commandInDev` | `Array<string>` | - Liste des commandes en cours de développement. |
| `data.token` | `string` | - Jeton d'authentification du bot pour se connecter à l'API Discord. |
| `BOTS` | `BotManager` | - gestionnaire de bots. |



Identifiant unique du bot

Nom usuel du bot

ID du propriétaire du bot

Serveur principal ("maison") du bot

Indicateur du mode développement

Préfixe des commandes, par défaut "!!"

Liste des administrateurs du bot, inclut le propriétaire

Activité affichée du bot, vide par défaut

Modules additionnels du bot

Liste d'événements non autorisés

Liste des commandes non autorisées

Liste des commandes en cours de développement

Connexion du bot à l'API Discord avec le token fourni

Redémarrrer le bot

Vérifie l'accès à des éléments Discord (serveur, salon, message) et les retourne si trouvés. Au moins un `guildId` ou `channelId` doit être fourni.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `guildId` | `string` | - L'ID du serveur Discord à vérifier. |
| `channelId` | `string` | - L'ID du salon Discord à vérifier. |
| `messageId` | `string` | - L'ID du message Discord à vérifier. |

**Returns:** `Promise<false|{guild?: import('discord.js').Guild, channel?: import('discord.js').TextChannel, message?: import('discord.js').Message}>` - objet contenant les éléments trouvés, ou `false` si un élément requis n'est pas accessible.

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

