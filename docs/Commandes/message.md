---
title: message
layout: default
---

# `message`

## Narrative


- Cette commande permet d'envoyer un message privé (DM) à un ou plusieurs utilisateurs.
- Elle nécessite la permission "Bannir des membres" (\

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

