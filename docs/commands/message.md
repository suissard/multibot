---
title: message
layout: default
---

# Commande `message`

## Description

Envoie un direct message aux membres mentionnés ou ayant un role mentionné

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `message` |
| **Description** | Envoie un direct message aux membres mentionnés ou ayant un role mentionné |
| **Permissions User** | `['BanMembers']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `true` |

## Arguments

```javascript
[
        {
            type: 'STRING',
            name: 'texte',
            description: 'Message à envoyer',
            required: true,
        },
        {
            type: 'BOOLEAN',
            name: 'sendsecretary',
            description: 'Est ce que les messages envoyé doivent être envoyé au secrétariat',
            required: true,
        },
        {
            type: 'STRING',
            name: 'usersandroles',
            description: 'mention d\'utilisateurs et de roles en masse',
            required: false,
        },
        {
            type: 'USER',
            name: 'user',
            description: 'User à qui envoyer le message',
            required: false,
        },
        {
            //TODO Image marche pas
            type: 'STRING',
            name: 'imageurl',
            description: 'Ajouter une URL d\'image au message',
            required: false,
        },
        {
            type: 'ROLE',
            name: 'role',
            description: 'Envoyer un message à un role',
            required: false,
        },
    ]
```

## Fonctionnement

- Cette commande permet d'envoyer un message privé (DM) à un ou plusieurs utilisateurs.
- Elle nécessite la permission "Bannir des membres" (\`BanMembers\`) pour être utilisée.

- **Ciblage des utilisateurs :**
    - La commande peut cibler les utilisateurs de plusieurs manières :
        1.  En mentionnant un utilisateur unique (\`user\`).
        2.  En mentionnant un rôle (\`role\`), ce qui ciblera tous les membres ayant ce rôle.
        3.  En fournissant une chaîne de texte (\`usersandroles\`) contenant plusieurs mentions d'utilisateurs et/ou de rôles.

- **Contenu du message :**
    - Le message à envoyer est fourni via l'argument \`texte\`. Les séquences spéciales comme \`\\n\` sont converties en sauts de ligne.
    - Une image peut être jointe au message en fournissant une URL via l'argument \`imageurl\`.
    - Le message est envoyé sous forme d'"embed" Discord.

- **Fonctionnement :**
    1. La commande identifie tous les utilisateurs uniques à contacter en fonction des arguments fournis.
    2. Elle construit l'embed avec le texte et l'image éventuelle.
    3. Elle parcourt la liste des utilisateurs ciblés et envoie le message privé à chacun d'eux.
    4. Une barre de chargement visuelle est affichée pendant le processus d'envoi.

- **Option Secrétariat :**
    - Si l'argument \`sendsecretary\` est défini sur \`true\`, une copie de chaque message envoyé est également transmise au module "Secretary" du bot, probablement pour archivage ou suivi.
