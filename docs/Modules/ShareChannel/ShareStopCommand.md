---
title: ShareStopCommand
layout: default
---

# `ShareStopCommand`

Retirer un salon du systeme de partage

## Narrative


- Cette commande permet de retirer le salon actuel du système de partage de salons.
- Elle nécessite la permission "Gérer les salons" (\`MANAGE_CHANNELS\`).
- Elle ne prend aucun argument.

- **Fonctionnement :**
    1.  La commande vérifie d'abord si le salon actuel fait bien partie d'un groupe de partage en recherchant son ID.
    2.  Si c'est le cas, elle appelle la méthode interne \`del()\`.
    3.  La méthode \`del()\` identifie le groupe de partage auquel le salon appartient.
    4.  Elle supprime ensuite l'ID du salon de la liste des salons de ce groupe, ce qui arrête la diffusion des messages vers et depuis ce salon.
    5.  Un message de confirmation est renvoyé.
    6.  Si le salon n'était pas dans le système de partage au départ, la commande renvoie un message d'erreur.


Commande de gestion des shareChannel

Exécute la commande pour retirer le salon actuel de son groupe de partage.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande (non utilisés ici). |

**Returns:** `string` - message de confirmation ou d'erreur.

Retire le salon actuel de son groupe de partage.

**Returns:** `string` - message de confirmation.

