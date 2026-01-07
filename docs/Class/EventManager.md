---
title: EventManager
layout: default
---

# `EventManager`

Gère l'enregistrement et l'attachement des événements pour les bots.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `bots` | `import('./BotManager')` | - Le gestionnaire de bots. |

Ajoute un nouvel événement à la collection.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `id` | `string` | - L'identifiant unique de l'événement. |
| `value` | `Event` | - La classe de l'événement à ajouter. |

Récupère un événement par son ID.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `id` | `string` | - L'identifiant de l'événement. |

**Returns:** `Event` - classe de l'événement correspondante.

Charge une classe d'événement depuis un fichier et l'ajoute au gestionnaire.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `path` | `string` | - Le chemin vers le fichier de l'événement. |

Récupère tous les événements enregistrés.

**Returns:** `Map<string, Event>` - map de tous les événements.

Charge tous les événements depuis le dossier `Events` et les ajoute au gestionnaire.

Crée et attache un écouteur d'événement pour un bot spécifique.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `event` | `Event` | - La classe de l'événement. |
| `bot` | `Bot` | - L'instance du bot à laquelle attacher l'écouteur. |

Crée et attache tous les écouteurs d'événements enregistrés pour un bot spécifique. Ignore les événements non autorisés pour ce bot.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `bot` | `Bot` | - L'instance du bot. |

Crée et attache tous les écouteurs d'événements pour tous les bots gérés.

Ajoute un événement et attache son écouteur à tous les bots gérés.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `event` | `Event` | - La classe de l'événement à ajouter et attacher. |

Ajoute un événement et attache son écouteur au début de la liste pour tous les bots gérés.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `event` | `Event` | - La classe de l'événement à ajouter et attacher. |

