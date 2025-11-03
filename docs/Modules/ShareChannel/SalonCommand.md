---
title: SalonCommand
layout: default
---

# `SalonCommand`

## Description

Définit un salon partagée de recherche de joueur ou le supprime

## Narrative


- Cette commande permet de désigner le salon actuel comme faisant partie d'un "groupe de partage".
- Un groupe de partage est défini par un jeu et une catégorie (par exemple, "overwatch-scrim"). Tous les messages postés dans un salon d'un groupe sont répliqués dans tous les autres salons du même groupe, même s'ils sont sur des serveurs différents.
- Elle nécessite la permission "Gérer les salons" (\

Commande de gestion des shareChannel

Exécute la commande pour ajouter le salon actuel à un groupe de partage. Valide les arguments de jeu et de catégorie avant de procéder à l'ajout.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.game` | `string` | - Le nom du jeu pour ce groupe de partage. |
| `args.catégorie` | `string` | - Le nom de la catégorie pour ce groupe. |

**Returns:** `Promise<string>` - message de confirmation ou d'erreur.

Ajoute le salon actuel au groupe de partage spécifié.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `categorie` | `string` | - La catégorie du groupe de partage. |
| `game` | `string` | - Le jeu du groupe de partage. |

**Returns:** `Promise<string>` - message de confirmation.

