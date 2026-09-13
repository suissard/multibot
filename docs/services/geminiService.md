---
title: geminiService
layout: default
---

# `geminiService`

> **Classe :** `GeminiService`

## Classe : `GeminiService`

Service pour interagir avec l'API Google Gemini

### Méthode `formatMessage(message)`

Formate un message individuel pour l'historique

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">{role: string, content: string}</span> |  |

**Retour :** <span class="badge badge-type">string</span> - formaté (ex: "Utilisateur: [il y a 2h] Bonjour")

### Méthode `formatMessage(message)`

Formate un message individuel pour l'historique

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">{role: string, content: string, timeAgo: string}</span> |  |

**Retour :** <span class="badge badge-type">string</span> - formaté (ex: "Utilisateur [il y a 2h]: Bonjour")

### Méthode `formatHistory(history)`

Formate l'historique complet pour le prompt

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `history` | <span class="badge badge-type">Array<{role: string, content: string}></span> |  |

**Retour :** <span class="badge badge-type">string</span> - formaté en chaîne de caractères

### Méthode `constructPrompt(history)`

Construit le prompt pour l'API Gemini

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `history` | <span class="badge badge-type">Array<{role: string, content: string}></span> |  |

**Retour :** <span class="badge badge-type">string</span> - prompt formaté

### Méthode `generateResponse(history, options = {})`

Génère une suggestion de réponse pour le secrétariat

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `history` | <span class="badge badge-type">Array<{role: string, content: string}></span> | - Historique des messages |
| `options` | <span class="badge badge-type">Object</span> | - Configuration spécifique (apiKey, model, temperature) |

**Retour :** <span class="badge badge-type">Promise<string></span> - suggestion de réponse

