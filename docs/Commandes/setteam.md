---
title: setteam
layout: default
---

# `setteam`

Exécute la commande de création d'équipe. Lance le processus de création de rôle et de salon, puis envoie un message de confirmation.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.teamname` | `string` | - Le nom de l'équipe. |
| `args.capitaine` | `string` | - L'ID de l'utilisateur capitaine. |
| `args.elo` | `string` | - L'elo de l'équipe. |
| `args.btag` | `string` | - Le BattleTag du capitaine. |

**Returns:** `string` - message indiquant que la création est en cours.

Récupère ou crée les rôles nécessaires pour l'équipe. Crée un rôle spécifique pour l'équipe et trouve le rôle de "Capitaine".

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande, principalement `args.teamname`. |

**Returns:** `Promise<{roleteam: import('discord.js').Role, rolecap: import('discord.js').Role}>` - objet contenant le rôle de l'équipe et le rôle de capitaine.

Crée le salon de l'équipe, assigne les rôles au capitaine et enregistre les données de l'équipe.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `roleteam` | `import('discord.js').Role` | - Le rôle de l'équipe. |
| `rolecap` | `import('discord.js').Role` | - Le rôle de capitaine. |

