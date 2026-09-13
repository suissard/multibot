---
title: Api
layout: default
---

# `Api`

Class permettant de gerer l'API du bot

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `configs` | <span class="badge badge-type">Object</span> |  |
| `discord` | <span class="badge badge-type">Object</span> |  |
| `BOTS` | <span class="badge badge-type">BotManager</span> | Instance de gestionnaire de bot |
| `saltRounds` | <span class="badge badge-type">Number</span> |  |
| `libs` | <span class="badge badge-type">Object</span> | Dépendances injectées (express, bcrypt, fetch) |

Récupère l'instance du bot à partir de la requête.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `req` | <span class="badge badge-type">import('express').Request</span> | - L'objet de la requête Express. |

**Retour :** <span class="badge badge-type">import('../Class/Bot.js')</span> - du bot.

Convertit le corps de la requête API en objets Discord.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `req` | <span class="badge badge-type">import('express').Request</span> | - L'objet de la requête Express. |
| `command` | <span class="badge badge-type">import('../Class/Command.js')</span> | - La commande à exécuter. |

**Retour :** <span class="badge badge-type">Promise<object></span> - arguments transposés.

Ajoute plusieurs utilisateurs à partir d'un tableau de configuration.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `users` | <span class="badge badge-type">Array<{token: string, discordId: string}></span> | - Un tableau d'objets utilisateur. |

Ajoute un utilisateur et son token d'API au cache d'authentification. Le token est hashé avant d'être stocké.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `token` | <span class="badge badge-type">string</span> | - Le token d'API brut de l'utilisateur. |
| `userData` | <span class="badge badge-type">object</span> | - Les données de l'utilisateur Discord. |
| `accessToken` | <span class="badge badge-type">string</span> | - Le token d'accès Discord. |

Extrait le token Bearer d'une requête et retourne son hash.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `req` | <span class="badge badge-type">import('express').Request</span> | - L'objet de la requête Express. |

**Retour :** <span class="badge badge-type">Promise<string|false></span> - hash du token, ou `false` si aucun token n'est trouvé.

Extrait le code d'autorisation Discord des paramètres de la requête.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `req` | <span class="badge badge-type">import('express').Request</span> | - L'objet de la requête Express. |

**Retour :** <span class="badge badge-type">string</span> - code d'autorisation.

Génère un token signé contenant les données de l'utilisateur.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `userData` | <span class="badge badge-type">object</span> | - Les données de l'utilisateur. |
| `accessToken` | <span class="badge badge-type">string</span> | - Le token d'accès Discord. |

**Retour :** <span class="badge badge-type">string</span> - token signé (base64.signature).

Vérifie un token signé et retourne son payload si valide.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `token` | <span class="badge badge-type">string</span> | - Le token signé. |

**Retour :** <span class="badge badge-type">object|null</span> - payload décodé ou null si invalide.

Échange un code d'autorisation Discord contre un jeton d'accès.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `code` | <span class="badge badge-type">string</span> | - Le code d'autorisation obtenu via OAuth2. |

**Retour :** <span class="badge badge-type">Promise<string></span> - jeton d'accès de l'utilisateur.

Récupère les données de l'utilisateur Discord en utilisant son jeton d'accès.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `token` | <span class="badge badge-type">string</span> | - Le jeton d'accès OAuth2 de l'utilisateur. |

**Retour :** <span class="badge badge-type">Promise<object></span> - utilisateur Discord.

Créer un nouvel utilisateur dans le cache après validation OAuth2. 1. Vérifie si la requête contient déjà un token valide. 2. Échange le code OAuth2 contre un access token Discord. 3. Récupère l'ID Discord l'utilisateur. 4. Génère un nouveau token API unique et l'enregistre le cache.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `req` | <span class="badge badge-type">import('express').Request</span> | - La requête contenant le code d'autorisation. |
| `res` | <span class="badge badge-type">import('express').Response</span> | - La réponse pour renvoyer le nouveau token. |

**Retour :** <span class="badge badge-type">Promise<{token: string, discordId: string}></span> - informations de l'utilisateur créé.

Middleware d'authentification centralisé pour les requêtes API. Identifie l'utilisateur via son token (Header Authorization) et le bot concerné via le paramètre URL/Body. - Si l'URL est publique (auth, discord/authurl), l'authentification est sautée. - Un bot DOIT être spécifié (bot_id). - Un token utilisateur valide est requis sauf pour certaines routes (ex: /commands).

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `req` | <span class="badge badge-type">import('express').Request</span> | - L'objet de la requête Express. |
| `res` | <span class="badge badge-type">import('express').Response</span> | - L'objet de la réponse Express. |
| `options` | <span class="badge badge-type">object</span> | - Options de la route (ex: { auth: false }). |

**Retour :** <span class="badge badge-type">Promise<{bot: import('../Class/Bot.js'), user: import('discord.js').User}></span> - du bot et de l'utilisateur authentifié.

Extrait l'ID du bot des paramètres de la requête.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `req` | <span class="badge badge-type">import('express').Request</span> | - L'objet de la requête Express. |

**Retour :** <span class="badge badge-type">string</span> - du bot.

Hashe une chaîne de caractères en utilisant le sel de l'instance.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `password` | <span class="badge badge-type">string</span> | - La chaîne à hasher. |

**Retour :** <span class="badge badge-type">Promise<string></span> - hash résultant.

Construit et retourne l'URL d'autorisation OAuth2 de Discord.

**Retour :** <span class="badge badge-type">string</span> - d'autorisation.

Retourne les sockets connectés pour un utilisateur donné.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `userId` | <span class="badge badge-type">string</span> | - L'ID de l'utilisateur Discord. |

**Retour :** <span class="badge badge-type">Set<string>|null</span> - Set d'IDs de sockets ou null si aucun.

Remonte une donnée depuis un objet, en se basant sur une url

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `object` | <span class="badge badge-type">Object</span> |  |
| `url` | <span class="badge badge-type">String</span> |  |
| `delStr` | <span class="badge badge-type">String</span> |  |

Renvoie la documentation des route dipsonible de l'api

**Retour :** <span class="badge badge-type">void</span> - 

Définit la route racine qui retourne la documentation

**Retour :** <span class="badge badge-type">Route</span> - 

Définit la route `/auth` pour la création d'utilisateur via le flux OAuth2.

Paramétrer plusieur routes dans l'api

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `routes` | <span class="badge badge-type">Array</span> |  |

Enregistre une nouvelle route dans le routeur Express. Ajoute un wrapper pour gérer l'authentification et les erreurs de manière centralisée.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `path` | <span class="badge badge-type">string</span> | - Le chemin de la route (ex: '/commands'). |
| `method` | <span class="badge badge-type">'get'|'post'|'put'|'delete'</span> | - La méthode HTTP. |
| `handler` | <span class="badge badge-type">function</span> | - La fonction de gestion de la route. |
| `options` | <span class="badge badge-type">object</span> | - Options de la route (ex: { auth: false }). |

Initialise toutes les routes définies dans le répertoire `routes`.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `routesArg` | <span class="badge badge-type">object</span> | - Arguments supplémentaires à passer au créateur de routes. |

Formate un message de log avec une référence et une couleur spécifique.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `content` | <span class="badge badge-type">string</span> | - Le message à logger. |
| `reference` | <span class="badge badge-type">string</span> | - La référence du log (ex: NOM_DE_ROUTE). |
| `` | <span class="badge badge-type">string</span> |  |
| `prefix` | <span class="badge badge-type">string</span> | - Préfixe du log. |

**Retour :** <span class="badge badge-type">string</span> - message formaté.

Log un message d'information.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `content` | <span class="badge badge-type">string</span> | - Le message à logger. |
| `reference` | <span class="badge badge-type">string</span> | - La référence du log. |

Log un message de stuccès.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `content` | <span class="badge badge-type">string</span> | - Le message à logger. |
| `reference` | <span class="badge badge-type">string</span> | - La référence du log. |

Log une erreur.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `content` | <span class="badge badge-type">string|Error</span> | - L'erreur à logger. |
| `reference` | <span class="badge badge-type">string</span> | - La référence du log. |

Log un avertissement.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `content` | <span class="badge badge-type">string</span> | - L'avertissement à logger. |
| `reference` | <span class="badge badge-type">string</span> | - La référence du log. |

Log un message de debug.

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `content` | <span class="badge badge-type">string</span> | - Le message de debug. |
| `reference` | <span class="badge badge-type">string</span> | - La référence du log. |

