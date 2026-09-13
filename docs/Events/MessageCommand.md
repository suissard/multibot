---
title: MessageCommand
layout: default
---

# `MessageCommand`

> **Description :** Gère les commandes textuelles basées sur un préfixe.

Gère l'événement `messageCreate` pour les commandes textuelles (basées sur un préfixe). Si le message commence par le préfixe du bot, il est transmis au CommandManager pour être traité.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">import('discord.js').Message</span> | - Le message créé. |

