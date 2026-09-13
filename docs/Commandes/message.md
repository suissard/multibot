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

| Paramètre | Type | Description | Obligatoire |
| :-------- | :--- | :---------- | :---------- |
| `texte` | <span class="badge badge-type">STRING</span> | Message à envoyer | <span class="badge badge-required">Requis</span> |
| `sendsecretary` | <span class="badge badge-type">BOOLEAN</span> | Est ce que les messages envoyé doivent être envoyé au secrétariat | <span class="badge badge-required">Requis</span> |
| `usersandroles` | <span class="badge badge-type">STRING</span> | mention d'utilisateurs et de roles en masse | <span class="badge badge-optional">Optionnel</span> |
| `user` | <span class="badge badge-type">USER</span> | User à qui envoyer le message | <span class="badge badge-optional">Optionnel</span> |
| `imageurl` | <span class="badge badge-type">STRING</span> | Ajouter une URL d'image au message | <span class="badge badge-optional">Optionnel</span> |
| `role` | <span class="badge badge-type">ROLE</span> | Envoyer un message à un role | <span class="badge badge-optional">Optionnel</span> |

Exécute la commande pour envoyer un message privé à des utilisateurs. Cible les utilisateurs via une mention directe, un rôle, ou une chaîne de mentions multiples. Peut également transférer le message au "secrétariat" pour archivage.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `args` | <span class="badge badge-type">object</span> | - Les arguments de la commande. |
| `args.texte` | <span class="badge badge-type">string</span> | - Le contenu du message à envoyer. |
| `args.sendsecretary` | <span class="badge badge-type">boolean</span> | - Si `true`, le message est aussi envoyé au secrétariat. |
| `args.usersandroles` | <span class="badge badge-type">string</span> | - Une chaîne de mentions d'utilisateurs et de rôles. |
| `args.user` | <span class="badge badge-type">string</span> | - L'ID d'un utilisateur unique à qui envoyer le message. |
| `args.imageurl` | <span class="badge badge-type">string</span> | - L'URL d'une image à joindre au message. |
| `args.role` | <span class="badge badge-type">string</span> | - L'ID d'un rôle dont les membres recevront le message. |

**Retour :** <span class="badge badge-type">Promise<string></span> - message de confirmation ou d'erreur.

Extrait et retourne une liste d'objets User à partir d'une chaîne contenant des mentions d'utilisateurs et de rôles.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `string` | <span class="badge badge-type">string</span> | - La chaîne de caractères à analyser. |

**Retour :** <span class="badge badge-type">Promise<Array<import('discord.js').User>></span> - liste d'objets User uniques.

