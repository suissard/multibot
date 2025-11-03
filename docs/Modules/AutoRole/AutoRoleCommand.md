---
title: AutoRoleCommand
layout: default
---

# `AutoRoleCommand`

## Narrative


- Cette commande permet de lancer manuellement le processus d'attribution automatique des rôles liés à la compétition Olympe.
- Elle offre trois modes de fonctionnement :

- **1. Mode général (aucun argument) :**
    - Si aucun argument n'est fourni, la commande lance la fonction \

Exécute la commande d'attribution manuelle des rôles. Peut être déclenchée pour tous les utilisateurs, un utilisateur spécifique ou une équipe spécifique.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.user` | `string` | - L'ID de l'utilisateur Discord à mettre à jour. |
| `args.teamid` | `string` | - L'ID de l'équipe Olympe à mettre à jour. |

**Returns:** `Promise<string>` - message indiquant que le processus est en cours.

