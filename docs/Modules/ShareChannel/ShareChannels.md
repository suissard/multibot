---
title: ShareChannels
layout: default
---

# `ShareChannels`

## Class:

Représente un groupe de salons partagés. Gère la configuration (jeu, catégorie, pattern), la liste des salons, et la logique de partage des messages entre eux.



**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `data` | `object` | - Les données de configuration pour le groupe de salons partagés. |
| `data.id` | `string` | - L'identifiant unique du groupe (ex: "overwatch-scrim"). |
| `data.game` | `string` | - Le jeu associé. |
| `data.categorie` | `string` | - La catégorie du partage. |
| `data.pattern` | `string` | - L'expression régulière pour valider les messages à partager. |
| `data.channels` | `Array<string>` | - Une liste d'IDs de salons à inclure initialement. |

Ajouter un message comme ayant été partagé

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `message` | `Discord.Message` | le message discord qui a été partagé |

**Returns:** `ShareMessage` - message partagée au format shareMessage

Recuperer une message de la collection

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `id` | `String` | Par convention, l'identifiant discord de l'auteur du message |

**Returns:** `ShareMessage` - message partagée au format shareMessage

Supprimer une message de la collection

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `id` | `String` | Par convention, l'identifiant discord de l'auteur du message |

**Returns:** `ShareMessage` - message partagée au format shareMessage

Initialise la collection de messages partagés. (Note: Cette fonction semble boguée ou inachevée, elle itère sur `this._messages` qui est déjà une Map et tente de la reconstruire).

**Returns:** `Promise<Map<string, ShareMessage>>` - collection de messages initialisée.

Ajouter un channel dans la liste de partage

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `message` | `Discord.Message` | le message discord qui a été partagé |

**Returns:** `Discord.Channel` - channel qui a été ajouté

Enregistre un nouveau salon dans la base de données.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `channel` | `import('discord.js').TextChannel` | - Le salon à enregistrer. |

Supprimer une channel de la collection

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `id` | `String` | Par convention, l'identifiant discord du channel |

Initialise la liste des salons pour ce groupe de partage.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `channels` | `Array<string>` | - Une liste d'IDs de salons. |

**Returns:** `Promise<Array<import('discord.js').TextChannel>>` - liste des objets Channel initialisés.

Function de prise en charge des messages

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `message` | `Discord.message` |  |

Permet d'obtenir els info du channela renvoier a l'utilisateur

**Returns:** `String` - d'information sur le channel

Renvoie un embed sur le modele du message fournit

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `message` | `Discord.Message` |  |

**Returns:** `MultiBotMessageEmbed` - au format embed

Verification des message précedent de l'auteur et qu'il respecte les usages du partage

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `message` | `Discord.Message` |  |

**Returns:** `Boolean` - si l'utilisateur respect les usage ou "false" si ce n'est pas le cas

Envoie le embed dans les differents salons partagées

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `message` | `Discord.Message` |  |

Renvoie un embed sur le modele du message fournit

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `message` | `Discord.Message` |  |

**Returns:** `MultiBotMessageEmbed` - au format embed

