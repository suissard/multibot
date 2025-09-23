---
title: index
layout: default
---

# `index`

Ce module gère l'attribution automatique des rôles pour les membres du serveur. Une fois le bot prêt, le module s'initialise en se connectant à une source de données externe, l'API Olympe, pour récupérer les informations sur les utilisateurs et leurs attributions. Il s'assure que les données du serveur (rôles, membres) sont bien chargées, puis lance une première synchronisation des rôles. Par la suite, le processus est répété à intervalles réguliers, définis dans la configuration, pour garantir que les rôles des membres sont toujours à jour par rapport aux données de l'API.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `bot` | `import('../../Class/Bot')` | - L'instance du bot pour laquelle initialiser le module. |

**Returns:** `object` - objet contenant les classes de commandes exportées par ce module.

AutoRole : { "everyXhours": 8, "olympeAuth": { "value": "token", }, olympeDomain: "playallforone.com", }

