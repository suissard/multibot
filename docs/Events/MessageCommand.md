---
title: MessageCommand
layout: default
---

# `MessageCommand`

Gère l'événement `messageCreate` pour les commandes textuelles (basées sur un préfixe). Si le message commence par le préfixe du bot, il est transmis au CommandManager pour être traité.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `message` | `import('discord.js').Message` | - Le message créé. |

