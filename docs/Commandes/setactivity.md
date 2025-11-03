---
title: setactivity
layout: default
---

# `setactivity`

change le status du bot

## Narrative


- Cette commande permet de changer le message d'activité (le statut "Joue à...") du bot.
- **Sécurité :** L'exécution est strictement réservée au propriétaire du bot (\`devBoss = true\`).

- **Fonctionnement :**
    1.  La commande prend un argument \`status\` (texte) qui est le message à afficher.
    2.  Elle appelle la méthode \`setActivity()\` sur l'objet \`user\` du bot, en lui passant le texte du statut.
    3.  Elle retourne ensuite un message confirmant que le statut a été mis à jour.
    4.  Note : Un argument \`type\` existe mais n'est pas actuellement utilisé dans le code. La fonctionnalité pour changer le type d'activité (Streaming, Watching, etc.) est présente en commentaire mais n'est pas active.


## Arguments

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| `status` | `STRING` | Status a mettre | Yes |
| `type` | `STRING` | Type de status a mettre | No |

Exécute la commande pour changer l'activité du bot.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.status` | `string` | - Le texte de l'activité à afficher. |
| `args.type` | `string` | - Le type d'activité (non implémenté actuellement). |

**Returns:** `Promise<string>` - message de confirmation.

