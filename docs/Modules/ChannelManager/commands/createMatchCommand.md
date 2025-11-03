---
title: createMatchCommand
layout: default
---

# `createMatchCommand`

## Description

Create match channels

## Narrative


- Cette commande permet de créer manuellement les salons (vocaux et textuels) pour un match spécifique.
- Elle est utile si la création automatique a échoué ou pour des besoins de test.
- Elle nécessite l'ID du match en argument.

- **Fonctionnement :**
    1.  La commande prend un ID de match (\

Exécute la commande pour créer manuellement les salons pour un match spécifique.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.matchid` | `string` | - L'ID du match pour lequel créer les salons. |

**Returns:** `Promise<string>` - message indiquant que le processus est en cours ou qu'une erreur s'est produite.

