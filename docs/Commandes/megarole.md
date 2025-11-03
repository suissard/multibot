---
title: megarole
layout: default
---

# `megarole`

## Narrative


- Cette commande permet d'ajouter ou de supprimer un ou plusieurs rôles à **tous les membres** du serveur en une seule fois.
- Elle nécessite la permission "Gérer les rôles" (\

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

