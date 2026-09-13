---
title: index
layout: default
---

# `index`

Enregistre une liste de routes sur l'instance de l'API.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `api` | <span class="badge badge-type">import('../Api')</span> | - L'instance de l'API. |
| `routesArg` | <span class="badge badge-type">Array<{path: string, method: string, handler: function}></span> | - Un tableau d'objets de route à enregistrer. Si non fourni, utilise les routes importées par défaut. |

