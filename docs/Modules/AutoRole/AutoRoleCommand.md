---
title: AutoRoleCommand
layout: default
---

# `AutoRoleCommand`

Exécute la commande d'attribution manuelle des rôles. Peut être déclenchée pour tous les utilisateurs, un utilisateur spécifique ou une équipe spécifique.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.user` | `string` | - L'ID de l'utilisateur Discord à mettre à jour. |
| `args.teamid` | `string` | - L'ID de l'équipe Olympe à mettre à jour. |

**Returns:** `Promise<string>` - message indiquant que le processus est en cours.

