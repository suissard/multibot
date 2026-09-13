---
title: ShareEvent
layout: default
---

# `ShareEvent`

> **Classe :** `ShareEvent` (hérite de `Event`)

> **Identifiant :** `shareEvent`

> **Description :** Gère les messages envoyés dans les salons partagés.

## Classe : `ShareEvent`

Evenement permettant de gerer les messages envoyés dans un shareChannel

### Méthode `handleEvent(message)`

Gère l'événement `messageCreate` pour les salons partagés. Si le message provient d'un salon qui fait partie d'un groupe de partage, il est transmis au gestionnaire de ce groupe pour être traité.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">import('discord.js').Message</span> | - Le message créé. |

