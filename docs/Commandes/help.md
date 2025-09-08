---
title: help
layout: default
---

# `help`

Construit et retourne une liste de noms de commandes à afficher. Filtre les commandes qui ne sont pas censées être affichées dans l'aide, sauf pour les développeurs.

**Returns:** `Array<string>` - tableau trié des noms de commandes.

Crée un ou plusieurs `EmbedBuilder` à partir d'une liste de noms de commandes. Sépare les commandes en plusieurs embeds si la liste dépasse 20 champs.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `arrayHelp` | `Array<string>` | - Un tableau contenant les noms des commandes à afficher. |

**Returns:** `Array<Discord.EmbedBuilder>` - tableau d'objets EmbedBuilder prêts à être envoyés.

Crée un `EmbedBuilder` pour afficher l'aide détaillée d'une commande spécifique.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `command` | `string` | - Le nom de la commande pour laquelle afficher les détails. |

**Returns:** `Discord.EmbedBuilder` - objet EmbedBuilder avec les détails de la commande.

Exécute la commande d'aide. Affiche l'aide détaillée si un nom de commande est fourni, sinon affiche la liste de toutes les commandes.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `options` | `object` | - Les options de l'interaction (non utilisé ici, semble basé sur un ancien système d'args). |

