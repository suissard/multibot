---
title: AutoroleConfigClass
layout: default
---

# `AutoroleConfigClass`

## Classe : ``

Represents an authentication object.

The authentication token.

The validity period of the token.

Creates an instance of Auth.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `token` | <span class="badge badge-type">string</span> | - The authentication token. |
| `validity` | <span class="badge badge-type">number</span> | - The validity period of the token. |

## Classe : ``

Represents a Guild ID with an associated challenge ID.

The ID of the guild.

The challenge ID associated with the guild.

Creates an instance of GuildIdChallenge.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `id` | <span class="badge badge-type">string</span> | - The ID of the guild. |
| `challengeID` | <span class="badge badge-type">string</span> | - The challenge ID. |

## Classe : ``

Represents a parameter for the AutoRole configuration.

An array of guild IDs and their challenge IDs.

The authentication details.

The cron schedule string.

The domain.

The organization.

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

## Classe : ``

Represents details of a special role.

The name of the special role.

The ID of the special role.

Whether the role allows renaming.

Whether renaming has priority.

Creates an instance of SpecialRoleDetail.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `name` | <span class="badge badge-type">string</span> | - The name of the role. |
| `id` | <span class="badge badge-type">string</span> | - The ID of the role. |
| `rename` | <span class="badge badge-type">boolean</span> | - Allows renaming. |
| `priorityRename` | <span class="badge badge-type">boolean</span> | - Renaming has priority. |

## Classe : ``

Represents information about a role.

The name of the role.

The ID of the role, can be null.

Creates an instance of RoleInfo.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `name` | <span class="badge badge-type">string</span> | - The name of the role. |
| `id` | <span class="badge badge-type">?string</span> | - The ID of the role. |

## Classe : ``

Represents a mapping between a list of source roles and a target RoleInfo. This is a tuple-like structure [string[], RoleInfo].

An array of source role names.

The target role information.

Creates an instance of RoleMapping.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `sourceRoles` | <span class="badge badge-type">string[]</span> | - Array of source role names. |
| `targetRole` | <span class="badge badge-type">RoleInfo</span> | - Target role information. |

## Classe : ``

Represents a division.

The name of the division.

The ID of the division, can be null.

Creates an instance of Division.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `name` | <span class="badge badge-type">string</span> | - The name of the division. |
| `id` | <span class="badge badge-type">?string</span> | - The ID of the division. |

## Classe : ``

Represents tags including game roles.

Mappings for game roles.

Creates an instance of Tags.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `tagsData` | <span class="badge badge-type">object</span> | - The raw tags data from JSON. |
| `tagsData.gameRoles` | <span class="badge badge-type">Array<[string[], {name: string, id: ?string}]></span> | - Game roles mappings. |
| `tagsData.divisions` | <span class="badge badge-type">Array<{name: string, id: ?string}></span> | - Divisions. |

## Classe : ``

Represents divisions.

An array of divisions.

Creates an instance of Tags.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `tagsData` | <span class="badge badge-type">object</span> | - The raw tags data from JSON. |
| `tagsData.gameRoles` | <span class="badge badge-type">Array<[string[], {name: string, id: ?string}]></span> | - Game roles mappings. |
| `tagsData.divisions` | <span class="badge badge-type">Array<{name: string, id: ?string}></span> | - Divisions. |

## Classe : ``

Represents details for a specific guild.

A record of special roles.

An array of role mappings.

Tags for the guild.

Creates an instance of GuildDetail.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `guildData` | <span class="badge badge-type">object</span> | - The raw guild data from JSON. |
| `guildData.specialRoles` | <span class="badge badge-type">Record<string, {name: string, id: string, rename: boolean, priorityRename: boolean}></span> | - Special roles. |
| `guildData.roles` | <span class="badge badge-type">Array<[string[], {name: string, id: ?string}]></span> | - Role mappings. |
| `guildData.tags` | <span class="badge badge-type">object</span> | - Tags data. |

## Classe : ``

Represents roles for a specific competition.

Role IDs for 'club' category, keyed by division name or 'ALL'.

Role IDs for 'coach' category, keyed by division name.

Role IDs for 'player' category, keyed by division name.

Role IDs for 'manager' category, keyed by division name.

Creates an instance of CompetitionRoles.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `competitionData` | <span class="badge badge-type">object</span> | - The raw competition roles data from JSON. |
| `competitionData.club` | <span class="badge badge-type">Record<string, string></span> | - Club roles. |
| `competitionData.coach` | <span class="badge badge-type">Record<string, string></span> | - Coach roles. |
| `competitionData.player` | <span class="badge badge-type">Record<string, string></span> | - Player roles. |
| `competitionData.manager` | <span class="badge badge-type">Record<string, string></span> | - Manager roles. |

## Classe : ``

Represents the structure for role IDs, including general and competition-specific roles.

Default role ID for 'ALL'.

Role ID for 'captain'.

A record of competition-specific roles, keyed by competition ID.

Creates an instance of RoleIds.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `roleIdsData` | <span class="badge badge-type">object</span> | - The raw role IDs data from JSON. |
| `roleIdsData.ALL` | <span class="badge badge-type">string</span> | - 'ALL' role ID. |
| `roleIdsData.captain` | <span class="badge badge-type">string</span> | - 'captain' role ID. |
| `roleIdsData.competitions` | <span class="badge badge-type">Record<string, object></span> | - Competition roles data. |

## Classe : ``

Represents Olympe authentication details.

The authentication value.

Creates an instance of OlympeAuth.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `value` | <span class="badge badge-type">string</span> | - The authentication value. |

## Classe : ``

Main class for the AutoRole configuration. 🤖

An array of parameters.

A record of guild details, keyed by guild ID.

An array of organization role IDs.

The structure for role IDs.

Olympe authentication details.

Interval in hours for a recurring task.

The Olympe domain.

The organization identifier.

The organization identifier.

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

Retrieves all unique role identifiers (ID or name) from the configuration. C'est comme une chasse au trésor pour les identifiants de rôles (ID ou nom) ! 🗺️💎🏷️

**Retour :** <span class="badge badge-type">Array<({id: string} | {name: string})></span> - array of unique role identifier objects.

Supprime les paramètres de configuration liés à un ID de guilde spécifique.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `guildId` | <span class="badge badge-type">string</span> | - L'ID de la guilde à supprimer de la configuration. |

Vérifie l'accessibilité de toutes les guildes configurées. Si une guilde n'est pas accessible, elle est retirée de la configuration.

**Retour :** <span class="badge badge-type">Array<import('discord.js').Guild></span> - liste des objets Guild accessibles.

Itère sur toutes les guildes configurées et lance le processus de récupération ou de création des rôles pour chacune d'entre elles.

Fetches or creates Discord roles based on the provided identifiers. C'est notre majordome Discord, il trouve ou crée les rôles pour nous ! 🤵‍♂️✨

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `identifiers` | <span class="badge badge-type">Array<({id: string} | {name: string})></span> | - An array of role identifiers from getAllRoleIdentifiers(). |
| `guild` | <span class="badge badge-type">import('discord.js').Guild</span> | - The discord.js Guild object. |
| `options` | <span class="badge badge-type">object</span> | - Options for role creation. |
| `options.creationReason` | <span class="badge badge-type">string</span> | - Reason for role creation. |

**Retour :** <span class="badge badge-type">Promise<Array<import('discord.js').Role|null>></span> - promise that resolves to an array of Role objects or null if a role couldn't be fetched/created.

