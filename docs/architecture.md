---
title: Architecture
layout: default
---
[Accueil](./index.md) - [Architecture](./architecture.md) - [Commandes](./commands.md) - [Configuration](./configuration.md) - [Événements](./events.md) - [Modules](./modules.md)

# Architecture du Projet

Ce document décrit l'architecture de haut niveau du projet MultiBot. La compréhension de ces concepts est essentielle pour développer de nouvelles fonctionnalités.

## Concepts Fondamentaux

Le framework est construit autour de quelques classes et gestionnaires principaux qui interagissent pour faire fonctionner les bots.

### `BotManager` (Gestionnaire de Bots)

-   **Fichier** : `Class/BotManager.js` (instancié dans `Class/BOTS.js`)
-   **Rôle** : C'est le cerveau de l'application. `BotManager` est une classe singleton qui gère l'ensemble des instances de bots.
-   **Responsabilités** :
    -   Initialiser et démarrer toutes les instances de `Bot` sur la base des données de configuration.
    -   Charger l'ensemble des commandes (`CommandManager`) et des événements (`EventManager`) disponibles dans l'application.
    -   Charger les `Modules` pour chaque bot qui les a activés.
    -   Fournir des méthodes utilitaires pour gérer les bots (redémarrage, arrêt).
    -   Lancer l'API interne (`SelfApi`).

### `Bot` (Instance de Bot)

-   **Fichier** : `Class/Bot.js`
-   **Rôle** : Représente une connexion unique à l'API Discord, c'est-à-dire un bot individuel.
-   **Responsabilités** :
    -   Hérite de la classe `Discord.Client` de `discord.js`.
    -   Contient sa propre configuration : nom, token, préfixe, modules activés, permissions spécifiques, etc.
    -   Maintient sa propre connexion à Discord et gère son état (en ligne, activité, etc.).
    -   Fournit des méthodes de journalisation (`log`, `error`) préfixées par le nom du bot pour un débogage facile.

### `CommandManager` et `EventManager`

-   **Fichiers** : `Class/CommandManager.js`, `Class/EventManager.js`
-   **Rôle** : Ces gestionnaires sont responsables du chargement et de la distribution des commandes et des événements.
-   **Fonctionnement** :
    -   Au démarrage, ils parcourent les dossiers `Commandes/` et `Events/` pour charger toutes les classes de commandes et d'événements disponibles.
    -   `CommandManager` est utilisé pour trouver et exécuter une commande lorsqu'elle est appelée (par interaction, message ou API).
    -   `EventManager` attache les écouteurs d'événements à chaque instance de `Bot`, en s'assurant que les bots réagissent aux événements Discord pertinents.

## Cycle de Vie de l'Application (Démarrage)

Voici ce qui se passe lorsque vous exécutez `npm start` (`node main.js`) :

1.  **`main.js`** : Le point d'entrée de l'application est exécuté.
2.  **Chargement de la configuration** : Le mode (`DEV` ou `PROD`) est lu depuis `botMode.json`. Les données de configuration des bots sont chargées (soit depuis la base de données en mode `PROD`, soit depuis `configs.json` en mode `DEV`).
3.  **Initialisation du `BotManager`** : `BOTS.start(botsData)` est appelé.
4.  **Création des Bots** : `BotManager` parcourt les données de configuration et crée une nouvelle instance de `Bot` pour chaque bot actif. Chaque bot se connecte à Discord.
5.  **Chargement des Commandes/Événements** : `BotManager` demande au `CommandManager` et à l'`EventManager` de charger toutes les commandes et tous les événements des dossiers `Commandes/` et `Events/`.
6.  **Attachement des Événements** : L'`EventManager` attache les écouteurs d'événements à chaque instance de `Bot`.
7.  **Chargement des Modules** : Pour chaque `Bot`, `BotManager` parcourt la liste des modules activés dans sa configuration. Il charge le code du module (depuis `Modules/<nom-du-module>/index.js`) et l'initialise en lui passant l'instance du `Bot`. Le module peut alors enregistrer ses propres commandes/événements ou démarrer sa propre logique.
8.  **Prêt** : À ce stade, tous les bots sont en ligne, les commandes sont enregistrées et les événements sont écoutés. L'application est pleinement opérationnelle.
