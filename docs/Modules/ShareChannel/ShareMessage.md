---
title: ShareMessage
layout: default
---

# `ShareMessage`

## Class: 

Représente un message qui a été partagé dans un groupe de salons. Contient le message original, des informations extraites, et une liste des messages "cibles" (les copies envoyées dans les autres salons).



**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `message` | `import('discord.js').Message` | - Le message original qui a été partagé. |
| `game` | `string` | - Le jeu associé au groupe de partage. |
| `categorie` | `string` | - La catégorie associée au groupe de partage. |

Recupère via des patterns, les informations contenus dans le message

**Returns:** `Object` - les infos

Ajouter une cible atteinte lors de la diffusion du message

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `message` | `Discord.Message` |  |

Supprime toutes les copies du message partagé dans les salons cibles. Retire également le message du cache anti-spam de l'auteur.

Met à jour le contenu de toutes les copies du message partagé.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `content` | `string` | - Le nouveau contenu du message. |

Verifier les abus de diffusion et stock l'objet message en fonction de l'id de l'auteur initial du message

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `message` | `Discord.Message` |  |

**Returns:** `` - 

