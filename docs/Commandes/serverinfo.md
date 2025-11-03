---
title: serverinfo
layout: default
---

# `serverinfo`

Exécute la commande serverinfo. Génère et retourne un embed contenant les informations du serveur actuel.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande (non utilisés ici). |

**Returns:** `Promise<Discord.EmbedBuilder>` - avec les informations du serveur.

Crée et retourne un `EmbedBuilder` avec les informations d'un serveur.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `guild` | `Discord.Guild` | - L'objet Guild du serveur dont il faut extraire les informations. |

**Returns:** `Promise<Discord.EmbedBuilder>` - EmbedBuilder contenant les informations formatées du serveur.

