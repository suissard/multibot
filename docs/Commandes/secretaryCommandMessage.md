---
title: secretaryCommandMessage
layout: default
---

# `secretaryCommandMessage`

> **Description :** Répond au message du secretary

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

| Paramètre | Type | Description | Obligatoire |
| :-------- | :--- | :---------- | :---------- |
| `texte` | <span class="badge badge-type">STRING</span> | Texte à envoyer | <span class="badge badge-optional">Optionnel</span> |
| `fichier` | <span class="badge badge-type">ATTACHMENT</span> | Fichier à envoyer | <span class="badge badge-optional">Optionnel</span> |

Exécute la commande pour répondre à un utilisateur via un salon de secrétariat. Extrait l'ID de l'utilisateur depuis le nom du salon, puis envoie la réponse à la fois en message privé à l'utilisateur et dans le salon actuel.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `args` | <span class="badge badge-type">object</span> | - Les arguments de la commande. |
| `args.interaction` | <span class="badge badge-type">import('discord.js').CommandInteraction</span> | - L'objet d'interaction original, pour récupérer les pièces jointes. |
| `args.texte` | <span class="badge badge-type">string</span> | - Le texte de la réponse. |

**Retour :** <span class="badge badge-type">Promise<string></span> - message de confirmation ou d'erreur.

