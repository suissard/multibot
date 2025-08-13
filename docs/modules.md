---
title: Modules
layout: default
---
[Accueil]({% link index.md %}) - [Architecture]({% link architecture.md %}) - [Commandes]({% link commands.md %}) - [Configuration]({% link configuration.md %}) - [Événements]({% link events.md %}) - [Modules]({% link modules.md %})

# Le Système de Modules

Le système de modules est une des caractéristiques les plus puissantes de ce framework. Il permet d'encapsuler des fonctionnalités complètes (commandes, événements, logique de fond) dans des unités autonomes qui peuvent être activées ou désactivées pour chaque bot individuellement.

## Qu'est-ce qu'un Module ?

Un module est un dossier situé dans le répertoire `Modules/`. Ce dossier contient tout le code nécessaire à une fonctionnalité spécifique. Par exemple, un module `AutoRole` gère tout ce qui est lié à l'attribution automatique de rôles.

L'avantage principal est la **séparation des préoccupations**. Au lieu d'avoir des dizaines de commandes et d'événements mélangés, chaque fonctionnalité est isolée dans son propre module, ce qui rend le code plus facile à maintenir et à déboguer.

## Structure d'un Module

Un module est un dossier à la racine de `Modules/`. Le nom du dossier sert d'identifiant pour le module (par exemple, `AutoRole`).

```
Modules/
└── AutoRole/
    ├── index.js           # Point d'entrée du module (obligatoire)
    ├── AutoRoleCommand.js # Fichier d'une commande spécifique au module
    ├── utils.js           # Fonctions utilitaires pour le module
    └── models/            # Modèles de données si nécessaire
        └── OlympeTeam.js
```

### Le Fichier `index.js`

C'est le cœur du module. Ce fichier doit exporter une fonction qui prend l'instance du `bot` en paramètre.

```javascript
// Modules/MonModule/index.js

// Importez les commandes et événements spécifiques à votre module
const MyCommand = require('./MyCommand.js');
const MyEvent = require('./MyEvent.js');

module.exports = (bot) => {
    // 'bot' est l'instance du bot pour lequel ce module est chargé.

    // 1. Logique interne du module
    // Vous pouvez attacher des écouteurs d'événements ou démarrer des tâches de fond
    // qui ne sont pertinentes que pour ce module.
    console.log(`[${bot.name}] Module "MonModule" chargé.`);
    bot.on('ready', () => {
        // Faire quelque chose quand le bot est prêt
    });

    setInterval(() => {
        // Exécuter une tâche toutes les heures
    }, 60 * 60 * 1000);


    // 2. Enregistrement des commandes et événements
    // Retournez un objet contenant les classes de commandes et d'événements
    // que vous souhaitez rendre disponibles globalement.
    return { MyCommand, MyEvent };
};
```

## Comment un Module Fonctionne-t-il ?

1.  **Chargement** : Au démarrage, le `BotManager` parcourt la configuration de chaque `Bot`. Si un module est activé pour un bot, le `BotManager` charge le fichier `Modules/<NomModule>/index.js`.
2.  **Initialisation** : Le `BotManager` exécute la fonction exportée par `index.js`, en lui passant l'instance du `bot` concerné.
3.  **Logique interne** : Le code à l'intérieur de la fonction est exécuté. C'est là que le module peut démarrer ses propres timers (`setInterval`) ou attacher des écouteurs d'événements spécifiques (`bot.on(...)`).
4.  **Enregistrement** : La fonction du module retourne un objet. Le `BotManager` parcourt cet objet et enregistre chaque `Command` auprès du `CommandManager` et chaque `Event` auprès de l'`EventManager`. Ces commandes et événements deviennent alors disponibles pour le bot, comme s'ils avaient été chargés depuis les dossiers `Commandes/` ou `Events/`.

## Configuration des Modules

L'activation et la configuration d'un module se font dans la configuration de chaque bot (voir `doc/configuration.md`).

Dans l'objet de configuration d'un bot, la clé `modules` contient un objet où chaque clé est le nom d'un module (le nom du dossier) et la valeur est soit `true` (pour activer avec la configuration par défaut), soit un objet de configuration spécifique.

```json
{
    "id": "12345",
    "token": "...",
    "name": "MonBotTest",
    "modules": {
        "AutoRole": {
            "everyXhours": 12,
            "roleIds": {
                "caster": "987654321"
            }
        },
        "ChannelManager": true,
        "UnAutreModule": false // Ce module ne sera pas chargé
    }
}
```

Dans le code de votre module (`index.js`), vous pouvez accéder à cette configuration via `bot.modules.<NomModule>`:

```javascript
// Modules/AutoRole/index.js
module.exports = (bot) => {
    const config = bot.modules.AutoRole; // Récupère la configuration du module
    if (!config) return; // Sécurité : ne rien faire si le module n'est pas configuré

    const intervalHours = config.everyXhours || 8; // Utilise la valeur de la config ou une valeur par défaut
    console.log(`Le module AutoRole s'exécutera toutes les ${intervalHours} heures.`);

    // ...
}
```
