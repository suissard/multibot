---
title: NewGuildMember
layout: default
---

# `NewGuildMember`

> **Description :** Déclenche l'attribution de rôles automatique pour un nouveau membre.

## Narrative

Cet événement écoute l'événement \`guildMemberAdd\` et, lorsqu'un nouveau membre rejoint le serveur, il déclenche le processus d'attribution de rôles automatique pour cet utilisateur.

Gère l'événement d'arrivée d'un nouveau membre sur le serveur. Déclenche le processus d'attribution de rôles automatique pour ce nouveau membre.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `member` | <span class="badge badge-type">import('discord.js').GuildMember</span> | - Le membre qui vient de rejoindre. |

