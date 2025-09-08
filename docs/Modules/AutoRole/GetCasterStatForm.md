---
title: GetCasterStatForm
layout: default
---

# `GetCasterStatForm`

Génère une URL pré-remplie pour le formulaire de statistiques de caster.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `match` | `object` | - L'objet contenant les données du match, provenant de l'API Olympe. |
| `castNbr` | `number` | - Le numéro du caster (1 ou 2) pour lequel générer le formulaire. |

**Returns:** `string` - personnalisée et pré-remplie du formulaire.

Exécute la commande pour envoyer un formulaire de statistiques de caster. Récupère les données du match, génère une URL de formulaire pré-remplie et l'envoie en message privé à l'utilisateur concerné.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.matchid` | `string` | - L'ID du match pour lequel déclarer les statistiques. |
| `args.user` | `string` | - L'ID de l'utilisateur à qui envoyer le formulaire. |
| `args.castnbr` | `string` | - Le numéro du caster (1 ou 2). |

**Returns:** `Promise<string>` - message de confirmation ou d'erreur.

