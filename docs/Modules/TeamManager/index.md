---
title: index
layout: default
---

# `index`

Le module TeamManager gère la création et la mise à jour automatique des salons vocaux d'équipe. Il se base sur les données fournies par le module AutoRole (API Olympe).

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `bot` | `import('../../Class/Bot')` | - L'instance du bot. |

Internal helper to sync teams for a specific segment object.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `guild` | `import('discord.js').Guild` |  |
| `targetSegment` | `object` |  |

**Returns:** `Promise<object>` - object { found, success, pruned, errors }

Synchronise toutes les équipes présentes dans le cache Olympe pour un segment donné ou tous les segments.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `guild` | `import('discord.js').Guild` |  |
| `segmentFilter` | `string` | - Filtre optionnel pour le segment. |

## Commandes du Module

* [CreateAllTeamChannelsCommand](./commands/CreateAllTeamChannelsCommand.html)
* [DeleteAllTeamChannelsCommand](./commands/DeleteAllTeamChannelsCommand.html)
* [UpdateTeamChannelPermissionsCommand](./commands/UpdateTeamChannelPermissionsCommand.html)

