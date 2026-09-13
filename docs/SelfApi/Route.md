---
title: Route
layout: default
---

# `Route`

## Classe : ``

Représente une route de l'API. L'instanciation de cette classe enregistre automatiquement la route auprès de l'API.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `api` | <span class="badge badge-type">import('./Api')</span> | - L'instance de l'API sur laquelle enregistrer la route. |
| `path` | <span class="badge badge-type">string</span> | - Le chemin de la route (ex: '/commands'). |
| `method` | <span class="badge badge-type">'get'|'post'|'put'|'delete'</span> | - La méthode HTTP. |
| `handler` | <span class="badge badge-type">function</span> | - La fonction de gestion de la route. |
| `options` | <span class="badge badge-type">object</span> | - Options supplémentaires pour la route (ex: { auth: false }). |

