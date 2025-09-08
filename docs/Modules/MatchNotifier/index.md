---
title: index
layout: default
---

# `index`



**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `bot` | `Bot` | - L'instance du bot. |

Initialise le cache pour le notificateur de matchs sur l'objet bot.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `bot` | `Bot` | - L'instance du bot. |

**Returns:** `object` - cache du MatchNotifier.

Ajoute l'identifiant d'un match au cache pour marquer qu'il a été notifié.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `bot` | `Bot` | - L'instance du bot. |
| `matchId` | `string` | - L'identifiant du match. |

Vérifie si un match a déjà été notifié en consultant le cache.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `bot` | `Bot` | - L'instance du bot. |
| `matchId` | `string` | - L'identifiant du match. |

**Returns:** `boolean` - si le match a été notifié, sinon `false`.

Initialise le module MatchNotifier pour un bot. Ce module envoie des notifications pour les matchs à venir via une tâche planifiée (cron).

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `bot` | `Bot` | - L'instance du bot. |

Récupère l'ID du rôle de notification pour une division de compétition spécifique.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `competId` | `string` | - L'ID de la compétition. |
| `divisionName` | `string` | - Le nom de la division. |

**Returns:** `string` - du rôle de notification.

Récupère l'ID du salon de notification pour une compétition spécifique.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `competId` | `string` | - L'ID de la compétition. |

**Returns:** `string` - du salon de notification.

Une fois le bot prêt, ce gestionnaire configure et lance la tâche planifiée pour l'envoi des notifications de match.

