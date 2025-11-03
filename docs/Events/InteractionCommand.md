---
title: InteractionCommand
layout: default
---

# `InteractionCommand`

## Description

Gère les interactions de commande slash.

Gère l'événement `interactionCreate` pour les commandes slash. Si l'interaction est une commande, elle est transmise au CommandManager pour être traitée.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `interaction` | `import('discord.js').Interaction` | - L'interaction reçue. |

