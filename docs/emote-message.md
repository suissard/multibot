---
title: "Système de Rôles par Réaction (EmoteMessage)"
layout: default
---
# Système de Rôles par Réaction (EmoteMessage)

Le système `EmoteMessage` est une fonctionnalité de base du bot qui permet aux utilisateurs d'obtenir ou de se retirer des rôles en réagissant à un message spécifique avec des émoticônes. Ce n'est pas un module activable, mais une fonctionnalité centrale gérée par le bot.

## Cas d'Usage

Cette fonctionnalité est idéale pour :
-   Permettre aux utilisateurs de choisir les notifications qu'ils souhaitent recevoir (par exemple, réagir avec 📢 pour le rôle "Annonces").
-   Laisser les membres s'auto-attribuer des rôles liés à des jeux ou des centres d'intérêt.
-   Créer un message d'acceptation des règles où les utilisateurs doivent réagir pour accéder au reste du serveur.

## Comment ça fonctionne ?

1.  **Configuration** : Un administrateur configure un `EmoteMessage` via une base de données (probablement Strapi). Cette configuration inclut :
    *   L'ID du serveur (guild).
    *   L'ID du salon (channel).
    *   L'ID du message sur lequel les utilisateurs réagiront.
    *   Un dictionnaire qui associe une émoticône (standard ou personnalisée) à un ID de rôle.

2.  **Initialisation** : Au démarrage, le bot charge ces configurations. Il vérifie qu'il a accès au serveur, au salon et au message, puis il ajoute toutes les émoticônes configurées comme réactions sur le message cible.

3.  **Gestion des Réactions** :
    *   **Ajout d'une réaction** : Lorsqu'un utilisateur ajoute une réaction au message, le bot vérifie si cette émoticône est dans la configuration. Si c'est le cas, il attribue le rôle correspondant à l'utilisateur.
    *   **Retrait d'une réaction** : Si un utilisateur retire sa réaction, le bot lui retire le rôle correspondant.

Le bot envoie également un message privé à l'utilisateur pour l'informer que le rôle a été ajouté ou retiré.

## Configuration Requise

La configuration des `EmoteMessage` se fait en dehors du fichier `configs.json`, généralement dans une base de données externe connectée au bot. Chaque entrée doit contenir :

-   `guild`: L'ID du serveur Discord.
-   `channel`: L'ID du salon où se trouve le message.
-   `message`: L'ID du message.
-   `emotes`: Un objet où les clés sont les émoticônes (soit le caractère, soit l'ID de l'émoticône personnalisée) et les valeurs sont l'ID du rôle à attribuer, préfixé par `ROLE:`.

**Exemple de structure de données :**

```json
{
  "guild": "879413285455679528",
  "channel": "1022444927167778816",
  "message": "1156554527188734023",
  "emotes": {
    "👍": "ROLE:1022443629383323709",
    "🚀": "ROLE:1022443682572627998"
  }
}
```

## Points Techniques

-   La logique est gérée par la classe `EmoteMessage` (`Class/EmoteMessage.js`) et le manager `EmoteMessageManager` (`Class/EmoteMessageManager.js`).
-   Les événements `messageReactionAdd` et `messageReactionRemove` sont écoutés globalement par le bot pour déclencher cette fonctionnalité.
-   Il est crucial que le bot ait les permissions nécessaires pour voir le salon, lire l'historique des messages, ajouter des réactions et gérer les rôles. Si un rôle est plus élevé dans la hiérarchie que le rôle du bot, l'attribution échouera.
