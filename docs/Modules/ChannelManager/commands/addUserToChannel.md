---
title: addUserToChannel
layout: default
---

# `addUserToChannel`

> **Description :** Add a user to a channel

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

| Paramètre | Type | Description | Obligatoire |
| :-------- | :--- | :---------- | :---------- |
| `channel` | <span class="badge badge-type">CHANNEL</span> | The channel to add the users to | <span class="badge badge-required">Requis</span> |
| `user1` | <span class="badge badge-type">USER</span> | The user to add | <span class="badge badge-required">Requis</span> |
| `user2` | <span class="badge badge-type">USER</span> | The user to add | <span class="badge badge-optional">Optionnel</span> |
| `user3` | <span class="badge badge-type">USER</span> | The user to add | <span class="badge badge-optional">Optionnel</span> |

Exécute la commande pour ajouter un ou plusieurs utilisateurs à un salon.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `args` | <span class="badge badge-type">object</span> | - Les arguments de la commande. |
| `args.channel` | <span class="badge badge-type">string</span> | - L'ID du salon. |
| `args.user1` | <span class="badge badge-type">string</span> | - L'ID du premier utilisateur à ajouter. |
| `args.user2` | <span class="badge badge-type">string</span> | - L'ID du deuxième utilisateur à ajouter. |
| `args.user3` | <span class="badge badge-type">string</span> | - L'ID du troisième utilisateur à ajouter. |

**Retour :** <span class="badge badge-type">string</span> - message de confirmation ou d'erreur.

