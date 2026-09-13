---
title: ShareEventDelete
layout: default
---

# `ShareEventDelete`

> **Description :** Gère la suppression de messages dans les salons partagés.

Evenement permettant de gerer les messages supprimé dans un shareChannel

Gère l'événement `messageDelete` pour les salons partagés. Si un message partagé est supprimé, cette fonction supprime toutes les copies du message dans les autres salons.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">import('discord.js').Message</span> | - Le message qui a été supprimé. |

