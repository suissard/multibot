# Projet MultiBot

Ce projet est un framework pour créer et gérer plusieurs bots Discord à partir d'une seule base de code. Il est conçu pour être modulaire et extensible, permettant d'ajouter facilement de nouvelles fonctionnalités, commandes et événements.

## Prérequis

- **Node.js**: `v16.9.1` ou une version plus récente est recommandée.

## Installation

1.  Clonez le dépôt sur votre machine locale.
2.  Installez les dépendances du projet en utilisant npm :
    ```bash
    npm install
    ```

## Démarrage

Pour démarrer les bots, exécutez la commande suivante à la racine du projet :

```bash
npm start
```

Le bot démarrera en mode `PROD` ou `DEV` en fonction de la configuration dans le fichier `botMode.json`.

## Aperçu de l'architecture

Le projet est structuré autour de plusieurs concepts clés :

-   **BotManager** : La classe centrale qui gère le cycle de vie de tous les bots. Elle est responsable de l'initialisation, du chargement des modules, des commandes et des événements.
-   **Bot** : Une classe qui représente une instance unique d'un bot Discord, avec sa propre configuration (token, modules activés, etc.).
-   **Commandes** : Des classes qui définissent les actions que les utilisateurs peuvent déclencher, généralement via des commandes slash.
-   **Événements** : Des classes qui gèrent les événements de l'API Discord (par exemple, un nouveau message, une réaction ajoutée).
-   **Modules** : Des dossiers contenant des fonctionnalités autonomes et complètes (commandes, événements, logique interne) qui peuvent être activées ou désactivées pour chaque bot.

## Documentation détaillée

Pour une compréhension approfondie du fonctionnement interne, de la manière de développer de nouvelles fonctionnalités et de la configuration, veuillez consulter la **[documentation complète dans le dossier `/doc`](./doc/architecture.md)**.
