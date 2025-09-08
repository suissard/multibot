---
title: event
layout: default
---

# `event`

Exécute la sous-commande appropriée en fonction des arguments.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.texte` | `string` | - La sous-commande à exécuter ('info', 'team', 'wash'). |
| `args.users` | `string` | - Les utilisateurs pour la sous-commande 'team'. |

**Returns:** `Promise<string|EmbedBuilder>` - réponse de la sous-commande.

Affiche les informations sur toutes les équipes inscrites sur le serveur.

**Returns:** `Promise<EmbedBuilder>` - embed contenant la liste des équipes et leurs informations.

Ajoute le rôle de l'équipe de l'auteur de la commande aux utilisateurs mentionnés.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `mention` | `string` | - Une chaîne contenant les mentions des utilisateurs. |

**Returns:** `Promise<string>` - message de confirmation ou d'erreur.

Vérifie si un membre a bien le rôle de l'équipe. Tente de rajouter le rôle si manquant.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `member` | `import('discord.js').GuildMember` | - Le membre à vérifier. |
| `roleteam` | `import('discord.js').Role` | - Le rôle de l'équipe à vérifier. |

**Returns:** `Promise<import('discord.js').GuildMember>` - membre vérifié.

Nettoie tous les salons, rôles et grades de capitaine liés aux équipes sur le serveur. Commande réservée aux administrateurs.

**Returns:** `Promise<string>` - message de confirmation.

