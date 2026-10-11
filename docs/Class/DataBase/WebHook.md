---
title: WebHook
layout: default
---

# `WebHook`

> **Classe :** `WebHook`

### Constructeur `new WebHook(postURL)`

Crée une nouvelle instance de WebHook.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `postURL` | <span class="badge badge-type">string</span> | - L'URL du webhook Discord. |

### Méthode `getInfo()`

Récupère les informations sur le webhook.

**Retour :** <span class="badge badge-type">Promise&lt;object&gt;</span> - objet contenant les informations du webhook.

### Méthode `send(data)`

Envoie des données brutes au webhook.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `data` | <span class="badge badge-type">object</span> | - Le payload à envoyer au webhook. |

**Retour :** <span class="badge badge-type">Promise&lt;Response&gt;</span> - réponse de l'API Discord.

### Méthode `sendMessage(content)`

Envoie un message simple au webhook.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `content` | <span class="badge badge-type">string</span> | - Le contenu du message à envoyer. |

**Retour :** <span class="badge badge-type">Promise&lt;Response&gt;</span> - réponse de l'API Discord.

### Méthode `sendEmbed(title, description)`

Envoie un message "embed" simple au webhook.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `title` | <span class="badge badge-type">string</span> | - Le titre de l'embed. |
| `description` | <span class="badge badge-type">string</span> | - La description de l'embed. |

**Retour :** <span class="badge badge-type">Promise&lt;Response&gt;</span> - réponse de l'API Discord.

