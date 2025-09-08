---
title: restart
layout: default
---

# `restart`

Exécute la commande pour redémarrer le bot. La commande ne peut être exécutée que par le propriétaire du bot.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.raison` | `string` | - La raison du redémarrage, qui sera incluse dans la réponse. |

**Returns:** `string` - message de confirmation ou un message d'erreur si l'utilisateur n'est pas le propriétaire.

