---
title: CommandManager
layout: default
---

# `CommandManager`

Gère l'enregistrement et l'accès aux commandes du bot.

Ajoute une nouvelle commande à la collection. Ne fait rien si une commande avec le même ID existe déjà.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `id` | <span class="badge badge-type">string</span> | - L'identifiant unique de la commande. |
| `value` | <span class="badge badge-type">Command</span> | - La classe de la commande à ajouter. |

Met à jour une commande existante dans la collection.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `id` | <span class="badge badge-type">string</span> | - L'identifiant de la commande à mettre à jour. |
| `value` | <span class="badge badge-type">Command</span> | - La nouvelle classe de la commande. |

Récupère une commande par son ID.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `id` | <span class="badge badge-type">string</span> | - L'identifiant de la commande. |

**Retour :** <span class="badge badge-type">Command</span> - classe de la commande correspondante.

Récupère toutes les commandes enregistrées.

**Retour :** <span class="badge badge-type">Map<string, Command></span> - map de toutes les commandes.

Vérifie si une commande avec l'ID spécifié existe.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `id` | <span class="badge badge-type">string</span> | - L'identifiant de la commande à vérifier. |

**Retour :** <span class="badge badge-type">boolean</span> - si la commande existe, sinon `false`.

Charger la commande

Charge toutes les commandes des bots

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `botManager` | <span class="badge badge-type">BotManager</span> |  |

Réagit a un commande initié depuis une interaction

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `bot` | <span class="badge badge-type">*</span> |  |
| `interaction` | <span class="badge badge-type">*</span> |  |

Réagit a une commande initié depuis un call api

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `bot` | <span class="badge badge-type">Bot</span> |  |
| `req` | <span class="badge badge-type">Request</span> |  |
| `res` | <span class="badge badge-type">any</span> |  |
| `user` | <span class="badge badge-type">Discord.User</span> |  |

DEPRECATED Réagit a une command initié depuiçs un message

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `bot` | <span class="badge badge-type">*</span> |  |
| `message` | <span class="badge badge-type">*</span> |  |

