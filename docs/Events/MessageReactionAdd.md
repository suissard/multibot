---
title: MessageReactionAdd
layout: default
---

# `MessageReactionAdd`

Gère l\'ajout de réactions pour les rôles par réaction.

Gère l'événement `messageReactionAdd`. Transmet l'événement au `EmoteMessageManager` pour qu'il le traite, ce qui permet de gérer les systèmes de rôles par réaction.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `reaction` | `import('discord.js').MessageReaction` | - La réaction qui a été ajoutée. |
| `user` | `import('discord.js').User` | - L'utilisateur qui a ajouté la réaction. |

