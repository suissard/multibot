---
title: ShareEventUpdate
layout: default
---

# `ShareEventUpdate`

> **Description :** Gère la mise à jour de messages dans les salons partagés.

Evenement permettant de gerer les messages mis a jour dans un shareChannel

Gère l'événement `messageUpdate` pour les salons partagés. Si un message partagé est mis à jour, cette fonction propage la mise à jour à toutes les copies du message dans les autres salons.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `oldMessage` | <span class="badge badge-type">import('discord.js').Message</span> | - L'ancien message. |
| `newMessage` | <span class="badge badge-type">import('discord.js').Message</span> | - Le nouveau message. |

