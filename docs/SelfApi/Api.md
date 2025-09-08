---
title: Api
layout: default
---

# `Api`

Class permettant de gerer l'API du bot

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `configs` | `Object` |  |
| `discord` | `Object` |  |
| `BOTS` | `BotManager` | Instance de gestionnaire de bot |
| `saltRounds` | `Number` |  |

Récupère l'instance du bot à partir de la requête.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `req` | `import('express').Request` | - L'objet de la requête Express. |

**Returns:** `import('../Class/Bot.js')` - du bot.

Convertit le corps de la requête API en objets Discord.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `req` | `import('express').Request` | - L'objet de la requête Express. |
| `command` | `import('../Class/Command.js')` | - La commande à exécuter. |

**Returns:** `Promise<object>` - arguments transposés.

Ajoute plusieurs utilisateurs à partir d'un tableau de configuration.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `users` | `Array<{token: string, discordId: string}>` | - Un tableau d'objets utilisateur. |

Ajoute un utilisateur et son token d'API au cache d'authentification. Le token est hashé avant d'être stocké.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `token` | `string` | - Le token d'API brut de l'utilisateur. |
| `discordId` | `string` | - L'ID Discord de l'utilisateur. |

Extrait le token Bearer d'une requête et retourne son hash.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `req` | `import('express').Request` | - L'objet de la requête Express. |

**Returns:** `Promise<string|false>` - hash du token, ou `false` si aucun token n'est trouvé.

Extrait le code d'autorisation Discord des paramètres de la requête.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `req` | `import('express').Request` | - L'objet de la requête Express. |

**Returns:** `string` - code d'autorisation.

Génère un token d'API unique en utilisant UUID v4.

**Returns:** `string` - token généré.

Échange un code d'autorisation Discord contre un jeton d'accès.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `code` | `string` | - Le code d'autorisation obtenu via OAuth2. |

**Returns:** `Promise<string>` - jeton d'accès de l'utilisateur.

Récupère l'ID Discord d'un utilisateur en utilisant son jeton d'accès.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `token` | `string` | - Le jeton d'accès OAuth2 de l'utilisateur. |

**Returns:** `Promise<string>` - Discord de l'utilisateur.

TODO Creer un utilisateru dans le cache

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `req` | `*` |  |
| `res` | `*` |  |

**Returns:** `` - 

Gère l'authentification d'une requête API.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `req` | `import('express').Request` | - L'objet de la requête Express. |
| `res` | `import('express').Response` | - L'objet de la réponse Express. |

**Returns:** `Promise<{bot: Bot, user: import('discord.js').User}>` - du bot et de l'utilisateur.

Extrait l'ID du bot des paramètres de la requête.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `req` | `import('express').Request` | - L'objet de la requête Express. |

**Returns:** `string` - du bot.

Hashe une chaîne de caractères en utilisant le sel de l'instance.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `password` | `string` | - La chaîne à hasher. |

**Returns:** `Promise<string>` - hash résultant.

Construit et retourne l'URL d'autorisation OAuth2 de Discord.

**Returns:** `string` - d'autorisation.

Remonte une donnée depuis un objet, en se basant sur une url

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `object` | `Object` |  |
| `url` | `String` |  |
| `delStr` | `String` |  |

Renvoie la documentation des route dipsonible de l'api

**Returns:** `` - 

Définit la route racine qui retourne la documentation

**Returns:** `Route` - 

Définit la route `/auth` pour la création d'utilisateur via le flux OAuth2.

Paramétrer plusieur routes dans l'api

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `routes` | `Array` |  |

Enregistre une nouvelle route dans le routeur Express. Ajoute un wrapper pour gérer l'authentification et les erreurs de manière centralisée.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `path` | `string` | - Le chemin de la route (ex: '/commands'). |
| `method` | `'get'|'post'|'put'|'delete'` | - La méthode HTTP. |
| `handler` | `function` | - La fonction de gestion de la route. |

Initialise toutes les routes définies dans le répertoire `routes`.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `routesArg` | `object` | - Arguments supplémentaires à passer au créateur de routes. |

