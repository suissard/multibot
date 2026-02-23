---
title: addOlympeDataEvent
layout: default
---

# `addOlympeDataEvent`

## Narrative

Cet événement est déclenché lorsqu'un utilisateur Discord est associé à un membre Olympe. Il met à jour le cache local du bot avec les informations de l'utilisateur et de son équipe.

Gère l'événement olympeMember.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `payload` | `object` | - Les données de l'événement. |
| `payload.discordUser` | `import('discord.js').User` | - L'utilisateur Discord. |
| `payload.olympeMember` | `object` | - Les informations du membre Olympe. |
| `payload.team` | `object` | - Les informations de l'équipe. |

