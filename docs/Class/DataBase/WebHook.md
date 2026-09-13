---
title: WebHook
layout: default
---

# `WebHook`

Crée une nouvelle instance de WebHook.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `postURL` | <span class="badge badge-type">string</span> | - L'URL du webhook Discord. |

Récupère les informations sur le webhook.

**Retour :** <span class="badge badge-type">Promise<object></span> - objet contenant les informations du webhook.

Envoie des données brutes au webhook.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `data` | <span class="badge badge-type">object</span> | - Le payload à envoyer au webhook. |

**Retour :** <span class="badge badge-type">Promise<Response></span> - réponse de l'API Discord.

Envoie un message simple au webhook.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `content` | <span class="badge badge-type">string</span> | - Le contenu du message à envoyer. |

**Retour :** <span class="badge badge-type">Promise<Response></span> - réponse de l'API Discord.

Envoie un message "embed" simple au webhook.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `title` | <span class="badge badge-type">string</span> | - Le titre de l'embed. |
| `description` | <span class="badge badge-type">string</span> | - La description de l'embed. |

**Retour :** <span class="badge badge-type">Promise<Response></span> - réponse de l'API Discord.

