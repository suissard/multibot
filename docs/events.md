---
title: Événements
layout: default
---
# Gestion des Événements

Ce document explique comment les gestionnaires d'événements (*event handlers*) sont structurés dans le projet, comment en créer de nouveaux, et comment ils sont gérés par l'`EventManager`.

> Pour une description détaillée de chaque événement existant, consultez la **[Liste des Événements](./events-list.md)**.

## La Classe `Event`

Tous les gestionnaires d'événements doivent hériter de la classe de base `Event` située dans `Class/Event.js`. Cette classe fournit le cadre pour écouter et réagir aux événements de l'API Discord.

### Structure d'un Événement

Un gestionnaire d'événement est un fichier JavaScript qui exporte une classe héritant de `Event`. Voici les propriétés statiques à définir :

-   `id` (String) : Un identifiant unique pour ce gestionnaire d'événement (par exemple, `log-messages`). **Requis**.
-   `listener` (String) : Le nom de l'événement de `discord.js` que vous souhaitez écouter (par exemple, `messageCreate`, `guildMemberAdd`). La liste complète des événements est disponible dans la documentation de discord.js. **Requis**.

### La Méthode `handleEvent`

C'est ici que vous définissez la logique à exécuter lorsque l'événement se produit. Vous devez surcharger la méthode `async handleEvent(...args)` dans votre classe.

-   Elle reçoit les mêmes arguments que ceux fournis par l'événement de `discord.js`. Par exemple, pour `messageCreate`, l'argument sera `message`.
-   À l'intérieur de cette méthode, vous pouvez utiliser `this.bot`, qui est l'instance du bot qui a reçu l'événement.

## Comment Créer un Nouveau Gestionnaire d'Événement

1.  **Créer le fichier** : Créez un nouveau fichier JavaScript dans le dossier `Events/` (pour les événements de base) ou dans le dossier de votre module.
2.  **Définir la classe** : Dans ce fichier, créez une classe qui hérite de `Event` et exportez-la.
3.  **Définir les propriétés statiques** : Ajoutez les propriétés statiques `id` et `listener`.
4.  **Implémenter `handleEvent`** : Ajoutez la méthode `handleEvent` et écrivez la logique qui doit s'exécuter lorsque l'événement est déclenché.

## Enregistrement des Gestionnaires d'Événements

Comme pour les commandes, vous n'avez pas besoin d'enregistrer manuellement vos gestionnaires d'événements. L'`EventManager` parcourt automatiquement le dossier `Events/` ainsi que tous les dossiers des modules activés au démarrage du bot.

Pour chaque gestionnaire trouvé, il l'ajoute à la liste des événements disponibles. Ensuite, pour chaque instance de `Bot`, il attache un écouteur pour cet événement, sauf si l'événement est spécifiquement désactivé dans la configuration du bot (via la propriété `unauthorizedEvents`).
