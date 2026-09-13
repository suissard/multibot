---
title: EmoteMessage
layout: default
---

# `EmoteMessage`

Représente un message sur Discord qui attribue des rôles en fonction des réactions des utilisateurs. Étend StrapiObject pour interagir avec une base de données Strapi.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `id` | <span class="badge badge-type">string|number</span> | - L'ID de l'objet Strapi. |
| `type` | <span class="badge badge-type">string</span> | - Le type de l'objet Strapi. |
| `data` | <span class="badge badge-type">object</span> | - Les données de l'objet. |
| `collection` | <span class="badge badge-type">import('suissard-strapi-client').StrapiCollection</span> | - La collection Strapi à laquelle cet objet appartient. |
| `bots` | <span class="badge badge-type">import('./BotManager')</span> | - Le gestionnaire de bots pour accéder aux instances de bot. |

Initialise le message à réaction. Vérifie que le bot a accès au serveur, au salon et au message, et que les rôles sont accessibles. Ajoute les réactions initiales au message.

**Retour :** <span class="badge badge-type">Promise<boolean></span> - si l'initialisation réussit, sinon `false`.

Vérifie que les rôles configurés pour les réactions sont accessibles par le bot sur le serveur.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `bot` | <span class="badge badge-type">import('./Bot')</span> | - L'instance du bot qui gère ce message. |
| `message` | <span class="badge badge-type">Discord.Message</span> | - Le message Discord concerné. |

Reagit avec toutes les emotes sur le message fournit

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">Discord.Message</span> |  |

Vérifie si un message donné correspond à ce message à réaction (même salon et même serveur).

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">Discord.Message</span> | - Le message à vérifier. |

**Retour :** <span class="badge badge-type">this|false</span> - de EmoteMessage si elle correspond, sinon `false`.

Gère l'ajout d'une réaction sur le message. Attribue le rôle correspondant à l'utilisateur si configuré.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `reaction` | <span class="badge badge-type">Discord.MessageReaction</span> | - La réaction ajoutée. |
| `user` | <span class="badge badge-type">Discord.User</span> | - L'utilisateur qui a réagi. |

**Retour :** <span class="badge badge-type">Promise<boolean></span> - si le rôle a été géré, `false` sinon.

Gère la suppression d'une réaction sur le message. Retire le rôle correspondant à l'utilisateur si configuré.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `reaction` | <span class="badge badge-type">Discord.MessageReaction</span> | - La réaction retirée. |
| `user` | <span class="badge badge-type">Discord.User</span> | - L'utilisateur dont la réaction a été retirée. |

**Retour :** <span class="badge badge-type">Promise<boolean></span> - si le rôle a été géré, `false` sinon.

Décode les URI des clés et des valeurs d'un objet provenant de la base de données. Utile pour les données qui ont été encodées pour le stockage.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `value` | <span class="badge badge-type">object</span> | - L'objet à décoder. |

**Retour :** <span class="badge badge-type">object</span> - avec les clés et valeurs décodées.

Encode les URI des clés et des valeurs d'un objet pour le stockage en base de données.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `value` | <span class="badge badge-type">object</span> | - L'objet à encoder. |

**Retour :** <span class="badge badge-type">object</span> - avec les clés et valeurs encodées.

