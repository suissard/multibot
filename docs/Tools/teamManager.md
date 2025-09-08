---
title: teamManager
layout: default
---

# `teamManager`



**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `collection` | `import('suissard-strapi-client').StrapiCollection` | - La collection Strapi pour les équipes. |

Sauvegarde ou met à jour les données d'une équipe dans la base de données Strapi.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `name` | `string` | - Le nom de l'équipe. |
| `userID` | `string` | - L'ID Discord du capitaine. |
| `elo` | `string` | - Le classement de l'équipe. |
| `battleTag` | `string` | - Le BattleTag du capitaine. |

**Returns:** `Promise<import('suissard-strapi-client').StrapiObject>` - équipe sauvegardé ou mis à jour.

Retrouve une équipe dans le cache par son nom.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `name` | `string` | - Le nom de l'équipe. |

**Returns:** `import('suissard-strapi-client').StrapiObject|undefined` - équipe trouvé, ou undefined.

Crée le rôle spécifique pour une équipe, s'il n'existe pas déjà.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `teamname` | `string` | - Le nom de l'équipe. |
| `guild` | `import('discord.js').Guild` | - La guilde. |

**Returns:** `Promise<import('discord.js').Role>` - rôle de l'équipe.

Crée la catégorie de salons pour les événements.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `guild` | `import('discord.js').Guild` | - La guilde. |

**Returns:** `Promise<import('discord.js').CategoryChannel>` - catégorie créée.

Crée le salon vocal pour une équipe, s'il n'existe pas déjà. Configure les permissions pour le staff, le capitaine et les membres de l'équipe.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `teamname` | `string` | - Le nom de l'équipe. |
| `guild` | `import('discord.js').Guild` | - La guilde. |

**Returns:** `Promise<import('discord.js').VoiceChannel>` - salon vocal de l'équipe.

Ajoute les rôles d'équipe et de capitaine à un membre.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `member` | `import('discord.js').GuildMember` | - Le membre à qui ajouter les rôles. |
| `rolecap` | `import('discord.js').Role` | - Le rôle de capitaine. |
| `roleteam` | `import('discord.js').Role` | - Le rôle de l'équipe. |

**Returns:** `Promise<import('discord.js').GuildMember>` - membre mis à jour.

Vérifie si un membre a les rôles d'équipe et de capitaine, et les ajoute si nécessaire.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `member` | `import('discord.js').GuildMember` | - Le membre à vérifier. |
| `rolecap` | `import('discord.js').Role` | - Le rôle de capitaine. |
| `roleteam` | `import('discord.js').Role` | - Le rôle de l'équipe. |

**Returns:** `Promise<import('discord.js').GuildMember>` - membre vérifié.

Met à jour le nom d'un rôle d'équipe.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `role` | `import('discord.js').Role` | - Le rôle à modifier. |
| `newTeamName` | `string` | - Le nouveau nom de l'équipe. |

**Returns:** `Promise<import('discord.js').Role>` - rôle mis à jour.

Met à jour le nom d'un salon d'équipe.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `channel` | `import('discord.js').VoiceChannel` | - Le salon à modifier. |
| `newTeamName` | `string` | - Le nouveau nom de l'équipe. |

**Returns:** `Promise<import('discord.js').VoiceChannel>` - salon mis à jour.

Transfère les rôles de capitaine et d'équipe d'un ancien capitaine à un nouveau.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `cap` | `import('discord.js').GuildMember` | - L'ancien capitaine. |
| `newCap` | `import('discord.js').GuildMember` | - Le nouveau capitaine. |
| `capRole` | `import('discord.js').Role` | - Le rôle de capitaine. |
| `teamRole` | `import('discord.js').Role` | - Le rôle de l'équipe. |

**Returns:** `Promise<import('discord.js').GuildMember>` - nouveau capitaine mis à jour.

Met à jour le BattleTag du capitaine.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `teamInfo` | `object` | - Les informations de l'équipe. |
| `newBtag` | `string` | - Le nouveau BattleTag. |

Met à jour le classement (elo) de l'équipe.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `teamInfo` | `object` | - Les informations de l'équipe. |
| `newRank` | `number` | - Le nouveau classement. |

