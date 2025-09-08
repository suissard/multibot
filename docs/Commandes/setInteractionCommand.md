---
title: setInteractionCommand
layout: default
---

# `setInteractionCommand`

Exécute la commande pour (re)créer manuellement une commande slash. Cherche une commande par son nom dans le CommandManager et appelle sa méthode `createSlashCommand` pour l'enregistrer ou la mettre à jour auprès de l'API Discord.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande. |
| `args.commandename` | `string` | - Le nom de la commande slash à créer. |

**Returns:** `Promise<string>` - message de confirmation ou d'erreur.

