---
title: megarole
layout: default
---

# `megarole`

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

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| `del` | `BOOLEAN` | True = Supprimer les rôles / False = Ajouter les rôles | Yes |
| `role` | `ROLE` | Role à supprimer | No |
| `multipleroles` | `STRING` | Mettre plusieurs roles à supprimer | No |

Exécute la commande "megarole". Prépare la liste des rôles et des utilisateurs, puis lance l'opération d'ajout ou de suppression de masse.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.del` | `boolean` | - `true` pour supprimer les rôles, `false` pour les ajouter. |
| `args.role` | `string` | - L'ID d'un rôle unique à traiter. |
| `args.multipleroles` | `string` | - Une chaîne contenant les mentions de plusieurs rôles. |

**Returns:** `Promise<string>` - message de confirmation ou d'erreur.

Extrait les ID de rôle à partir d'une chaîne de mentions de rôles.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `string` | `string` | - La chaîne contenant les mentions de rôles. |

**Returns:** `Promise<Array<string>>` - tableau d'IDs de rôles.

Ajoute ou supprime en masse une liste de rôles pour une liste d'utilisateurs. Le nom de la fonction est trompeur, car elle gère à la fois l'ajout et la suppression.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `user` | `import('discord.js').Collection<string, import('discord.js').GuildMember>` | - La collection des membres du serveur. |
| `role` | `Array<string>` | - Un tableau d'IDs de rôles à ajouter ou supprimer. |
| `args` | `object` | - Les arguments de la commande, principalement `args.del` pour déterminer l'action. |

**Returns:** `Promise<string>` - message de résumé de l'opération.

