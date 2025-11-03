---
title: ShareEvent
layout: default
---

# `ShareEvent`

## Description

Gère les messages envoyés dans les salons partagés.

Evenement permettant de gerer les messages envoyés dans un shareChannel

Gère l'événement `messageCreate` pour les salons partagés. Si le message provient d'un salon qui fait partie d'un groupe de partage, il est transmis au gestionnaire de ce groupe pour être traité.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `message` | `import('discord.js').Message` | - Le message créé. |

