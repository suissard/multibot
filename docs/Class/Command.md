---
title: Command
layout: default
---

# `Command`



Instance du bot Discord qui initie la commande.

Serveur (guild) où la commande est exécutée. Défini lors de l'exécution, peut être `undefined` si la commande est utilisée en message privé.

Canal où la commande est exécutée. Défini lors de l'exécution, contient le canal texte de la commande.

Utilisateur discord qui a exécuté la commande. Défini lors de l'exécution, contient les informations de l'utilisateur émetteur.

Utilisateur au format GuildMember, en fonction du serveur ayant exécuté la commande. Défini si la commande est utilisée dans un serveur, peut être `undefined` en message privé.

Indique si la commande est en phase de test. Utilisé pour activer certaines conditions spécifiques de test.

Identifiant unique de la commande.

Indique si la commande est réservée à l'administrateur principal (devBoss).

Identifiant du serveur de base (home) pour la commande. Utilisé pour limiter l'exécution de la commande à un serveur spécifique.

Permissions nécessaires pour que l'utilisateur puisse exécuter la commande. Tableau des permissions Discord requises.

Permissions nécessaires pour que le bot puisse exécuter la commande. Tableau des permissions Discord requises.

Description de la commande, utilisée pour afficher des informations aux utilisateurs.

! Variable deprécié avec l'instauration des interactions Est ce qeu la commande apparait dans la commande help. Contient des instructions ou des conseils.

Instructions sur la façon d'utiliser la commande. Donne des exemples d'utilisation ou des arguments acceptés.

Quel element pour tester cette commande via la fonction "testProcess"

Liste des arguments pour exécuter la commande.

Categorie de la commande

Renvoie un object compactible avec la base de donnée strapi

**Returns:** `Object` - 

Methode de lancement de la commande via un message

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `message` | `Discord.Message` |  |

Methode de lancement de la commande via une interaction

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `interaction` | `Discord.Interaction` |  |

Methode de lancement de la commande via l'api

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `req` | `*` |  |
| `res` | `*` |  |
| `user` | `Object` |  |

**Returns:** `` - 

Function lancé par handleMessage, handleApiRequest et handleInteraction

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `Object` | Argument de la méthode au format objet {name:value} |

Définit les elements pour communiquer avec l'utilisateur

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `guild` | `Discord.Guild` |  |
| `channel` | `Discord.Channel` |  |
| `user` | `Discord.User` |  |
| `member` | `Discord.GuildMember` |  |

Verification des permissions pour l'usage de la commande

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `member` | `Discord.GuildMember` |  |
| `guild` | `Discord.Guild` |  |

**Returns:** `` - 

Enregistre les données de log TODO adapter pour une provenance depuis l'api

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `message` | `Discord.Message` |  |

**Returns:** `` - 

Fonction de retour à l'utilisateur ayant instancié la commande

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `data` | `String` | Donnée a envoyer a l'utilisateur |

**Returns:** `Discord.Message` - la promesse d'un message discord

Affiche un message se mettant a jour en fonction de l'avancée de la commande

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `liste` | `Array` |  |
| `mapFunction` | `function` | Fonction a utiliser sur chaque entrée du Array fournit |
| `errorFunc` | `function` | Fonction a utiliser sur les erreurs |

Envoie un feedback à l'utilisateur (Discord ou Web)

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `data` | `string|object` | - Le contenu du feedback |

receptionne les erreurs issue de la commande

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `error` | `Error` |  |
| `noSend` | `boolean` | Envoie ou pas l'erreur a l'utilisateur |

Demande confirmation par une emote, de continuer la commande TODO ! Possibilité d'uiliser le systeme de bouton discord

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `message` | `Discord.Message` |  |
| `texte` | `String` |  |

Protocole de test de la commande afin de s'assurer de son bon fonctionnement

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `botID` | `String` |  |
| `userID` | `String` |  |
| `channelID` | `String` |  |

**Returns:** `` - 

Creates a SlashCommandBuilder instance for this command.

**Returns:** `SlashCommandBuilder` - 

Permet l'integration d'une commande au format interaction (aide a l'utilisateur , definition, arguments, préremplissage et...)

**Returns:** `Discord.SlashCommandBuilder` - 

Enrichi une slash command avec les options de la commande

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `slashCommand` | `SlashCommandBuilder` |  |
| `option` | `Object` |  |
| `option.type:` | `String` | SUB_COMMAND, SUB_COMMAND_GROUP, STRING, INTEGER, NUMBER, BOOLEAN, USER, CHANNEL, ROLE, MENTIONABLE |
| `option.name:` | `String` | Nom de l'option |
| `option.description:` | `String` | Description de l'option |
| `option.required:` | `Boolean` | Si l'option est requise ou non |
| `option.choices:` | `Array` | Choix possible pour l'option => {name: "", value: ""} |
| `option.autocomplete:` | `Boolean` | Si l'option peut être complétée automatiquement |
| `option.channelTypes:` | `Array` | Types de channel autorisés pour l'option * GUILD_TEXT - a guild text channel * DM - a DM channel * GUILD_VOICE - a guild voice channel * GROUP_DM - a group DM channel * GUILD_CATEGORY - a guild category channel * GUILD_NEWS - a guild news channel * GUILD_STORE - a guild store channel * Store channels are deprecated and will be removed from Discord in March 2022. See Self-serve Game Selling Deprecation  for more information. * GUILD_NEWS_THREAD - a guild news channel's public thread channel * GUILD_PUBLIC_THREAD - a guild text channel's public thread channel * GUILD_PRIVATE_THREAD - a guild text channel's private thread channel * GUILD_STAGE_VOICE - a guild stage voice channel * UNKNOWN - a generic channel of unknown type, could be Channel or GuildChannel |
| `option.minValue:` | `Number` | Valeur minimum autorisée pour l'option |
| `option.maxValue:` | `Number` | Valeur maximum autorisée pour l'option |

Ajout les données d'une option

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `option` | `*` |  |
| `optionData` | `*` |  |

**Returns:** `` - 

Permet l'enregistrement d'une commande slash (création ou mise à jour). Cette méthode vérifie si la commande existe déjà. Si c'est le cas, elle la met à jour. Sinon, elle la crée.

**Returns:** `Promise<Discord.ApplicationCommand>` - commande créée ou mise à jour.

