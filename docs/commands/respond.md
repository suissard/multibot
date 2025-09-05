---
title: respond
layout: default
---

# Commande `respond`

## Description

Répond au message du secretary

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `respond` |
| **Description** | Répond au message du secretary |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

```javascript
[
        {
            type: 'STRING',
            name: 'texte',
            description: 'Texte à envoyer',
            required: false,
        }, {
            type: 'ATTACHMENT',
            name: 'fichier',
            description: 'Fichier à envoyer',
            required: false,
        }
    ]
```

## Fonctionnement

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
