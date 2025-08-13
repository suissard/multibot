# Configuration des Bots

Ce document détaille comment configurer les instances de bot, que ce soit pour le développement local ou pour la production.

## Mode de Fonctionnement (`botMode.json`)

À la racine du projet se trouve un fichier `botMode.json`. Ce fichier contient une seule chaîne de caractères qui détermine le mode de fonctionnement du bot :

-   `"PROD"` : Mode de production. Les configurations des bots sont chargées depuis la base de données.
-   `"DEV"` : Mode de développement. Les configurations sont chargées depuis le fichier `configs.json` local.

**Exemple de `botMode.json` :**
```json
"DEV"
```

## Fichier de Configuration de Développement (`configs.json`)

Lorsque le bot est en mode `"DEV"`, il utilise le fichier `configs.json` à la racine pour charger les configurations. Ce fichier n'est généralement pas suivi par git, vous devrez peut-être le créer à partir d'un exemple.

Ce fichier contient un tableau `botsData`, où chaque objet représente la configuration d'un bot.

**Exemple de `configs.json` :**
```json
{
    "botsData": [
        {
            "id": "1",
            "active": true,
            "token": "VOTRE_TOKEN_DE_BOT_DISCORD_ICI",
            "name": "MonBotDeTest",
            "activity": "Joue à être développé",
            "ownerId": "VOTRE_ID_UTILISATEUR_DISCORD",
            "home": "ID_DU_SERVEUR_DISCORD_PRINCIPAL",
            "prefix": "!",
            "devMode": true,
            "admin": ["AUTRE_ID_ADMIN_SI_BESOIN"],
            "modules": {
                "AutoRole": {
                    "everyXhours": 1,
                    "guilds": {
                        "ID_DU_SERVEUR_DISCORD_PRINCIPAL": {
                            "teamSheetUrl": "URL_FEUILLE_DE_CALCUL_EQUIPES"
                        }
                    }
                }
            },
            "unauthorizedEvents": [],
            "unauthorizedCommands": [],
            "commandInDev": []
        }
    ]
}
```

## Structure de l'Objet de Configuration d'un Bot (`botData`)

Chaque bot est configuré par un objet avec les propriétés suivantes :

-   `id` (String) : Un identifiant unique pour le bot (peut être un simple numéro en dev).
-   `active` (Boolean) : Si `true`, le bot sera démarré. Si `false`, il sera ignoré.
-   `token` (String) : Le token d'authentification du bot fourni par le portail des développeurs Discord. **C'est la clé la plus sensible.**
-   `name` (String) : Le nom du bot, utilisé principalement pour les logs.
-   `activity` (String) : Le texte d'activité qui apparaît sous le nom du bot dans Discord (par exemple, "Joue à...").
-   `ownerId` (String) : L'ID utilisateur Discord du propriétaire du bot. Cette personne a tous les droits sur le bot.
-   `home` (String) : L'ID du serveur (guild) Discord principal du bot. Requis pour les commandes `home: true`.
-   `prefix` (String) : Le préfixe pour les anciennes commandes basées sur les messages (aujourd'hui, les commandes slash sont privilégiées).
-   `devMode` (Boolean) : Un indicateur pour le mode développement (actuellement peu utilisé, mais requis).
-   `admin` (Array<String>) : Une liste d'ID utilisateurs Discord qui ont des privilèges d'administrateur sur le bot (le `ownerId` est automatiquement ajouté).
-   `modules` (Object) : Un objet pour activer et configurer les modules pour ce bot.
    -   La clé est le nom du module (nom du dossier dans `Modules/`).
    -   La valeur est soit `true` pour l'activer avec sa configuration par défaut, soit un objet de configuration spécifique au module. Si un module n'est pas listé ou si sa valeur est `false`, il ne sera pas chargé pour ce bot.
-   `unauthorizedEvents` (Array<String>) : Une liste d'ID d'événements (ceux définis dans les classes `Event`) que ce bot ne doit pas écouter.
-   `unauthorizedCommands` (Array<String>) : Une liste d'ID de commandes que ce bot ne doit pas exécuter.
-   `commandInDev` (Array<String>) : (Usage en développement) Liste des commandes à instancier spécifiquement. Laisser vide (`[]`) en général.
