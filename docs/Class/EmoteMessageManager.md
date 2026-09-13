---
title: EmoteMessageManager
layout: default
---

# `EmoteMessageManager`

Gère les messages à réaction pour l'ensemble des bots.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `bots` | <span class="badge badge-type">import('./BotManager')</span> | - Le gestionnaire de bots. |

Gère un événement d'ajout de réaction pour tous les messages à réaction.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `reaction` | <span class="badge badge-type">import('discord.js').MessageReaction</span> | - La réaction ajoutée. |
| `user` | <span class="badge badge-type">import('discord.js').User</span> | - L'utilisateur qui a réagi. |

Gère un événement de suppression de réaction pour tous les messages à réaction.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `reaction` | <span class="badge badge-type">import('discord.js').MessageReaction</span> | - La réaction retirée. |
| `user` | <span class="badge badge-type">import('discord.js').User</span> | - L'utilisateur dont la réaction a été retirée. |

Charge et initialise tous les messages à réaction depuis la base de données.

Initialise un message à réaction spécifique et l'ajoute au gestionnaire.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `emoteMessage` | <span class="badge badge-type">EmoteMessage</span> | - L'objet EmoteMessage brut de la base de données. |

Crée un nouveau message à réaction dans la base de données et l'initialise.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `body` | <span class="badge badge-type">object</span> | - Les données pour la création du message à réaction. |

Ajoute un message à réaction au gestionnaire.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `id` | <span class="badge badge-type">string</span> | - L'identifiant unique du message (`channelId-messageId`). |
| `value` | <span class="badge badge-type">EmoteMessage</span> | - L'instance de EmoteMessage à ajouter. |

Met à jour un message à réaction existant.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `id` | <span class="badge badge-type">string</span> | - L'identifiant du message à mettre à jour. |
| `value` | <span class="badge badge-type">object</span> | - Les nouvelles données pour le message. |

Récupère un message à réaction par son ID.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `id` | <span class="badge badge-type">string</span> | - L'identifiant du message (`channelId-messageId`). |

**Retour :** <span class="badge badge-type">EmoteMessage</span> - de EmoteMessage.

Récupère tous les messages à réaction gérés.

**Retour :** <span class="badge badge-type">Map<string, EmoteMessage></span> - map de tous les messages à réaction.

