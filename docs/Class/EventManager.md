---
title: EventManager
layout: default
---

# `EventManager`

### Constructeur `new EventManager(bots)`

Gère l'enregistrement et l'attachement des événements pour les bots.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `bots` | <span class="badge badge-type">import('./BotManager')</span> | - Le gestionnaire de bots. |

### Méthode `add(id, value)`

Ajoute un nouvel événement à la collection.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `id` | <span class="badge badge-type">string</span> | - L'identifiant unique de l'événement. |
| `value` | <span class="badge badge-type">Event</span> | - La classe de l'événement à ajouter. |

**Erreur :** <span class="badge badge-required">Error</span> - un événement avec le même ID existe déjà.

### Méthode `get(id)`

Récupère un événement par son ID.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `id` | <span class="badge badge-type">string</span> | - L'identifiant de l'événement. |

**Retour :** <span class="badge badge-type">Event</span> - classe de l'événement correspondante.

### Méthode `setEvent(path)`

Charge une classe d'événement depuis un fichier et l'ajoute au gestionnaire.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `path` | <span class="badge badge-type">string</span> | - Le chemin vers le fichier de l'événement. |

### Méthode `getAll()`

Récupère tous les événements enregistrés.

**Retour :** <span class="badge badge-type">Map<string, Event></span> - map de tous les événements.

### Méthode `setAllEvents()`

Charge tous les événements depuis le dossier `Events` et les ajoute au gestionnaire.

### Méthode `createListener(event, bot)`

Crée et attache un écouteur d'événement pour un bot spécifique.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `event` | <span class="badge badge-type">Event</span> | - La classe de l'événement. |
| `bot` | <span class="badge badge-type">Bot</span> | - L'instance du bot à laquelle attacher l'écouteur. |

### Méthode `createAllListener(bot)`

Crée et attache tous les écouteurs d'événements enregistrés pour un bot spécifique. Ignore les événements non autorisés pour ce bot.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `bot` | <span class="badge badge-type">Bot</span> | - L'instance du bot. |

### Méthode `createAllListenerForAllBot()`

Crée et attache tous les écouteurs d'événements pour tous les bots gérés.

### Méthode `addListenerForAllBot(event)`

Ajoute un événement et attache son écouteur à tous les bots gérés.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `event` | <span class="badge badge-type">Event</span> | - La classe de l'événement à ajouter et attacher. |

### Méthode `prependListenerForAllBot(event)`

Ajoute un événement et attache son écouteur au début de la liste pour tous les bots gérés.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `event` | <span class="badge badge-type">Event</span> | - La classe de l'événement à ajouter et attacher. |

