---
title: Route
layout: default
---

# `Route`

## Class: 

Représente une route de l'API. L'instanciation de cette classe enregistre automatiquement la route auprès de l'API.



**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `api` | `import('./Api')` | - L'instance de l'API sur laquelle enregistrer la route. |
| `path` | `string` | - Le chemin de la route (ex: '/commands'). |
| `method` | `'get'|'post'|'put'|'delete'` | - La méthode HTTP. |
| `handler` | `function` | - La fonction de gestion de la route. |
| `options` | `object` | - Options supplémentaires pour la route (ex: { auth: false }). |

