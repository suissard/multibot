---
title: removeUserFromChannel
layout: default
---

# `removeUserFromChannel`

## Description

Remove a user from a channel

## Narrative


- **ATTENTION : Cette commande est actuellement désactivée (le \

Exécute la commande pour retirer un ou plusieurs utilisateurs d'un salon.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.channel` | `string` | - Le nom du salon. |
| `args.user1` | `string` | - L'ID du premier utilisateur à retirer. |
| `args.user2` | `string` | - L'ID du deuxième utilisateur à retirer. |
| `args.user3` | `string` | - L'ID du troisième utilisateur à retirer. |

**Returns:** `string` - message de confirmation ou d'erreur.

