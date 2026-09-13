---
title: ShareChannels
layout: default
---

# `ShareChannels`

## Classe : `ShareChannels`

Représente un groupe de salons partagés. Gère la configuration (jeu, catégorie, pattern), la liste des salons, et la logique de partage des messages entre eux.

### Constructeur `new ShareChannels(data)`

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `data` | <span class="badge badge-type">object</span> | - Les données de configuration pour le groupe de salons partagés. |
| `data.id` | <span class="badge badge-type">string</span> | - L'identifiant unique du groupe (ex: "overwatch-scrim"). |
| `data.game` | <span class="badge badge-type">string</span> | - Le jeu associé. |
| `data.categorie` | <span class="badge badge-type">string</span> | - La catégorie du partage. |
| `data.pattern` | <span class="badge badge-type">string</span> | - L'expression régulière pour valider les messages à partager. |
| `data.channels` | <span class="badge badge-type">Array<string></span> | - Une liste d'IDs de salons à inclure initialement. |

### Méthode `addMessage(message)`

Ajouter un message comme ayant été partagé

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">Discord.Message</span> | le message discord qui a été partagé |

**Retour :** <span class="badge badge-type">ShareMessage</span> - message partagée au format shareMessage

### Méthode `getMessage(id)`

Recuperer une message de la collection

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `id` | <span class="badge badge-type">String</span> | Par convention, l'identifiant discord de l'auteur du message |

**Retour :** <span class="badge badge-type">ShareMessage</span> - message partagée au format shareMessage

### Méthode `deleteMessage(id)`

Supprimer une message de la collection

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `id` | <span class="badge badge-type">String</span> | Par convention, l'identifiant discord de l'auteur du message |

**Retour :** <span class="badge badge-type">ShareMessage</span> - message partagée au format shareMessage

### Méthode `setMessages()`

Initialise la collection de messages partagés. (Note: Cette fonction semble boguée ou inachevée, elle itère sur `this._messages` qui est déjà une Map et tente de la reconstruire).

**Retour :** <span class="badge badge-type">Promise<Map<string, ShareMessage>></span> - collection de messages initialisée.

### Méthode `addChannel(channel, game, categorie)`

Ajouter un channel dans la liste de partage

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">Discord.Message</span> | le message discord qui a été partagé |

**Retour :** <span class="badge badge-type">Discord.Channel</span> - channel qui a été ajouté

### Méthode `saveNewChannel(channel)`

Enregistre un nouveau salon dans la base de données.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `channel` | <span class="badge badge-type">import('discord.js').TextChannel</span> | - Le salon à enregistrer. |

### Méthode `deleteChannel(id)`

Supprimer une channel de la collection

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `id` | <span class="badge badge-type">String</span> | Par convention, l'identifiant discord du channel |

### Méthode `setChannels(channels)`

Initialise la liste des salons pour ce groupe de partage.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `channels` | <span class="badge badge-type">Array<string></span> | - Une liste d'IDs de salons. |

**Retour :** <span class="badge badge-type">Promise<Array<import('discord.js').TextChannel>></span> - liste des objets Channel initialisés.

### Méthode `handleMessage(message)`

Function de prise en charge des messages

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">Discord.message</span> |  |

### Méthode `channelInfo()`

Permet d'obtenir els info du channela renvoier a l'utilisateur

**Retour :** <span class="badge badge-type">String</span> - d'information sur le channel

### Méthode `createEmbed(message)`

Renvoie un embed sur le modele du message fournit

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">Discord.Message</span> |  |

**Retour :** <span class="badge badge-type">MultiBotMessageEmbed</span> - au format embed

### Méthode `checkAuthor(message)`

Verification des message précedent de l'auteur et qu'il respecte les usages du partage

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">Discord.Message</span> |  |

**Retour :** <span class="badge badge-type">Boolean</span> - si l'utilisateur respect les usage ou "false" si ce n'est pas le cas

### Méthode `sendEmbed(message)`

Envoie le embed dans les differents salons partagées

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">Discord.Message</span> |  |

### Méthode `createConfirmEmbed(message)`

Renvoie un embed sur le modele du message fournit

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">Discord.Message</span> |  |

**Retour :** <span class="badge badge-type">MultiBotMessageEmbed</span> - au format embed

