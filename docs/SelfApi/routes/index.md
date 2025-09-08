---
title: index
layout: default
---

# `index`

Enregistre une liste de routes sur l'instance de l'API.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `api` | `import('../Api')` | - L'instance de l'API. |
| `routesArg` | `Array<{path: string, method: string, handler: function}>` | - Un tableau d'objets de route à enregistrer. Si non fourni, utilise les routes importées par défaut. |

