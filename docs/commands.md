---
title: Commandes
layout: default
---
# Gestion des Commandes

Ce document explique comment les commandes sont structurées, comment en créer de nouvelles et comment elles sont gérées par le `CommandManager`.

Pour une liste complète de toutes les commandes disponibles, voir la [Liste des Commandes]({% link commands-list.md %}).

## La Classe `Command`

Toutes les commandes du bot doivent hériter de la classe de base `Command` située dans `Class/Command.js`. Cette classe fournit une structure et des fonctionnalités communes à toutes les commandes.

### Structure d'une Commande

Une commande est un fichier JavaScript qui exporte une classe héritant de `Command`. Voici les propriétés statiques les plus importantes à définir :

-   `id` (String) : L'identifiant unique de la commande. C'est ce nom qui sera utilisé pour appeler la commande (par exemple, `/ping`). **Requis**.
-   `description` (String) : Une courte description de ce que fait la commande. Elle est affichée dans l'interface de Discord. **Requis**.
-   `userPermissions` (Array<String>) : Un tableau des permissions Discord que l'utilisateur doit avoir pour exécuter la commande (ex: `['ADMINISTRATOR']`). Laissez `[]` pour aucune permission spécifique. **Requis**.
-   `botPermissions` (Array<String>) : Un tableau des permissions que le bot doit avoir pour que la commande fonctionne (ex: `['SEND_MESSAGES']`). **Requis**.
-   `devBoss` (Boolean) : Si `true`, la commande ne peut être exécutée que par le propriétaire du bot (défini dans la configuration du bot). **Requis**.
-   `home` (Boolean) : Si `true`, la commande ne peut être exécutée que sur le serveur "maison" du bot (défini dans la configuration). **Requis**.
-   `arguments` (Array<Object>) : Un tableau décrivant les arguments (options) de la commande slash. Voir la section sur les arguments ci-dessous.

### La Méthode `methode`

C'est le cœur de votre commande. Vous devez surcharger la méthode `methode(args)` dans votre classe. C'est là que vous implémentez la logique de la commande.

-   Elle reçoit un objet `args` contenant les valeurs des arguments passés par l'utilisateur.
-   À l'intérieur de cette méthode, vous pouvez utiliser `this.bot`, `this.guild`, `this.channel`, `this.user`, et `this.member` qui sont automatiquement définis lorsque la commande est exécutée.
-   La valeur de retour de cette méthode sera envoyée comme réponse à l'utilisateur.

## Comment Créer une Nouvelle Commande

1.  **Créer le fichier** : Créez un nouveau fichier JavaScript dans le dossier `Commandes/`. Le nom du fichier peut être ce que vous voulez (par exemple, `ping.js`).

2.  **Définir la classe** : Dans ce fichier, créez une classe qui hérite de `Command` et exportez-la.

3.  **Définir les propriétés statiques** : Ajoutez les propriétés statiques (`id`, `description`, etc.) à votre classe.

4.  **Implémenter `methode`** : Ajoutez la méthode `methode` et écrivez votre logique.

### Exemple : `ping.js`

Voici un exemple simple d'une commande `ping` qui répond "Pong!".

```javascript
// Commandes/ping.js

const Command = require('../Class/Command.js');

module.exports = class Ping extends Command {
    static id = 'ping';
    static description = 'Répond Pong! pour vérifier que le bot est en ligne';
    static userPermissions = [];
    static botPermissions = ['SEND_MESSAGES'];
    static devBoss = false;
    static home = false;
    static arguments = [];

    async methode() {
        return 'Pong!';
    }
}
```

## Arguments de Commande (Slash Commands)

Pour définir les arguments de votre commande, vous devez remplir le tableau statique `arguments`. Chaque objet du tableau représente un argument.

-   **Structure d'un argument** :
    -   `type` (String) : Le type de l'argument (`STRING`, `INTEGER`, `USER`, `CHANNEL`, `ROLE`, etc.).
    -   `name` (String) : Le nom de l'argument (en minuscules, sans espaces).
    -   `description` (String) : La description de l'argument.
    -   `required` (Boolean) : Si l'argument est obligatoire ou non.
    -   `choices` (Array<Object>) : Pour les types `STRING` ou `INTEGER`, vous pouvez fournir une liste de choix prédéfinis. Chaque choix est un objet `{ name: 'Nom Affiche', value: 'valeur_reelle' }`.

### Exemple avec argument

```javascript
// Commandes/say.js

const Command = require('../Class/Command.js');

module.exports = class Say extends Command {
    static id = 'say';
    static description = 'Fait parler le bot';
    static userPermissions = ['ADMINISTRATOR'];
    static botPermissions = ['SEND_MESSAGES'];
    static devBoss = false;
    static home = false;
    static arguments = [
        {
            type: 'STRING',
            name: 'message',
            description: 'Le message que le bot doit répéter',
            required: true
        }
    ];

    async methode(args) {
        // args.message contiendra le message fourni par l'utilisateur
        return args.message;
    }
}
```

## Enregistrement des Commandes

Vous n'avez pas besoin d'enregistrer manuellement vos commandes. Le `CommandManager` parcourt automatiquement le dossier `Commandes/` au démarrage du bot et charge toutes les commandes qu'il y trouve. Si la commande est nouvelle, elle sera automatiquement enregistrée auprès de l'API de Discord en tant que commande slash.
