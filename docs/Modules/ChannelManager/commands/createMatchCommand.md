---
title: createMatchCommand
layout: default
---

# `createMatchCommand`

## Description

Create match channels

Exécute la commande pour créer manuellement les salons pour un match spécifique.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.matchid` | `string` | - L'ID du match pour lequel créer les salons. |

**Returns:** `Promise<string>` - message indiquant que le processus est en cours ou qu'une erreur s'est produite.

