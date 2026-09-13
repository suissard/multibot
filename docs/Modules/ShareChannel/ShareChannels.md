---
title: ShareChannels
layout: default
---

# `ShareChannels`

## Classe : ``

Représente un groupe de salons partagés. Gère la configuration (jeu, catégorie, pattern), la liste des salons, et la logique de partage des messages entre eux.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `data` | <span class="badge badge-type">object</span> | - Les données de configuration pour le groupe de salons partagés. |
| `data.id` | <span class="badge badge-type">string</span> | - L'identifiant unique du groupe (ex: "overwatch-scrim"). |
| `data.game` | <span class="badge badge-type">string</span> | - Le jeu associé. |
| `data.categorie` | <span class="badge badge-type">string</span> | - La catégorie du partage. |
| `data.pattern` | <span class="badge badge-type">string</span> | - L'expression régulière pour valider les messages à partager. |
| `data.channels` | <span class="badge badge-type">Array<string></span> | - Une liste d'IDs de salons à inclure initialement. |

Ajouter un message comme ayant été partagé

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">Discord.Message</span> | le message discord qui a été partagé |

**Retour :** <span class="badge badge-type">ShareMessage</span> - message partagée au format shareMessage

Recuperer une message de la collection

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `id` | <span class="badge badge-type">String</span> | Par convention, l'identifiant discord de l'auteur du message |

**Retour :** <span class="badge badge-type">ShareMessage</span> - message partagée au format shareMessage

Supprimer une message de la collection

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `id` | <span class="badge badge-type">String</span> | Par convention, l'identifiant discord de l'auteur du message |

**Retour :** <span class="badge badge-type">ShareMessage</span> - message partagée au format shareMessage

Initialise la collection de messages partagés. (Note: Cette fonction semble boguée ou inachevée, elle itère sur `this._messages` qui est déjà une Map et tente de la reconstruire).

**Retour :** <span class="badge badge-type">Promise<Map<string, ShareMessage>></span> - collection de messages initialisée.

Ajouter un channel dans la liste de partage

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">Discord.Message</span> | le message discord qui a été partagé |

**Retour :** <span class="badge badge-type">Discord.Channel</span> - channel qui a été ajouté

Enregistre un nouveau salon dans la base de données.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `channel` | <span class="badge badge-type">import('discord.js').TextChannel</span> | - Le salon à enregistrer. |

Supprimer une channel de la collection

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `id` | <span class="badge badge-type">String</span> | Par convention, l'identifiant discord du channel |

Initialise la liste des salons pour ce groupe de partage.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `channels` | <span class="badge badge-type">Array<string></span> | - Une liste d'IDs de salons. |

**Retour :** <span class="badge badge-type">Promise<Array<import('discord.js').TextChannel>></span> - liste des objets Channel initialisés.

Function de prise en charge des messages

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">Discord.message</span> |  |

Permet d'obtenir els info du channela renvoier a l'utilisateur

**Retour :** <span class="badge badge-type">String</span> - d'information sur le channel

Renvoie un embed sur le modele du message fournit

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">Discord.Message</span> |  |

**Retour :** <span class="badge badge-type">MultiBotMessageEmbed</span> - au format embed

Verification des message précedent de l'auteur et qu'il respecte les usages du partage

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">Discord.Message</span> |  |

**Retour :** <span class="badge badge-type">Boolean</span> - si l'utilisateur respect les usage ou "false" si ce n'est pas le cas

Envoie le embed dans les differents salons partagées

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">Discord.Message</span> |  |

Renvoie un embed sur le modele du message fournit

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `message` | <span class="badge badge-type">Discord.Message</span> |  |

**Retour :** <span class="badge badge-type">MultiBotMessageEmbed</span> - au format embed

