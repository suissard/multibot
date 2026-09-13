---
title: megarole
layout: default
---

# `megarole`

> **Description :** Ajoute ou supprime en masse un ou plusieurs rôles à tous les membres du serveur.

## Narrative


- Cette commande permet d'ajouter ou de supprimer un ou plusieurs rôles à **tous les membres** du serveur en une seule fois.
- Elle nécessite la permission "Gérer les rôles" (\`ManageRoles\`) pour être utilisée.

- **Arguments :**
    - \`del\` (booléen, requis) : Détermine l'action. \`true\` pour supprimer les rôles, \`false\` pour les ajouter.
    - \`role\` (rôle, optionnel) : Un rôle unique à traiter.
    - \`multipleroles\` (texte, optionnel) : Une chaîne de texte contenant les mentions de plusieurs rôles.

- **Fonctionnement :**
    1. La commande commence par récupérer la liste complète de tous les membres du serveur.
    2. Elle collecte les rôles à traiter à partir des arguments \`role\` et/ou \`multipleroles\`.
    3. En fonction de la valeur de l'argument \`del\`, elle parcourt la liste de **tous les membres** :
        - Si \`del\` est \`true\`, elle tente de **supprimer** les rôles spécifiés à chaque membre.
        - Si \`del\` est \`false\`, elle tente d'**ajouter** les rôles spécifiés à chaque membre.
    4. Une barre de chargement visuelle est affichée pendant l'opération.
    5. Après l'opération, si des erreurs se sont produites (par exemple, permissions insuffisantes pour modifier un membre avec un rôle plus élevé), elles sont listées dans un message.
    6. Un message final confirme que la commande a été exécutée.


## Arguments

| Paramètre | Type | Description | Obligatoire |
| :-------- | :--- | :---------- | :---------- |
| `del` | <span class="badge badge-type">BOOLEAN</span> | True = Supprimer les rôles / False = Ajouter les rôles | <span class="badge badge-required">Requis</span> |
| `role` | <span class="badge badge-type">ROLE</span> | Role à supprimer | <span class="badge badge-optional">Optionnel</span> |
| `multipleroles` | <span class="badge badge-type">STRING</span> | Mettre plusieurs roles à supprimer | <span class="badge badge-optional">Optionnel</span> |

Exécute la commande "megarole". Prépare la liste des rôles et des utilisateurs, puis lance l'opération d'ajout ou de suppression de masse.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `args` | <span class="badge badge-type">object</span> | - Les arguments de la commande. |
| `args.del` | <span class="badge badge-type">boolean</span> | - `true` pour supprimer les rôles, `false` pour les ajouter. |
| `args.role` | <span class="badge badge-type">string</span> | - L'ID d'un rôle unique à traiter. |
| `args.multipleroles` | <span class="badge badge-type">string</span> | - Une chaîne contenant les mentions de plusieurs rôles. |

**Retour :** <span class="badge badge-type">Promise<string></span> - message de confirmation ou d'erreur.

Extrait les ID de rôle à partir d'une chaîne de mentions de rôles.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `string` | <span class="badge badge-type">string</span> | - La chaîne contenant les mentions de rôles. |

**Retour :** <span class="badge badge-type">Promise<Array<string>></span> - tableau d'IDs de rôles.

Ajoute ou supprime en masse une liste de rôles pour une liste d'utilisateurs. Le nom de la fonction est trompeur, car elle gère à la fois l'ajout et la suppression.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `user` | <span class="badge badge-type">import('discord.js').Collection<string, import('discord.js').GuildMember></span> | - La collection des membres du serveur. |
| `role` | <span class="badge badge-type">Array<string></span> | - Un tableau d'IDs de rôles à ajouter ou supprimer. |
| `args` | <span class="badge badge-type">object</span> | - Les arguments de la commande, principalement `args.del` pour déterminer l'action. |

**Retour :** <span class="badge badge-type">Promise<string></span> - message de résumé de l'opération.

