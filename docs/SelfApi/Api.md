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
| `libs` | `Object` | Dépendances injectées (express, bcrypt, fetch) |

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
| `userData` | `object` | - Les données de l'utilisateur Discord. |
| `accessToken` | `string` | - Le token d'accès Discord. |

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

Génère un token signé contenant les données de l'utilisateur.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `userData` | `object` | - Les données de l'utilisateur. |
| `accessToken` | `string` | - Le token d'accès Discord. |

**Returns:** `string` - token signé (base64.signature).

Vérifie un token signé et retourne son payload si valide.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `token` | `string` | - Le token signé. |

**Returns:** `object|null` - payload décodé ou null si invalide.

Échange un code d'autorisation Discord contre un jeton d'accès.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `code` | `string` | - Le code d'autorisation obtenu via OAuth2. |

**Returns:** `Promise<string>` - jeton d'accès de l'utilisateur.

Récupère les données de l'utilisateur Discord en utilisant son jeton d'accès.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `token` | `string` | - Le jeton d'accès OAuth2 de l'utilisateur. |

**Returns:** `Promise<object>` - utilisateur Discord.

Créer un nouvel utilisateur dans le cache après validation OAuth2. 1. Vérifie si la requête contient déjà un token valide. 2. Échange le code OAuth2 contre un access token Discord. 3. Récupère l'ID Discord l'utilisateur. 4. Génère un nouveau token API unique et l'enregistre le cache.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `req` | `import('express').Request` | - La requête contenant le code d'autorisation. |
| `res` | `import('express').Response` | - La réponse pour renvoyer le nouveau token. |

**Returns:** `Promise<{token: string, discordId: string}>` - informations de l'utilisateur créé.

Middleware d'authentification centralisé pour les requêtes API. Identifie l'utilisateur via son token (Header Authorization) et le bot concerné via le paramètre URL/Body. - Si l'URL est publique (auth, discord/authurl), l'authentification est sautée. - Un bot DOIT être spécifié (bot_id). - Un token utilisateur valide est requis sauf pour certaines routes (ex: /commands).

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `req` | `import('express').Request` | - L'objet de la requête Express. |
| `res` | `import('express').Response` | - L'objet de la réponse Express. |
| `options` | `object` | - Options de la route (ex: { auth: false }). |

**Returns:** `Promise<{bot: import('../Class/Bot.js'), user: import('discord.js').User}>` - du bot et de l'utilisateur authentifié.

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

Retourne les sockets connectés pour un utilisateur donné.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `userId` | `string` | - L'ID de l'utilisateur Discord. |

**Returns:** `Set<string>|null` - Set d'IDs de sockets ou null si aucun.

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
| `options` | `object` | - Options de la route (ex: { auth: false }). |

Initialise toutes les routes définies dans le répertoire `routes`.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `routesArg` | `object` | - Arguments supplémentaires à passer au créateur de routes. |

Formate un message de log avec une référence et une couleur spécifique.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `content` | `string` | - Le message à logger. |
| `reference` | `string` | - La référence du log (ex: NOM_DE_ROUTE). |
| `` | `string` |  |
| `prefix` | `string` | - Préfixe du log. |

**Returns:** `string` - message formaté.

Log un message d'information.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `content` | `string` | - Le message à logger. |
| `reference` | `string` | - La référence du log. |

Log un message de stuccès.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `content` | `string` | - Le message à logger. |
| `reference` | `string` | - La référence du log. |

Log une erreur.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `content` | `string|Error` | - L'erreur à logger. |
| `reference` | `string` | - La référence du log. |

Log un avertissement.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `content` | `string` | - L'avertissement à logger. |
| `reference` | `string` | - La référence du log. |

Log un message de debug.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `content` | `string` | - Le message de debug. |
| `reference` | `string` | - La référence du log. |

