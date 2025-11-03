---
title: removeUserFromChannel
layout: default
---

# `removeUserFromChannel`

Remove a user from a channel

## Narrative


- **ATTENTION : Cette commande est actuellement désactivée (le \`module.exports\` est en commentaire).**
- L'objectif de cette commande est de retirer l'accès à un salon spécifique pour un à trois utilisateurs.
- Elle nécessite la permission "Gérer les salons" (\`ManageChannels\`).

- **Fonctionnement :**
    1.  La commande prend en argument un nom de salon (\`channel\`) et au moins un utilisateur (\`user1\`).
    2.  Elle recherche le salon sur le serveur en se basant sur son **nom**, ce qui peut être source d'erreurs si plusieurs salons ont le même nom.
    3.  Elle parcourt la liste des utilisateurs fournis en argument.
    4.  Pour chaque utilisateur, elle appelle la fonction \`removeUserFromChannel\` du service Discord, qui supprime les permissions spécifiques de l'utilisateur sur ce salon, lui en retirant de fait l'accès.
    5.  Une fois tous les utilisateurs traités, elle renvoie un message de confirmation.


## Arguments

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| `channel` | `CHANNEL` | The channel to remove the users from | Yes |
| `user1` | `USER` | The user to remove | Yes |
| `user2` | `USER` | The user to remove | No |
| `user3` | `USER` | The user to remove | No |

Exécute la commande pour retirer un ou plusieurs utilisateurs d'un salon.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.channel` | `string` | - Le nom du salon. |
| `args.user1` | `string` | - L'ID du premier utilisateur à retirer. |
| `args.user2` | `string` | - L'ID du deuxième utilisateur à retirer. |
| `args.user3` | `string` | - L'ID du troisième utilisateur à retirer. |

**Returns:** `string` - message de confirmation ou d'erreur.

