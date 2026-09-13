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

**Retour :** <span class="badge badge-type">Object</span> - 

Methode de lancement de la commande via un message

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">Discord.Message</span> |  |

Methode de lancement de la commande via une interaction

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `interaction` | <span class="badge badge-type">Discord.Interaction</span> |  |

Methode de lancement de la commande via l'api

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `req` | <span class="badge badge-type">*</span> |  |
| `res` | <span class="badge badge-type">*</span> |  |
| `user` | <span class="badge badge-type">Object</span> |  |

**Retour :** <span class="badge badge-type">void</span> - 

Function lancé par handleMessage, handleApiRequest et handleInteraction

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `args` | <span class="badge badge-type">Object</span> | Argument de la méthode au format objet {name:value} |

Définit les elements pour communiquer avec l'utilisateur

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `guild` | <span class="badge badge-type">Discord.Guild</span> |  |
| `channel` | <span class="badge badge-type">Discord.Channel</span> |  |
| `user` | <span class="badge badge-type">Discord.User</span> |  |
| `member` | <span class="badge badge-type">Discord.GuildMember</span> |  |

Verification des permissions pour l'usage de la commande

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `member` | <span class="badge badge-type">Discord.GuildMember</span> |  |
| `guild` | <span class="badge badge-type">Discord.Guild</span> |  |

**Retour :** <span class="badge badge-type">void</span> - 

Enregistre les données de log TODO adapter pour une provenance depuis l'api

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">Discord.Message</span> |  |

**Retour :** <span class="badge badge-type">void</span> - 

Fonction de retour à l'utilisateur ayant instancié la commande

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `data` | <span class="badge badge-type">String</span> | Donnée a envoyer a l'utilisateur |

**Retour :** <span class="badge badge-type">Discord.Message</span> - la promesse d'un message discord

Affiche un message se mettant a jour en fonction de l'avancée de la commande

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `liste` | <span class="badge badge-type">Array</span> |  |
| `mapFunction` | <span class="badge badge-type">function</span> | Fonction a utiliser sur chaque entrée du Array fournit |
| `errorFunc` | <span class="badge badge-type">function</span> | Fonction a utiliser sur les erreurs |

Envoie un feedback à l'utilisateur (Discord ou Web)

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `data` | <span class="badge badge-type">string|object</span> | - Le contenu du feedback |

receptionne les erreurs issue de la commande

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `error` | <span class="badge badge-type">Error</span> |  |
| `noSend` | <span class="badge badge-type">boolean</span> | Envoie ou pas l'erreur a l'utilisateur |

Demande confirmation par une emote, de continuer la commande TODO ! Possibilité d'uiliser le systeme de bouton discord

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">Discord.Message</span> |  |
| `texte` | <span class="badge badge-type">String</span> |  |

Protocole de test de la commande afin de s'assurer de son bon fonctionnement

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `botID` | <span class="badge badge-type">String</span> |  |
| `userID` | <span class="badge badge-type">String</span> |  |
| `channelID` | <span class="badge badge-type">String</span> |  |

**Retour :** <span class="badge badge-type">void</span> - 

Creates a SlashCommandBuilder instance for this command.

**Retour :** <span class="badge badge-type">SlashCommandBuilder</span> - 

Permet l'integration d'une commande au format interaction (aide a l'utilisateur , definition, arguments, préremplissage et...)

**Retour :** <span class="badge badge-type">Discord.SlashCommandBuilder</span> - 

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

Ajout les données d'une option

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `option` | <span class="badge badge-type">*</span> |  |
| `optionData` | <span class="badge badge-type">*</span> |  |

**Retour :** <span class="badge badge-type">void</span> - 

Permet l'enregistrement d'une commande slash (création ou mise à jour). Cette méthode vérifie si la commande existe déjà. Si c'est le cas, elle la met à jour. Sinon, elle la crée.

**Retour :** <span class="badge badge-type">Promise<Discord.ApplicationCommand></span> - commande créée ou mise à jour.

