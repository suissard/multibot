---
title: MessageReactionAdd
layout: default
---

# `MessageReactionAdd`

> **Description :** Gère l'ajout de réactions pour les rôles par réaction.

Gère l'événement `messageReactionAdd`. Transmet l'événement au `EmoteMessageManager` pour qu'il le traite, ce qui permet de gérer les systèmes de rôles par réaction.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `reaction` | <span class="badge badge-type">import('discord.js').MessageReaction</span> | - La réaction qui a été ajoutée. |
| `user` | <span class="badge badge-type">import('discord.js').User</span> | - L'utilisateur qui a ajouté la réaction. |

