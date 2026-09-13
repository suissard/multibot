---
title: MessageReactionRemove
layout: default
---

# `MessageReactionRemove`

> **Description :** Gère le retrait de réactions pour les rôles par réaction.

Gère l'événement `messageReactionRemove`. Transmet l'événement au `EmoteMessageManager` pour qu'il le traite, ce qui permet de gérer les systèmes de rôles par réaction.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `reaction` | <span class="badge badge-type">import('discord.js').MessageReaction</span> | - La réaction qui a été retirée. |
| `user` | <span class="badge badge-type">import('discord.js').User</span> | - L'utilisateur qui a retiré la réaction. |

