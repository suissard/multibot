---
title: ApiCallQueue
layout: default
---

# `ApiCallQueue`

ApiCallQueue Singleton qui gère une file d'attente pour les appels API. Permet de limiter le nombre d'appels simultanés et d'ajouter un délai entre les appels.



**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `delay` | `number` | - Délai en ms entre le DEBUT des appels. |
| `concurrency` | `number` | - Nombre d'appels simultanés maximum. |

Ajoute un appel à la file d'attente.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `callFn` | `Function` | - Une fonction qui retourne une Promesse (l'appel API). |

**Returns:** `Promise<any>` - promesse qui se résout avec le résultat de l'appel.

Traite la file d'attente. Cette méthode tente de lancer autant de requêtes que possible en respectant la concurrency et le délai.

