---
title: memberlist
layout: default
---

# `memberlist`

> **Description :** Renvoie la liste des utilisateurs qui ont le rôle mentiionné

## Narrative


- Cette commande permet d'obtenir la liste de tous les membres d'un serveur qui possèdent un rôle spécifique.
- Elle nécessite la permission "Gérer les rôles" (\`ManageRoles\`) pour être utilisée.
- L'utilisateur doit fournir un rôle en argument.

- **Fonctionnement :**
    1. La commande récupère d'abord la liste complète des membres du serveur pour s'assurer que les données sont à jour.
    2. Elle identifie le rôle spécifié par l'utilisateur.
    3. Elle parcourt ensuite la liste de tous les membres qui possèdent ce rôle.
    4. Elle construit une chaîne de caractères qui mentionne chaque membre trouvé.
    5. Finalement, elle génère et envoie un message "embed" qui contient :
        - Un titre indiquant le nombre total de membres trouvés et le nom du rôle.
        - La liste des mentions de tous les membres concernés.
    6. Si aucun membre ne possède le rôle, elle renvoie simplement un message l'indiquant.


## Arguments

| Paramètre | Type | Description | Obligatoire |
| :-------- | :--- | :---------- | :---------- |
| `role` | <span class="badge badge-type">ROLE</span> | Role dont on doit renvoyer les membres | <span class="badge badge-required">Requis</span> |

Exécute la commande pour lister les membres ayant un rôle spécifique. Récupère les membres, formate la liste et la renvoie dans un embed.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `args` | <span class="badge badge-type">object</span> | - Les arguments de la commande. |
| `args.role` | <span class="badge badge-type">string</span> | - L'ID du rôle dont les membres doivent être listés. |

**Retour :** <span class="badge badge-type">Promise<import('discord.js').EmbedBuilder|string></span> - embed contenant la liste des membres, ou un message si personne n'a le rôle.

