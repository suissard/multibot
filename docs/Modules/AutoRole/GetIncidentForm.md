---
title: GetIncidentForm
layout: default
---

# `GetIncidentForm`

Génère une URL personnalisée pour le formulaire de déclaration d'incident.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `olympeUserInfo` | `object` | - Les informations de l'utilisateur provenant de l'API Olympe. |
| `olympeUserInfo.nationality` | `string` | - La nationalité de l'utilisateur. |
| `olympeUserInfo.battlenetBtag` | `string` | - Le BattleTag de l'utilisateur. |
| `olympeUserInfo.teams` | `Array<{name: string}>` | - Les équipes de l'utilisateur. |
| `discordUser` | `import('discord.js').User` | - L'objet utilisateur Discord. |

**Returns:** `string` - personnalisée et pré-remplie du formulaire Google.

Exécute la commande pour envoyer un formulaire de déclaration d'incident. Récupère les informations Olympe de l'utilisateur, génère une URL de formulaire personnalisée et l'envoie en message privé.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.user` | `string` | - L'ID de l'utilisateur à qui envoyer le formulaire. |

**Returns:** `Promise<string>` - message de confirmation.

