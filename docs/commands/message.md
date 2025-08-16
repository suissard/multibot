---
title: message
layout: default
---

# Commande `message`

## Description

N/A

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `message` |
| **Description** | N/A |
| **Permissions User** | `['BanMembers']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `true` |

## Arguments

Cette commande permet d'envoyer des messages privés (DM) à des utilisateurs ou des groupes d'utilisateurs. Elle est très flexible grâce à ses nombreux arguments :

-   `texte` (texte, obligatoire) : Le contenu du message à envoyer. Vous pouvez utiliser `\\n` pour insérer un saut de ligne.
-   `sendsecretary` (booléen, obligatoire) : Si mis à `true`, une copie ou une notification du message envoyé sera transmise au système de "secrétariat" du bot.
-   `user` (utilisateur, optionnel) : Pour envoyer le message à un seul utilisateur spécifique.
-   `role` (rôle, optionnel) : Pour envoyer le message à tous les utilisateurs possédant ce rôle.
-   `usersandroles` (texte, optionnel) : Pour cibler plusieurs utilisateurs et/ou rôles en même temps dans une seule chaîne de texte.
-   `imageurl` (URL, optionnel) : L'URL d'une image à joindre au message.

*Note : Vous devez spécifier une cible en utilisant au moins l'un des arguments suivants : `user`, `role`, ou `usersandroles`.*

## Fonctionnement du Code

Cette commande est un outil de communication de masse qui envoie des messages privés personnalisés.

1.  **Définition de la Cible** : La première étape consiste à déterminer les destinataires. La commande analyse les arguments pour construire une liste d'utilisateurs unique, en suivant cet ordre de priorité :
    -   Un utilisateur unique via l'argument `user`.
    -   Tous les membres d'un rôle via l'argument `role`.
    -   Une liste mixte d'utilisateurs et de membres de rôles via l'argument `usersandroles`.
    -   Si aucune cible n'est définie, une erreur est retournée.

2.  **Préparation du Message** : Le message est construit sous la forme d'un "embed" Discord :
    -   Le texte principal est défini par l'argument `texte`, avec la prise en charge des sauts de ligne.
    -   Le message inclut l'avatar du bot comme miniature.
    -   Si une URL d'image est fournie, elle est intégrée à l'embed.

3.  **Envoi en Masse** : La commande parcourt la liste des destinataires et envoie à chacun le message embed en message privé. L'envoi est géré par une fonction qui affiche probablement un indicateur de chargement.

4.  **Lien avec le Secrétariat** : Si l'option `sendsecretary` est activée, après chaque envoi réussi, la commande simule un événement de message pour le module "secrétariat". Cela permet de garder une trace ou de traiter les messages envoyés via ce système interne, même s'ils sont envoyés en privé.

5.  **Confirmation Finale** : Une fois tous les messages envoyés, la commande répond avec un message de confirmation.
