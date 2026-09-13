---
title: EmoteMessageManager
layout: default
---

# `EmoteMessageManager`

### Constructeur `new EmoteMessageManager(bots)`

Gère les messages à réaction pour l'ensemble des bots.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `bots` | <span class="badge badge-type">import('./BotManager')</span> | - Le gestionnaire de bots. |

### Méthode `handleMessageReactionAdd(reaction, user)`

Gère un événement d'ajout de réaction pour tous les messages à réaction.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `reaction` | <span class="badge badge-type">import('discord.js').MessageReaction</span> | - La réaction ajoutée. |
| `user` | <span class="badge badge-type">import('discord.js').User</span> | - L'utilisateur qui a réagi. |

### Méthode `handleMessageReactionRemove(reaction, user)`

Gère un événement de suppression de réaction pour tous les messages à réaction.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `reaction` | <span class="badge badge-type">import('discord.js').MessageReaction</span> | - La réaction retirée. |
| `user` | <span class="badge badge-type">import('discord.js').User</span> | - L'utilisateur dont la réaction a été retirée. |

### Méthode `setAllEmoteMessages()`

Charge et initialise tous les messages à réaction depuis la base de données.

### Méthode `setEmoteMessage(emoteMessage)`

Initialise un message à réaction spécifique et l'ajoute au gestionnaire.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `emoteMessage` | <span class="badge badge-type">EmoteMessage</span> | - L'objet EmoteMessage brut de la base de données. |

### Méthode `create(body)`

Crée un nouveau message à réaction dans la base de données et l'initialise.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `body` | <span class="badge badge-type">object</span> | - Les données pour la création du message à réaction. |

### Méthode `add(id, value)`

Ajoute un message à réaction au gestionnaire.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `id` | <span class="badge badge-type">string</span> | - L'identifiant unique du message (`channelId-messageId`). |
| `value` | <span class="badge badge-type">EmoteMessage</span> | - L'instance de EmoteMessage à ajouter. |

### Méthode `update(id, value)`

Met à jour un message à réaction existant.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `id` | <span class="badge badge-type">string</span> | - L'identifiant du message à mettre à jour. |
| `value` | <span class="badge badge-type">object</span> | - Les nouvelles données pour le message. |

**Erreur :** <span class="badge badge-required">Error</span> - le message n'existe pas.

### Méthode `get(id)`

Récupère un message à réaction par son ID.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `id` | <span class="badge badge-type">string</span> | - L'identifiant du message (`channelId-messageId`). |

**Retour :** <span class="badge badge-type">EmoteMessage</span> - de EmoteMessage.

### Méthode `getAll()`

Récupère tous les messages à réaction gérés.

**Retour :** <span class="badge badge-type">Map<string, EmoteMessage></span> - map de tous les messages à réaction.

