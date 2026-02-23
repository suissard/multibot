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

Une fois le bot prêt, ce gestionnaire configure et lance le processus d'attribution automatique des rôles. Il initialise la connexion à l'API Olympe, s'assure que les données du serveur sont en cache, puis exécute la fonction d'attribution des rôles immédiatement et à un intervalle défini.

## Commandes du Module

* [AutoRoleCommand](./AutoRoleCommand.html)
* [GiveCasterRoleCommand](./GiveCasterRoleCommand.html)

## Configuration

Ce module contient des fichiers de configuration spécifiques. Cliquez ci-dessous pour voir les détails des classes et options.

* [AutoroleConfigClass](./AutoroleConfigClass.html)

## Événements du Module

* [addOlympeDataEvent](./events/addOlympeDataEvent.html)
* [processAllUsersEvent](./events/processAllUsersEvent.html)

