---
title: addOlympeDataEvent
layout: default
---

# `addOlympeDataEvent`

> **Description :** Gère l'événement olympeMember pour enrichir le cache du bot.

## Narrative

Cet événement est déclenché lorsqu'un utilisateur Discord est associé à un membre Olympe. Il met à jour le cache local du bot avec les informations de l'utilisateur et de son équipe.

Gère l'événement olympeMember.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `payload` | <span class="badge badge-type">object</span> | - Les données de l'événement. |
| `payload.discordUser` | <span class="badge badge-type">import('discord.js').User</span> | - L'utilisateur Discord. |
| `payload.olympeMember` | <span class="badge badge-type">object</span> | - Les informations du membre Olympe. |
| `payload.team` | <span class="badge badge-type">object</span> | - Les informations de l'équipe. |

