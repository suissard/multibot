---
title: SalonCommand
layout: default
---

# `SalonCommand`

## Description

Définit un salon partagée de recherche de joueur ou le supprime

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

