---
title: memberlist
layout: default
---

# `memberlist`

## Description

Renvoie la liste des utilisateurs qui ont le rôle mentiionné

## Narrative


- Cette commande permet d'obtenir la liste de tous les membres d'un serveur qui possèdent un rôle spécifique.
- Elle nécessite la permission "Gérer les rôles" (\

Exécute la commande pour lister les membres ayant un rôle spécifique. Récupère les membres, formate la liste et la renvoie dans un embed.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.role` | `string` | - L'ID du rôle dont les membres doivent être listés. |

**Returns:** `Promise<import('discord.js').EmbedBuilder|string>` - embed contenant la liste des membres, ou un message si personne n'a le rôle.

