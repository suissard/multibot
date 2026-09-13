---
title: AutoroleConfigClass
layout: default
---

# `AutoroleConfigClass`

> **Classe :** `Auth`

## Classe : `Auth`

Represents an authentication object.

#### Propriété `token`

<span class="badge badge-type">string</span> The authentication token.

#### Propriété `validity`

<span class="badge badge-type">number</span> The validity period of the token.

### Constructeur `new Auth(token, validity)`

Creates an instance of Auth.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `token` | <span class="badge badge-type">string</span> | - The authentication token. |
| `validity` | <span class="badge badge-type">number</span> | - The validity period of the token. |

## Classe : `GuildIdChallenge`

Represents a Guild ID with an associated challenge ID.

#### Propriété `id`

<span class="badge badge-type">string</span> The ID of the guild.

#### Propriété `challengeID`

<span class="badge badge-type">string</span> The challenge ID associated with the guild.

### Constructeur `new GuildIdChallenge(id, challengeID)`

Creates an instance of GuildIdChallenge.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `id` | <span class="badge badge-type">string</span> | - The ID of the guild. |
| `challengeID` | <span class="badge badge-type">string</span> | - The challenge ID. |

## Classe : `Param`

Represents a parameter for the AutoRole configuration.

#### Propriété `guildIds`

<span class="badge badge-type">GuildIdChallenge[]</span> An array of guild IDs and their challenge IDs.

#### Propriété `auth`

<span class="badge badge-type">Auth</span> The authentication details.

#### Propriété `cronSchedule`

<span class="badge badge-type">string</span> The cron schedule string.

#### Propriété `domain`

<span class="badge badge-type">string</span> The domain.

#### Propriété `organization`

<span class="badge badge-type">string</span> The organization.

### Constructeur `new Param({ guildIds, auth, cronSchedule, domain, organization })`

Creates an instance of Param.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `paramData` | <span class="badge badge-type">object</span> | - The raw parameter data from JSON. |
| `paramData.guildIds` | <span class="badge badge-type">Array<{id: string, challengeID: string}></span> | - Guild ID and challenge ID pairs. |
| `paramData.auth` | <span class="badge badge-type">{token: string, validity: number}</span> | - Authentication data. |
| `paramData.cronSchedule` | <span class="badge badge-type">string</span> | - Cron schedule. |
| `paramData.domain` | <span class="badge badge-type">string</span> | - Domain. |
| `paramData.organization` | <span class="badge badge-type">string</span> | - Organization. |

## Classe : `SpecialRoleDetail`

Represents details of a special role.

#### Propriété `name`

<span class="badge badge-type">string</span> The name of the special role.

#### Propriété `id`

<span class="badge badge-type">string</span> The ID of the special role.

#### Propriété `rename`

<span class="badge badge-type">boolean</span> Whether the role allows renaming.

#### Propriété `priorityRename`

<span class="badge badge-type">boolean</span> Whether renaming has priority.

### Constructeur `new SpecialRoleDetail(name, id, rename, priorityRename)`

Creates an instance of SpecialRoleDetail.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `name` | <span class="badge badge-type">string</span> | - The name of the role. |
| `id` | <span class="badge badge-type">string</span> | - The ID of the role. |
| `rename` | <span class="badge badge-type">boolean</span> | - Allows renaming. |
| `priorityRename` | <span class="badge badge-type">boolean</span> | - Renaming has priority. |

## Classe : `RoleInfo`

Represents information about a role.

#### Propriété `name`

<span class="badge badge-type">string</span> The name of the role.

#### Propriété `id`

<span class="badge badge-type">?string</span> The ID of the role, can be null.

### Constructeur `new RoleInfo(name, id)`

Creates an instance of RoleInfo.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `name` | <span class="badge badge-type">string</span> | - The name of the role. |
| `id` | <span class="badge badge-type">?string</span> | - The ID of the role. |

## Classe : `RoleMapping`

Represents a mapping between a list of source roles and a target RoleInfo. This is a tuple-like structure [string[], RoleInfo].

#### Propriété `sourceRoles`

<span class="badge badge-type">string[]</span> An array of source role names.

#### Propriété `targetRole`

<span class="badge badge-type">RoleInfo</span> The target role information.

### Constructeur `new RoleMapping(sourceRoles, targetRole)`

Creates an instance of RoleMapping.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `sourceRoles` | <span class="badge badge-type">string[]</span> | - Array of source role names. |
| `targetRole` | <span class="badge badge-type">RoleInfo</span> | - Target role information. |

## Classe : `Division`

Represents a division.

#### Propriété `name`

<span class="badge badge-type">string</span> The name of the division.

#### Propriété `id`

<span class="badge badge-type">?string</span> The ID of the division, can be null.

### Constructeur `new Division({ name, id })`

Creates an instance of Division.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `name` | <span class="badge badge-type">string</span> | - The name of the division. |
| `id` | <span class="badge badge-type">?string</span> | - The ID of the division. |

## Classe : `Tags`

Represents tags including game roles.

#### Propriété `gameRoles`

<span class="badge badge-type">RoleMapping[]</span> Mappings for game roles.

### Constructeur `new Tags({ gameRoles })`

Creates an instance of Tags.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `tagsData` | <span class="badge badge-type">object</span> | - The raw tags data from JSON. |
| `tagsData.gameRoles` | <span class="badge badge-type">Array<[string[], {name: string, id: ?string}]></span> | - Game roles mappings. |
| `tagsData.divisions` | <span class="badge badge-type">Array<{name: string, id: ?string}></span> | - Divisions. |

## Classe : `Divisions`

Represents divisions.

#### Propriété `divisions`

<span class="badge badge-type">Division[]</span> An array of divisions.

### Constructeur `new Divisions(divisions)`

Creates an instance of Tags.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `tagsData` | <span class="badge badge-type">object</span> | - The raw tags data from JSON. |
| `tagsData.gameRoles` | <span class="badge badge-type">Array<[string[], {name: string, id: ?string}]></span> | - Game roles mappings. |
| `tagsData.divisions` | <span class="badge badge-type">Array<{name: string, id: ?string}></span> | - Divisions. |

## Classe : `GuildDetail`

Represents details for a specific guild.

#### Propriété `specialRoles`

<span class="badge badge-type">Record<string, SpecialRoleDetail></span> A record of special roles.

#### Propriété `roles`

<span class="badge badge-type">RoleMapping[]</span> An array of role mappings.

#### Propriété `tags`

<span class="badge badge-type">Tags</span> Tags for the guild.

### Constructeur `new GuildDetail({ specialRoles, roles, tags, divisions })`

Creates an instance of GuildDetail.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `guildData` | <span class="badge badge-type">object</span> | - The raw guild data from JSON. |
| `guildData.specialRoles` | <span class="badge badge-type">Record<string, {name: string, id: string, rename: boolean, priorityRename: boolean}></span> | - Special roles. |
| `guildData.roles` | <span class="badge badge-type">Array<[string[], {name: string, id: ?string}]></span> | - Role mappings. |
| `guildData.tags` | <span class="badge badge-type">object</span> | - Tags data. |

## Classe : `CompetitionRoles`

Represents roles for a specific competition.

#### Propriété `club`

<span class="badge badge-type">Record<string, string></span> Role IDs for 'club' category, keyed by division name or 'ALL'.

#### Propriété `coach`

<span class="badge badge-type">Record<string, string></span> Role IDs for 'coach' category, keyed by division name.

#### Propriété `player`

<span class="badge badge-type">Record<string, string></span> Role IDs for 'player' category, keyed by division name.

#### Propriété `manager`

<span class="badge badge-type">Record<string, string></span> Role IDs for 'manager' category, keyed by division name.

### Constructeur `new CompetitionRoles({ club, coach, player, manager })`

Creates an instance of CompetitionRoles.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `competitionData` | <span class="badge badge-type">object</span> | - The raw competition roles data from JSON. |
| `competitionData.club` | <span class="badge badge-type">Record<string, string></span> | - Club roles. |
| `competitionData.coach` | <span class="badge badge-type">Record<string, string></span> | - Coach roles. |
| `competitionData.player` | <span class="badge badge-type">Record<string, string></span> | - Player roles. |
| `competitionData.manager` | <span class="badge badge-type">Record<string, string></span> | - Manager roles. |

## Classe : `RoleIds`

Represents the structure for role IDs, including general and competition-specific roles.

#### Propriété `ALL`

<span class="badge badge-type">string</span> Default role ID for 'ALL'.

#### Propriété `captain`

<span class="badge badge-type">string</span> Role ID for 'captain'.

#### Propriété `competitions`

<span class="badge badge-type">Record<string, CompetitionRoles></span> A record of competition-specific roles, keyed by competition ID.

### Constructeur `new RoleIds({ ALL, captain, competitions })`

Creates an instance of RoleIds.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `roleIdsData` | <span class="badge badge-type">object</span> | - The raw role IDs data from JSON. |
| `roleIdsData.ALL` | <span class="badge badge-type">string</span> | - 'ALL' role ID. |
| `roleIdsData.captain` | <span class="badge badge-type">string</span> | - 'captain' role ID. |
| `roleIdsData.competitions` | <span class="badge badge-type">Record<string, object></span> | - Competition roles data. |

## Classe : `OlympeAuth`

Represents Olympe authentication details.

### Constructeur `new OlympeAuth(value)`

The authentication value.

## Classe : `for`

Creates an instance of OlympeAuth.

## Classe : `AutoRoleConfig`

Main class for the AutoRole configuration. 🤖

#### Propriété `params`

<span class="badge badge-type">Param[]</span> An array of parameters.

#### Propriété `guilds`

<span class="badge badge-type">Record<string, GuildDetail></span> A record of guild details, keyed by guild ID.

#### Propriété `orgaRoleIds`

<span class="badge badge-type">string[]</span> An array of organization role IDs.

#### Propriété `roleIds`

<span class="badge badge-type">RoleIds</span> The structure for role IDs.

#### Propriété `olympeAuth`

<span class="badge badge-type">OlympeAuth</span> Olympe authentication details.

#### Propriété `everyXhours`

<span class="badge badge-type">number</span> Interval in hours for a recurring task.

#### Propriété `olympeDomain`

<span class="badge badge-type">string</span> The Olympe domain.

#### Propriété `organization`

<span class="badge badge-type">string</span> The organization identifier.

#### Propriété `bot`

<span class="badge badge-type">Bot</span> The organization identifier.

Creates an instance of AutoRoleConfig.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `jsonData` | <span class="badge badge-type">object</span> | - The raw JSON data for AutoRole configuration. |
| `jsonData.params` | <span class="badge badge-type">Array<object></span> | - Parameters data. |
| `jsonData.guilds` | <span class="badge badge-type">Record<string, object></span> | - Guilds data. |
| `jsonData.orgaRoleIds` | <span class="badge badge-type">string[]</span> | - Organization role IDs. |
| `jsonData.roleIds` | <span class="badge badge-type">object</span> | - Role IDs data. |
| `jsonData.olympeAuth` | <span class="badge badge-type">{value: string}</span> | - Olympe authentication data. |
| `jsonData.everyXhours` | <span class="badge badge-type">number</span> | - Interval in hours. |
| `jsonData.olympeDomain` | <span class="badge badge-type">string</span> | - Olympe domain. |
| `jsonData.organization` | <span class="badge badge-type">string</span> | - Organization identifier. |
| `bot` | <span class="badge badge-type">Bot</span> | - bot discord |

### Méthode `getAllRoleIdentifiersFromGuildId(guildId)`

Retrieves all unique role identifiers (ID or name) from the configuration. C'est comme une chasse au trésor pour les identifiants de rôles (ID ou nom) ! 🗺️💎🏷️

**Retour :** <span class="badge badge-type">Array<({id: string} | {name: string})></span> - array of unique role identifier objects.

### Méthode `deleteGuildParam(guildId)`

Supprime les paramètres de configuration liés à un ID de guilde spécifique.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `guildId` | <span class="badge badge-type">string</span> | - L'ID de la guilde à supprimer de la configuration. |

### Méthode `checkAllGuild()`

Vérifie l'accessibilité de toutes les guildes configurées. Si une guilde n'est pas accessible, elle est retirée de la configuration.

**Retour :** <span class="badge badge-type">Array<import('discord.js').Guild></span> - liste des objets Guild accessibles.

### Méthode `fetchOrCreateRolesFromIdentifiersForAllGuild()`

Itère sur toutes les guildes configurées et lance le processus de récupération ou de création des rôles pour chacune d'entre elles.

### Méthode `fetchOrCreateRolesFromIdentifiers(identifiers, guild, options = {})`

Fetches or creates Discord roles based on the provided identifiers. C'est notre majordome Discord, il trouve ou crée les rôles pour nous ! 🤵‍♂️✨

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `identifiers` | <span class="badge badge-type">Array<({id: string} | {name: string})></span> | - An array of role identifiers from getAllRoleIdentifiers(). |
| `guild` | <span class="badge badge-type">import('discord.js').Guild</span> | - The discord.js Guild object. |
| `options` | <span class="badge badge-type">object</span> | - Options for role creation. |
| `options.creationReason` | <span class="badge badge-type">string</span> | - Reason for role creation. |

**Retour :** <span class="badge badge-type">Promise<Array<import('discord.js').Role|null>></span> - promise that resolves to an array of Role objects or null if a role couldn't be fetched/created.

