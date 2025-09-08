---
title: index
layout: default
---

# `index`



**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `bot` | `import('../../Class/Bot')` | - L'instance du bot pour laquelle initialiser le module. |

**Returns:** `object` - objet contenant les classes de commandes exportées par ce module.

AutoRole : { "everyXhours": 8, "olympeAuth": { "value": "token", }, olympeDomain: "playallforone.com", }

Une fois le bot prêt, ce gestionnaire configure et lance le processus d'attribution automatique des rôles. Il initialise la connexion à l'API Olympe, s'assure que les données du serveur sont en cache, puis exécute la fonction d'attribution des rôles immédiatement et à un intervalle défini.

