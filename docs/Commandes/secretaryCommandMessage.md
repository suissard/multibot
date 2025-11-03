---
title: secretaryCommandMessage
layout: default
---

# `secretaryCommandMessage`

## Description

Répond au message du secretary

## Narrative


- Cette commande est spécifiquement conçue pour être utilisée dans les salons créés par le module "Secretary".
- Son but est de permettre à un modérateur de répondre à un utilisateur qui a ouvert un ticket.

- **Fonctionnement :**
    1.  La commande vérifie d'abord si elle est exécutée dans un serveur où le module "Secretary" est actif.
    2.  Elle s'attend à être dans un salon dont le nom se termine par un tiret suivi d'un ID d'utilisateur (par exemple, \

Exécute la commande pour répondre à un utilisateur via un salon de secrétariat. Extrait l'ID de l'utilisateur depuis le nom du salon, puis envoie la réponse à la fois en message privé à l'utilisateur et dans le salon actuel.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.interaction` | `import('discord.js').CommandInteraction` | - L'objet d'interaction original, pour récupérer les pièces jointes. |
| `args.texte` | `string` | - Le texte de la réponse. |

**Returns:** `Promise<string>` - message de confirmation ou d'erreur.

