---
title: notifyMatchCommand
layout: default
---

# `notifyMatchCommand`

## Narrative


- Cette commande permet d'envoyer manuellement une notification de match dans le salon où la commande est exécutée, en utilisant simplement l'ID du match.
- Elle nécessite la permission "Gérer les salons" (\`ManageChannels\`).

- **Fonctionnement :**
    1.  La commande récupère l'ID du match depuis l'argument.
    2.  Elle appelle l'API pour obtenir les détails complets du match (équipes, division, date, casters).
    3.  Elle appelle la fonction \`notifyMatch()\` pour envoyer la notification.
    4.  La commande renvoie un message de confirmation.


## Arguments

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| `matchid` | `STRING` | ID du match Olympe | Yes |
| `role` | `ROLE` | Rôle à mentionner | No |

Exécute la commande pour envoyer une notification de match à partir d'un ID.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |

**Returns:** `Promise<string>` - message de confirmation ou d'erreur.

