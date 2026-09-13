---
title: ShareMessage
layout: default
---

# `ShareMessage`

## Classe : `ShareMessage`

Représente un message qui a été partagé dans un groupe de salons. Contient le message original, des informations extraites, et une liste des messages "cibles" (les copies envoyées dans les autres salons).

### Constructeur `new ShareMessage(message, game, categorie)`

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">import('discord.js').Message</span> | - Le message original qui a été partagé. |
| `game` | <span class="badge badge-type">string</span> | - Le jeu associé au groupe de partage. |
| `categorie` | <span class="badge badge-type">string</span> | - La catégorie associée au groupe de partage. |

### Méthode `extractInfo()`

Recupère via des patterns, les informations contenus dans le message

**Retour :** <span class="badge badge-type">Object</span> - les infos

### Méthode `addTarget(message)`

Ajouter une cible atteinte lors de la diffusion du message

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">Discord.Message</span> |  |

### Méthode `resetTargets()`

Supprime toutes les copies du message partagé dans les salons cibles. Retire également le message du cache anti-spam de l'auteur.

### Méthode `updateTarget(content)`

Met à jour le contenu de toutes les copies du message partagé.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `content` | <span class="badge badge-type">string</span> | - Le nouveau contenu du message. |

### Méthode `checkShareMessage(message)`

Verifier les abus de diffusion et stock l'objet message en fonction de l'id de l'auteur initial du message

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">Discord.Message</span> |  |

**Retour :** <span class="badge badge-type">void</span> - 

