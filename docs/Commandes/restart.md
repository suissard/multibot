---
title: restart
layout: default
---

# `restart`

redemarre le bot

## Narrative


- Cette commande est conçue pour redémarrer le bot.
- **Sécurité :** L'exécution est strictement réservée au propriétaire du bot, dont l'ID est défini dans la configuration (\`this.bot.ownerId\`).
- La commande vérifie si l'ID de l'utilisateur qui l'exécute correspond à l'ID du propriétaire.
- Si c'est le cas, elle appelle la méthode \`this.bot.restart()\` qui gère le processus de redémarrage.
- Si une raison est fournie en argument, elle est ajoutée au message de confirmation qui est envoyé juste avant le redémarrage.
- Si l'utilisateur n'est pas le propriétaire, la commande renvoie un message d'erreur et ne fait rien d'autre.


## Arguments

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| `raison` | `STRING` | Raison du restart | No |

Exécute la commande pour redémarrer le bot. La commande ne peut être exécutée que par le propriétaire du bot.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.raison` | `string` | - La raison du redémarrage, qui sera incluse dans la réponse. |

**Returns:** `string` - message de confirmation ou un message d'erreur si l'utilisateur n'est pas le propriétaire.

