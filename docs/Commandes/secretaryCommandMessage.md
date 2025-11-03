---
title: secretaryCommandMessage
layout: default
---

# `secretaryCommandMessage`

Répond au message du secretary

## Narrative


- Cette commande est spécifiquement conçue pour être utilisée dans les salons créés par le module "Secretary".
- Son but est de permettre à un modérateur de répondre à un utilisateur qui a ouvert un ticket.

- **Fonctionnement :**
    1.  La commande vérifie d'abord si elle est exécutée dans un serveur où le module "Secretary" est actif.
    2.  Elle s'attend à être dans un salon dont le nom se termine par un tiret suivi d'un ID d'utilisateur (par exemple, \`ticket-jean-123456789012345678\`).
    3.  Elle extrait cet ID utilisateur directement depuis le nom du salon.
    4.  Elle récupère l'objet "user" correspondant à cet ID pour pouvoir lui envoyer un message privé.
    5.  Elle prend le texte et/ou le fichier joint fourni en argument par le modérateur.
    6.  Elle construit un message "embed" avec ce contenu.
    7.  La commande envoie cet embed à deux endroits :
        - En message privé (DM) à l'utilisateur qui a ouvert le ticket.
        - Dans le salon de secrétariat actuel, pour garder une trace de la conversation.
    8.  Si la commande n'est pas utilisée dans un salon de secrétariat valide ou si aucun message/fichier n'est fourni, elle renvoie une erreur.


## Arguments

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| `texte` | `STRING` | Texte à envoyer | No |
| `fichier` | `ATTACHMENT` | Fichier à envoyer | No |

Exécute la commande pour répondre à un utilisateur via un salon de secrétariat. Extrait l'ID de l'utilisateur depuis le nom du salon, puis envoie la réponse à la fois en message privé à l'utilisateur et dans le salon actuel.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.interaction` | `import('discord.js').CommandInteraction` | - L'objet d'interaction original, pour récupérer les pièces jointes. |
| `args.texte` | `string` | - Le texte de la réponse. |

**Returns:** `Promise<string>` - message de confirmation ou d'erreur.

