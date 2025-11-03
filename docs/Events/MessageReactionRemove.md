---
title: MessageReactionRemove
layout: default
---

# `MessageReactionRemove`

Gère l'événement `messageReactionRemove`. Transmet l'événement au `EmoteMessageManager` pour qu'il le traite, ce qui permet de gérer les systèmes de rôles par réaction.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `reaction` | `import('discord.js').MessageReaction` | - La réaction qui a été retirée. |
| `user` | `import('discord.js').User` | - L'utilisateur qui a retiré la réaction. |

