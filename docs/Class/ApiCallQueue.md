---
title: ApiCallQueue
layout: default
---

# `ApiCallQueue`

## Classe : `ApiCallQueue`

ApiCallQueue Singleton qui gère une file d'attente pour les appels API. Permet de limiter le nombre d'appels simultanés et d'ajouter un délai entre les appels.

### Constructeur `new ApiCallQueue(delay = 300, concurrency = 1)`

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `delay` | <span class="badge badge-type">number</span> | - Délai en ms entre le DEBUT des appels. |
| `concurrency` | <span class="badge badge-type">number</span> | - Nombre d'appels simultanés maximum. |

### Méthode `add(callFn)`

Ajoute un appel à la file d'attente.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `callFn` | <span class="badge badge-type">Function</span> | - Une fonction qui retourne une Promesse (l'appel API). |

**Retour :** <span class="badge badge-type">Promise<any></span> - promesse qui se résout avec le résultat de l'appel.

### Méthode `process()`

Traite la file d'attente. Cette méthode tente de lancer autant de requêtes que possible en respectant la concurrency et le délai.

