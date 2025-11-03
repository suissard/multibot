---
title: NewGuildMember
layout: default
---

# `NewGuildMember`

## Narrative

Cet événement écoute l'événement \`guildMemberAdd\` et, lorsqu'un nouveau membre rejoint le serveur, il déclenche le processus d'attribution de rôles automatique pour cet utilisateur.

Gère l'événement d'arrivée d'un nouveau membre sur le serveur. Déclenche le processus d'attribution de rôles automatique pour ce nouveau membre.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `member` | `import('discord.js').GuildMember` | - Le membre qui vient de rejoindre. |

