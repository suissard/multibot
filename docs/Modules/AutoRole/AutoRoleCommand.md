---
title: AutoRoleCommand
layout: default
---

# `AutoRoleCommand`

## Narrative


- Cette commande permet de lancer manuellement le processus d'attribution automatique des rôles liés à la compétition Olympe.
- Elle offre trois modes de fonctionnement :

- **1. Mode général (aucun argument) :**
    - Si aucun argument n'est fourni, la commande lance la fonction \`autoRole()\` pour l'ensemble du serveur.
    - Cette fonction va probablement scanner tous les membres et mettre à jour leurs rôles en fonction des données de la compétition.
    - Elle renvoie un message immédiat indiquant que le processus est en cours, puis un message de confirmation une fois terminé.

- **2. Mode par utilisateur (\`user\`) :**
    - Si un utilisateur est mentionné, la commande exécute \`processFromDiscordUserId()\` pour cet utilisateur spécifique.
    - Elle met à jour les rôles uniquement pour cet utilisateur.
    - Si l'utilisateur n'est pas trouvé dans les données de la compétition, un message d'erreur est renvoyé.

- **3. Mode par équipe (\`teamid\`) :**
    - Si un ID d'équipe Olympe est fourni, la commande exécute \`processFromOlympeTeamId()\`.
    - Elle met à jour les rôles pour tous les membres de cette équipe spécifique.
    - Si l'équipe n'est pas trouvée, un message d'erreur est renvoyé.


## Arguments

| Paramètre | Type | Description | Obligatoire |
| :-------- | :--- | :---------- | :---------- |
| `user` | <span class="badge badge-type">USER</span> | Utilisateur a mettre a jour | <span class="badge badge-optional">Optionnel</span> |
| `teamid` | <span class="badge badge-type">STRING</span> | Identifiant de team a mettre a jour | <span class="badge badge-optional">Optionnel</span> |

Exécute la commande d'attribution manuelle des rôles. Peut être déclenchée pour tous les utilisateurs, un utilisateur spécifique ou une équipe spécifique.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `args` | <span class="badge badge-type">object</span> | - Les arguments de la commande. |
| `args.user` | <span class="badge badge-type">string</span> | - L'ID de l'utilisateur Discord à mettre à jour. |
| `args.teamid` | <span class="badge badge-type">string</span> | - L'ID de l'équipe Olympe à mettre à jour. |

**Retour :** <span class="badge badge-type">Promise<string></span> - message indiquant que le processus est en cours.

