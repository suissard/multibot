---
title: mute
layout: default
---

# `mute`

Exécute la commande pour rendre un utilisateur muet sur le serveur. Applique un rôle "mute" à l'utilisateur, ce qui restreint son accès aux salons, et lui donne accès à un salon spécial pour communiquer avec les modérateurs. Crée le rôle et le salon s'ils n'existent pas.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.user` | `string` | - L'ID de l'utilisateur à rendre muet. |
| `args.raison` | `string` | - La raison pour laquelle l'utilisateur est rendu muet. |

**Returns:** `Promise<string>` - message de confirmation ou un message indiquant que l'utilisateur est déjà muet.

