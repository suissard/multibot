---
title: message
layout: default
---

# `message`

## Narrative


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


## Arguments

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| `texte` | `STRING` | Message à envoyer | Yes |
| `sendsecretary` | `BOOLEAN` | Est ce que les messages envoyé doivent être envoyé au secrétariat | Yes |
| `usersandroles` | `STRING` | mention d'utilisateurs et de roles en masse | No |
| `user` | `USER` | User à qui envoyer le message | No |
| `imageurl` | `STRING` | Ajouter une URL d'image au message | No |
| `role` | `ROLE` | Envoyer un message à un role | No |

Exécute la commande pour envoyer un message privé à des utilisateurs. Cible les utilisateurs via une mention directe, un rôle, ou une chaîne de mentions multiples. Peut également transférer le message au "secrétariat" pour archivage.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.texte` | `string` | - Le contenu du message à envoyer. |
| `args.sendsecretary` | `boolean` | - Si `true`, le message est aussi envoyé au secrétariat. |
| `args.usersandroles` | `string` | - Une chaîne de mentions d'utilisateurs et de rôles. |
| `args.user` | `string` | - L'ID d'un utilisateur unique à qui envoyer le message. |
| `args.imageurl` | `string` | - L'URL d'une image à joindre au message. |
| `args.role` | `string` | - L'ID d'un rôle dont les membres recevront le message. |

**Returns:** `Promise<string>` - message de confirmation ou d'erreur.

Extrait et retourne une liste d'objets User à partir d'une chaîne contenant des mentions d'utilisateurs et de rôles.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `string` | `string` | - La chaîne de caractères à analyser. |

**Returns:** `Promise<Array<import('discord.js').User>>` - liste d'objets User uniques.

