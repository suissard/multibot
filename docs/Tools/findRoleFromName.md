---
title: findRoleFromName
layout: default
---

# `findRoleFromName`

## Class: 

Une classe utilitaire pour trouver ou créer des rôles dans une guilde.

Trouve un rôle par son nom dans une guilde. S'il n'existe pas, le crée.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `roleName` | `string` | - Le nom du rôle à trouver ou à créer. |
| `guild` | `import('discord.js').Guild` | - La guilde où chercher le rôle. |

**Returns:** `Promise<import('discord.js').Role>` - rôle trouvé ou nouvellement créé.

Crée un nouveau rôle dans une guilde.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `name` | `string` | - Le nom du rôle à créer. |
| `guild` | `import('discord.js').Guild` | - La guilde où créer le rôle. |

**Returns:** `Promise<import('discord.js').Role>` - rôle qui a été créé.

