---
title: event
layout: default
---

# `event`

## Narrative


- Cette commande sert de point d'entrée pour plusieurs sous-commandes liées à la gestion d'événements.
- L'argument 'texte' détermine quelle action effectuer : 'info', 'team', ou 'wash'.

- **Sous-commande 'info' :**
    - Scanne tous les salons du serveur pour trouver ceux dont le nom correspond au format "Team [...]".
    - Pour chaque salon trouvé, récupère les informations de l'équipe correspondante depuis la base de données.
    - Génère et affiche un message "embed" qui liste toutes les équipes trouvées avec leurs détails (capitaine, nom en jeu, rang).
    - S'il n'y a aucune équipe, l'embed l'indique.

- **Sous-commande 'team' :**
    - Permet à un capitaine d'équipe d'ajouter le rôle de son équipe à d'autres membres.
    - L'argument 'users' doit contenir les mentions des utilisateurs à qui ajouter le rôle.
    - La commande identifie le rôle de l'équipe de l'auteur de la commande (le capitaine).
    - Elle applique ensuite ce rôle à tous les utilisateurs mentionnés.
    - Des vérifications sont en place pour s'assurer que le capitaine a bien un seul rôle d'équipe.

- **Sous-commande 'wash' :**
    - **Action réservée aux administrateurs.**
    - Effectue un nettoyage complet de tous les éléments liés aux équipes sur le serveur.
    - Supprime tous les salons de texte dont le nom correspond à "Team [...]".
    - Retire le rôle "Capitaine" de tous les membres qui le possèdent.
    - Supprime tous les rôles dont le nom correspond à "Team [...]".
    - Envoie des messages de confirmation pour chaque type d'élément nettoyé.


## Arguments

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| `texte` | `STRING` | info = tableau des teams, team = ajout de rôle team | Yes |
| `users` | `STRING` | user aux quels il faut ajouter le rôle de team | No |

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

