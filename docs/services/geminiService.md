---
title: geminiService
layout: default
---

# `geminiService`

Service pour interagir avec l'API Google Gemini

Formate un message individuel pour l'historique

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `message` | `{role: string, content: string}` |  |

**Returns:** `string` - formaté (ex: "Utilisateur: [il y a 2h] Bonjour")

Formate un message individuel pour l'historique

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `message` | `{role: string, content: string, timeAgo: string}` |  |

**Returns:** `string` - formaté (ex: "Utilisateur [il y a 2h]: Bonjour")

Formate l'historique complet pour le prompt

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `history` | `Array<{role: string, content: string}>` |  |

**Returns:** `string` - formaté en chaîne de caractères

Construit le prompt pour l'API Gemini

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `history` | `Array<{role: string, content: string}>` |  |

**Returns:** `string` - prompt formaté

Génère une suggestion de réponse pour le secrétariat

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `history` | `Array<{role: string, content: string}>` | - Historique des messages |
| `options` | `Object` | - Configuration spécifique (apiKey, model, temperature) |

**Returns:** `Promise<string>` - suggestion de réponse

