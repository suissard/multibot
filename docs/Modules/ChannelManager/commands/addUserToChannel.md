---
title: addUserToChannel
layout: default
---

# `addUserToChannel`

Add a user to a channel

## Narrative


- **ATTENTION : Cette commande est actuellement désactivée (le \`module.exports\` est en commentaire).**
- L'objectif de cette commande est d'ajouter jusqu'à trois utilisateurs à un salon spécifique.
- Elle nécessite la permission "Gérer les salons" (\`ManageChannels\`).

- **Fonctionnement :**
    1.  La commande prend en argument un salon cible (\`channel\`) et au moins un utilisateur (\`user1\`). Deux autres utilisateurs (\`user2\`, \`user3\`) sont optionnels.
    2.  Elle identifie le salon sur le serveur.
    3.  Elle parcourt la liste des utilisateurs fournis en argument.
    4.  Pour chaque utilisateur, elle appelle la fonction \`addUserToChannel\` du service Discord. Cette fonction est responsable de modifier les permissions du salon pour y ajouter l'utilisateur.
    5.  Une fois tous les utilisateurs traités, elle renvoie un message de confirmation.


## Arguments

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| `channel` | `CHANNEL` | The channel to add the users to | Yes |
| `user1` | `USER` | The user to add | Yes |
| `user2` | `USER` | The user to add | No |
| `user3` | `USER` | The user to add | No |

Exécute la commande pour ajouter un ou plusieurs utilisateurs à un salon.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.channel` | `string` | - L'ID du salon. |
| `args.user1` | `string` | - L'ID du premier utilisateur à ajouter. |
| `args.user2` | `string` | - L'ID du deuxième utilisateur à ajouter. |
| `args.user3` | `string` | - L'ID du troisième utilisateur à ajouter. |

**Returns:** `string` - message de confirmation ou d'erreur.

