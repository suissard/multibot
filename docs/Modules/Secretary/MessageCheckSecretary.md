---
title: MessageCheckSecretary
layout: default
---

# `MessageCheckSecretary`

> **Description :** Détecte et route les messages liés au secrétariat.

Gère l'événement `messageCreate` pour détecter les messages liés au secrétariat. Si un message est un DM (et n'est pas une commande), il est routé vers le gestionnaire du secrétariat. Si un message est dans un salon de secrétariat, il est également routé.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">import('discord.js').Message</span> | - Le message créé. |

