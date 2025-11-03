---
title: ShareEventDelete
layout: default
---

# `ShareEventDelete`

## Description

Gère la suppression de messages dans les salons partagés.

Evenement permettant de gerer les messages supprimé dans un shareChannel

Gère l'événement `messageDelete` pour les salons partagés. Si un message partagé est supprimé, cette fonction supprime toutes les copies du message dans les autres salons.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `message` | `import('discord.js').Message` | - Le message qui a été supprimé. |

