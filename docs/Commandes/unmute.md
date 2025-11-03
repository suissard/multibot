---
title: unmute
layout: default
---

# `unmute`

Exécute la commande pour enlever le statut muet d'un utilisateur. Supprime le rôle "mute" de l'utilisateur et restaure ses permissions sur tous les salons.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.user` | `string` | - L'ID de l'utilisateur à démuter. |

**Returns:** `Promise<string>` - message de confirmation ou un message indiquant que l'utilisateur n'était pas muet.

