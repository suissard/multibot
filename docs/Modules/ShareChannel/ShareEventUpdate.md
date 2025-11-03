---
title: ShareEventUpdate
layout: default
---

# `ShareEventUpdate`

Gère la mise à jour de messages dans les salons partagés.

Evenement permettant de gerer les messages mis a jour dans un shareChannel

Gère l'événement `messageUpdate` pour les salons partagés. Si un message partagé est mis à jour, cette fonction propage la mise à jour à toutes les copies du message dans les autres salons.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `oldMessage` | `import('discord.js').Message` | - L'ancien message. |
| `newMessage` | `import('discord.js').Message` | - Le nouveau message. |

