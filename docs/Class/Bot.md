---
title: Bot
layout: default
---

# `Bot`

Initialise un nouveau bot avec les données spécifiées. Gère les options de connexion, les intentions d'accès, et divers paramètres de configuration du bot.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `data` | <span class="badge badge-type">StrapiObject</span> | - Objet contenant les informations nécessaires pour configurer le bot. |
| `data.getID` | <span class="badge badge-type">Function</span> | - Fonction pour obtenir un identifiant unique pour le bot. |
| `data.name` | <span class="badge badge-type">string</span> | - Nom du bot, obligatoire. |
| `data.ownerId` | <span class="badge badge-type">string</span> | - ID de l'utilisateur propriétaire du bot, obligatoire. |
| `data.home` | <span class="badge badge-type">string</span> | - Identifiant du serveur Discord considéré comme la "maison" du bot, obligatoire. |
| `data.devMode` | <span class="badge badge-type">boolean</span> | - Indicateur du mode développement, obligatoire. |
| `data.prefix` | <span class="badge badge-type">string</span> | - Préfixe des commandes du bot, par défaut "!!". |
| `data.admin` | <span class="badge badge-type">Array<string></span> | - Liste des IDs d'administrateurs autorisés, ajoute automatiquement le propriétaire. |
| `data.activity` | <span class="badge badge-type">string</span> | - Activité par défaut du bot affichée aux utilisateurs. |
| `data.modules` | <span class="badge badge-type">Object</span> | - Modules supplémentaires du bot. |
| `data.unauthorizedEvents` | <span class="badge badge-type">Array<string></span> | - Liste d'événements non autorisés par le bot. |
| `data.unauthorizedCommands` | <span class="badge badge-type">Array<string></span> | - Liste de commandes non autorisées par le bot. |
| `data.commandInDev` | <span class="badge badge-type">Array<string></span> | - Liste des commandes en cours de développement. |
| `data.token` | <span class="badge badge-type">string</span> | - Jeton d'authentification du bot pour se connecter à l'API Discord. |
| `BOTS` | <span class="badge badge-type">BotManager</span> | - gestionnaire de bots. |

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

Couleur de log du bot

Connexion du bot à l'API Discord avec le token fourni

Redémarrrer le bot

Vérifie l'accès à des éléments Discord (serveur, salon, message) et les retourne si trouvés. Au moins un `guildId` ou `channelId` doit être fourni.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `guildId` | <span class="badge badge-type">string</span> | - L'ID du serveur Discord à vérifier. |
| `channelId` | <span class="badge badge-type">string</span> | - L'ID du salon Discord à vérifier. |
| `messageId` | <span class="badge badge-type">string</span> | - L'ID du message Discord à vérifier. |

**Retour :** <span class="badge badge-type">Promise<false|{guild?: import('discord.js').Guild, channel?: import('discord.js').TextChannel, message?: import('discord.js').Message}></span> - objet contenant les éléments trouvés, ou `false` si un élément requis n'est pas accessible.

Génère une couleur ANSI basée sur le nom du bot

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `name` | <span class="badge badge-type">string</span> |  |

**Retour :** <span class="badge badge-type">string</span> - couleur ANSI

Diffuse un log

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `content` | <span class="badge badge-type">String</span> |  |
| `reference` | <span class="badge badge-type">String</span> |  |

Diffuse un log

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `content` | <span class="badge badge-type">string</span> |  |
| `reference` | <span class="badge badge-type">string</span> |  |

Diffuse une erreur

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `content` | <span class="badge badge-type">String || Error</span> |  |
| `reference` | <span class="badge badge-type">String</span> |  |

