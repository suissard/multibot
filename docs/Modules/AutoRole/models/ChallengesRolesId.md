---
title: ChallengesRolesId
layout: default
---

# `ChallengesRolesId`

## Class:

Structure les IDs de rôles pour les différentes compétitions. Contient les rôles globaux (pour tous, capitaine, caster) et les rôles spécifiques à chaque compétition, organisés par segment.



**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `ALL` | `string` | - L'ID du rôle Discord donné à tous les participants. |
| `captain` | `string` | - L'ID du rôle Discord donné à tous les capitaines. |
| `caster` | `string` | - L'ID du rôle Discord donné à tous les casters. |
| `competitions` | `object` | - Un objet où les clés sont les ID de challenge et les valeurs sont les configurations de rôles pour ce challenge. |

Récupère de manière récursive tous les ID de rôle contenus dans l'objet.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `object` | `object` | - L'objet à parcourir. |
| `target` | `Array<string>` | - Le tableau pour accumuler les IDs. |

**Returns:** `Array<string>` - tableau plat de tous les ID de rôle.

