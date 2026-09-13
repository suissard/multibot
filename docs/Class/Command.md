---
title: Command
layout: default
---

# `Command`

#### Propriété `bot`

<span class="badge badge-type">Bot</span> Instance du bot Discord qui initie la commande.

#### Propriété `guild`

<span class="badge badge-type">Discord.Guild</span> Serveur (guild) où la commande est exécutée. Défini lors de l'exécution, peut être `undefined` si la commande est utilisée en message privé.

#### Propriété `channel`

<span class="badge badge-type">Discord.TextChannel</span> Canal où la commande est exécutée. Défini lors de l'exécution, contient le canal texte de la commande.

#### Propriété `user`

<span class="badge badge-type">Discord.User</span> Utilisateur discord qui a exécuté la commande. Défini lors de l'exécution, contient les informations de l'utilisateur émetteur.

#### Propriété `member`

<span class="badge badge-type">Discord.GuildMember</span> Utilisateur au format GuildMember, en fonction du serveur ayant exécuté la commande. Défini si la commande est utilisée dans un serveur, peut être `undefined` en message privé.

#### Propriété `isAtest`

<span class="badge badge-type">boolean</span> Indique si la commande est en phase de test. Utilisé pour activer certaines conditions spécifiques de test.

#### Propriété `id`

<span class="badge badge-type">string</span> Identifiant unique de la commande.

#### Propriété `devBoss`

<span class="badge badge-type">boolean</span> Indique si la commande est réservée à l'administrateur principal (devBoss).

#### Propriété `home`

<span class="badge badge-type">string</span> Identifiant du serveur de base (home) pour la commande. Utilisé pour limiter l'exécution de la commande à un serveur spécifique.

#### Propriété `userPermissions`

<span class="badge badge-type">Array<String></span> Permissions nécessaires pour que l'utilisateur puisse exécuter la commande. Tableau des permissions Discord requises.

#### Propriété `botPermissions`

<span class="badge badge-type">Array<String></span> Permissions nécessaires pour que le bot puisse exécuter la commande. Tableau des permissions Discord requises.

#### Propriété `description`

<span class="badge badge-type">String</span> Description de la commande, utilisée pour afficher des informations aux utilisateurs.

#### Propriété `help`

<span class="badge badge-type">Boolean</span> ! Variable deprécié avec l'instauration des interactions Est ce qeu la commande apparait dans la commande help. Contient des instructions ou des conseils.

#### Propriété `howTo`

<span class="badge badge-type">string</span> Instructions sur la façon d'utiliser la commande. Donne des exemples d'utilisation ou des arguments acceptés.

#### Propriété `test`

<span class="badge badge-type">Array<Object></span> Quel element pour tester cette commande via la fonction "testProcess"

#### Propriété `arguments`

<span class="badge badge-type">Array<Object></span> Liste des arguments pour exécuter la commande.

#### Propriété `category`

<span class="badge badge-type">string</span> Categorie de la commande

### Méthode `static databasify()`

Renvoie un object compactible avec la base de donnée strapi

**Retour :** <span class="badge badge-type">Object</span> - 

### Méthode `handleMessage(message)`

Methode de lancement de la commande via un message

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">Discord.Message</span> |  |

### Méthode `handleInteraction(interaction)`

Methode de lancement de la commande via une interaction

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `interaction` | <span class="badge badge-type">Discord.Interaction</span> |  |

### Méthode `handleApiRequest(req, res, user, app)`

Methode de lancement de la commande via l'api

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `req` | <span class="badge badge-type">*</span> |  |
| `res` | <span class="badge badge-type">*</span> |  |
| `user` | <span class="badge badge-type">Object</span> |  |

**Retour :** <span class="badge badge-type">void</span> - 

### Méthode `methode(args)`

Function lancé par handleMessage, handleApiRequest et handleInteraction

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `args` | <span class="badge badge-type">Object</span> | Argument de la méthode au format objet {name:value} |

### Méthode `setCommunicationData(guild, channel, user, member, interaction = null, app = null)`

Définit les elements pour communiquer avec l'utilisateur

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `guild` | <span class="badge badge-type">Discord.Guild</span> |  |
| `channel` | <span class="badge badge-type">Discord.Channel</span> |  |
| `user` | <span class="badge badge-type">Discord.User</span> |  |
| `member` | <span class="badge badge-type">Discord.GuildMember</span> |  |

### Méthode `checkPermission(member, guild)`

Verification des permissions pour l'usage de la commande

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `member` | <span class="badge badge-type">Discord.GuildMember</span> |  |
| `guild` | <span class="badge badge-type">Discord.Guild</span> |  |

**Retour :** <span class="badge badge-type">void</span> - 

### Méthode `log(message)`

Enregistre les données de log TODO adapter pour une provenance depuis l'api

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">Discord.Message</span> |  |

**Retour :** <span class="badge badge-type">void</span> - 

### Méthode `answerToUser(data)`

Fonction de retour à l'utilisateur ayant instancié la commande

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `data` | <span class="badge badge-type">String</span> | Donnée a envoyer a l'utilisateur |

**Retour :** <span class="badge badge-type">Discord.Message</span> - la promesse d'un message discord

### Méthode `loading(liste, mapFunction, errorFunc = console.error)`

Affiche un message se mettant a jour en fonction de l'avancée de la commande

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `liste` | <span class="badge badge-type">Array</span> |  |
| `mapFunction` | <span class="badge badge-type">function</span> | Fonction a utiliser sur chaque entrée du Array fournit |
| `errorFunc` | <span class="badge badge-type">function</span> | Fonction a utiliser sur les erreurs |

### Méthode `sendFeedback(data)`

Envoie un feedback à l'utilisateur (Discord ou Web)

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `data` | <span class="badge badge-type">string|object</span> | - Le contenu du feedback |

### Méthode `handleError(error, noSend = false)`

receptionne les erreurs issue de la commande

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `error` | <span class="badge badge-type">Error</span> |  |
| `noSend` | <span class="badge badge-type">boolean</span> | Envoie ou pas l'erreur a l'utilisateur |

### Méthode `askConfirm(texte = '')`

Demande confirmation par une emote, de continuer la commande TODO ! Possibilité d'uiliser le systeme de bouton discord

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">Discord.Message</span> |  |
| `texte` | <span class="badge badge-type">String</span> |  |

### Méthode `testProcess(botID, userID, channelID)`

Protocole de test de la commande afin de s'assurer de son bon fonctionnement

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `botID` | <span class="badge badge-type">String</span> |  |
| `userID` | <span class="badge badge-type">String</span> |  |
| `channelID` | <span class="badge badge-type">String</span> |  |

**Retour :** <span class="badge badge-type">void</span> - 

### Méthode `getSlashCommandBuilder()`

Creates a SlashCommandBuilder instance for this command.

**Retour :** <span class="badge badge-type">SlashCommandBuilder</span> - 

### Méthode `createSlashCommand()`

Permet l'integration d'une commande au format interaction (aide a l'utilisateur , definition, arguments, préremplissage et...)

**Retour :** <span class="badge badge-type">Discord.SlashCommandBuilder</span> - 

### Méthode `setOption(slashCommand, optionData)`

Enrichi une slash command avec les options de la commande

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `slashCommand` | <span class="badge badge-type">SlashCommandBuilder</span> |  |
| `option` | <span class="badge badge-type">Object</span> |  |
| `option.type:` | <span class="badge badge-type">String</span> | SUB_COMMAND, SUB_COMMAND_GROUP, STRING, INTEGER, NUMBER, BOOLEAN, USER, CHANNEL, ROLE, MENTIONABLE |
| `option.name:` | <span class="badge badge-type">String</span> | Nom de l'option |
| `option.description:` | <span class="badge badge-type">String</span> | Description de l'option |
| `option.required:` | <span class="badge badge-type">Boolean</span> | Si l'option est requise ou non |
| `option.choices:` | <span class="badge badge-type">Array</span> | Choix possible pour l'option => {name: "", value: ""} |
| `option.autocomplete:` | <span class="badge badge-type">Boolean</span> | Si l'option peut être complétée automatiquement |
| `option.channelTypes:` | <span class="badge badge-type">Array</span> | Types de channel autorisés pour l'option * GUILD_TEXT - a guild text channel * DM - a DM channel * GUILD_VOICE - a guild voice channel * GROUP_DM - a group DM channel * GUILD_CATEGORY - a guild category channel * GUILD_NEWS - a guild news channel * GUILD_STORE - a guild store channel * Store channels are deprecated and will be removed from Discord in March 2022. See Self-serve Game Selling Deprecation  for more information. * GUILD_NEWS_THREAD - a guild news channel's public thread channel * GUILD_PUBLIC_THREAD - a guild text channel's public thread channel * GUILD_PRIVATE_THREAD - a guild text channel's private thread channel * GUILD_STAGE_VOICE - a guild stage voice channel * UNKNOWN - a generic channel of unknown type, could be Channel or GuildChannel |
| `option.minValue:` | <span class="badge badge-type">Number</span> | Valeur minimum autorisée pour l'option |
| `option.maxValue:` | <span class="badge badge-type">Number</span> | Valeur maximum autorisée pour l'option |

### Méthode `setOptionData(option, optionData)`

Ajout les données d'une option

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `option` | <span class="badge badge-type">*</span> |  |
| `optionData` | <span class="badge badge-type">*</span> |  |

**Retour :** <span class="badge badge-type">void</span> - 

### Méthode `editSlashCommand()`

Permet l'enregistrement d'une commande slash (création ou mise à jour). Cette méthode vérifie si la commande existe déjà. Si c'est le cas, elle la met à jour. Sinon, elle la crée.

**Retour :** <span class="badge badge-type">Promise<Discord.ApplicationCommand></span> - commande créée ou mise à jour.

