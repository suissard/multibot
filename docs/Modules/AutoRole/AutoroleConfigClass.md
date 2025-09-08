---
title: AutoroleConfigClass
layout: default
---

# `AutoroleConfigClass`

## Class:

Represents an authentication object.

The authentication token.

The validity period of the token.

Creates an instance of Auth.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `token` | `string` | - The authentication token. |
| `validity` | `number` | - The validity period of the token. |

## Class:

Represents a Guild ID with an associated challenge ID.

The ID of the guild.

The challenge ID associated with the guild.

Creates an instance of GuildIdChallenge.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `id` | `string` | - The ID of the guild. |
| `challengeID` | `string` | - The challenge ID. |

## Class:

Represents a parameter for the AutoRole configuration.

An array of guild IDs and their challenge IDs.

The authentication details.

The cron schedule string.

The domain.

The organization.

Creates an instance of Param.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `paramData` | `object` | - The raw parameter data from JSON. |
| `paramData.guildIds` | `Array<{id: string, challengeID: string}>` | - Guild ID and challenge ID pairs. |
| `paramData.auth` | `{token: string, validity: number}` | - Authentication data. |
| `paramData.cronSchedule` | `string` | - Cron schedule. |
| `paramData.domain` | `string` | - Domain. |
| `paramData.organization` | `string` | - Organization. |

## Class:

Represents details of a special role.

The name of the special role.

The ID of the special role.

Whether the role allows renaming.

Whether renaming has priority.

Creates an instance of SpecialRoleDetail.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `name` | `string` | - The name of the role. |
| `id` | `string` | - The ID of the role. |
| `rename` | `boolean` | - Allows renaming. |
| `priorityRename` | `boolean` | - Renaming has priority. |

## Class:

Represents information about a role.

The name of the role.

The ID of the role, can be null.

Creates an instance of RoleInfo.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `name` | `string` | - The name of the role. |
| `id` | `?string` | - The ID of the role. |

## Class:

Represents a mapping between a list of source roles and a target RoleInfo. This is a tuple-like structure [string[], RoleInfo].

An array of source role names.

The target role information.

Creates an instance of RoleMapping.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `sourceRoles` | `string[]` | - Array of source role names. |
| `targetRole` | `RoleInfo` | - Target role information. |

## Class:

Represents a division.

The name of the division.

The ID of the division, can be null.

Creates an instance of Division.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `name` | `string` | - The name of the division. |
| `id` | `?string` | - The ID of the division. |

## Class:

Represents tags including game roles.

Mappings for game roles.

Creates an instance of Tags.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `tagsData` | `object` | - The raw tags data from JSON. |
| `tagsData.gameRoles` | `Array<[string[], {name: string, id: ?string}]>` | - Game roles mappings. |
| `tagsData.divisions` | `Array<{name: string, id: ?string}>` | - Divisions. |

## Class:

Represents divisions.

An array of divisions.

Creates an instance of Tags.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `tagsData` | `object` | - The raw tags data from JSON. |
| `tagsData.gameRoles` | `Array<[string[], {name: string, id: ?string}]>` | - Game roles mappings. |
| `tagsData.divisions` | `Array<{name: string, id: ?string}>` | - Divisions. |

## Class:

Represents details for a specific guild.

A record of special roles.

An array of role mappings.

Tags for the guild.

Creates an instance of GuildDetail.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `guildData` | `object` | - The raw guild data from JSON. |
| `guildData.specialRoles` | `Record<string, {name: string, id: string, rename: boolean, priorityRename: boolean}>` | - Special roles. |
| `guildData.roles` | `Array<[string[], {name: string, id: ?string}]>` | - Role mappings. |
| `guildData.tags` | `object` | - Tags data. |

## Class:

Represents roles for a specific competition.

Role IDs for 'club' category, keyed by division name or 'ALL'.

Role IDs for 'coach' category, keyed by division name.

Role IDs for 'player' category, keyed by division name.

Role IDs for 'manager' category, keyed by division name.

Creates an instance of CompetitionRoles.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `competitionData` | `object` | - The raw competition roles data from JSON. |
| `competitionData.club` | `Record<string, string>` | - Club roles. |
| `competitionData.coach` | `Record<string, string>` | - Coach roles. |
| `competitionData.player` | `Record<string, string>` | - Player roles. |
| `competitionData.manager` | `Record<string, string>` | - Manager roles. |

## Class:

Represents the structure for role IDs, including general and competition-specific roles.

Default role ID for 'ALL'.

Role ID for 'captain'.

A record of competition-specific roles, keyed by competition ID.

Creates an instance of RoleIds.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `roleIdsData` | `object` | - The raw role IDs data from JSON. |
| `roleIdsData.ALL` | `string` | - 'ALL' role ID. |
| `roleIdsData.captain` | `string` | - 'captain' role ID. |
| `roleIdsData.competitions` | `Record<string, object>` | - Competition roles data. |

## Class:

Represents Olympe authentication details.

The authentication value.

Creates an instance of OlympeAuth.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `value` | `string` | - The authentication value. |

## Class:

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

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `jsonData` | `object` | - The raw JSON data for AutoRole configuration. |
| `jsonData.params` | `Array<object>` | - Parameters data. |
| `jsonData.guilds` | `Record<string, object>` | - Guilds data. |
| `jsonData.orgaRoleIds` | `string[]` | - Organization role IDs. |
| `jsonData.roleIds` | `object` | - Role IDs data. |
| `jsonData.olympeAuth` | `{value: string}` | - Olympe authentication data. |
| `jsonData.everyXhours` | `number` | - Interval in hours. |
| `jsonData.olympeDomain` | `string` | - Olympe domain. |
| `jsonData.organization` | `string` | - Organization identifier. |
| `bot` | `Bot` | - bot discord |

Retrieves all unique role identifiers (ID or name) from the configuration. C'est comme une chasse au trésor pour les identifiants de rôles (ID ou nom) ! 🗺️💎🏷️

**Returns:** `Array<({id: string} | {name: string})>` - array of unique role identifier objects.

Supprime les paramètres de configuration liés à un ID de guilde spécifique.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `guildId` | `string` | - L'ID de la guilde à supprimer de la configuration. |

Vérifie l'accessibilité de toutes les guildes configurées. Si une guilde n'est pas accessible, elle est retirée de la configuration.

**Returns:** `Array<import('discord.js').Guild>` - liste des objets Guild accessibles.

Itère sur toutes les guildes configurées et lance le processus de récupération ou de création des rôles pour chacune d'entre elles.

Fetches or creates Discord roles based on the provided identifiers. C'est notre majordome Discord, il trouve ou crée les rôles pour nous ! 🤵‍♂️✨

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `identifiers` | `Array<({id: string} | {name: string})>` | - An array of role identifiers from getAllRoleIdentifiers(). |
| `guild` | `import('discord.js').Guild` | - The discord.js Guild object. |
| `options` | `object` | - Options for role creation. |
| `options.creationReason` | `string` | - Reason for role creation. |

**Returns:** `Promise<Array<import('discord.js').Role|null>>` - promise that resolves to an array of Role objects or null if a role couldn't be fetched/created.

