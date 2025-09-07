---
title: "Liste et Déroulé des Modules"
layout: default
---

# Liste et Déroulé des Modules

Ce document présente les modules du bot, leur rôle, et comment ils s'articulent les uns avec les autres pour créer des fonctionnalités complexes.

## Qu'est-ce qu'un module ?

Comme décrit dans la section [Modules](./modules.md), un module est une brique fonctionnelle autonome. Certains modules sont indépendants, tandis que d'autres collaborent pour réaliser des tâches plus complexes.

## Fonctionnalités de Base

En plus des modules, le bot dispose de fonctionnalités de base intégrées qui ne sont pas modulaires.

- **[Système de Rôles par Réaction (EmoteMessage)](./emote-message.md)**
  - **Rôle :** Permet aux utilisateurs d'obtenir des rôles en réagissant à un message.
  - **Déroulé :** Un administrateur configure un message spécifique. Lorsque les utilisateurs ajoutent ou retirent des réactions sur ce message, le bot leur attribue ou retire automatiquement les rôles correspondants.

## Les modules principaux et leur interaction

Voici une description des modules et de leur ordre logique de fonctionnement.

1.  **`GetiJsonToDataBase`** ([Voir la documentation détaillée](./modules_pages/GetiJsonToDataBase.md))
    *   **Rôle :** C'est le point de départ de nombreuses interactions. Ce module est responsable de la synchronisation des données depuis une source externe (probablement un fichier JSON ou une API) vers la base de données interne du bot.
    *   **Déroulé :** Il est souvent exécuté périodiquement ou manuellement pour s'assurer que le bot dispose des informations les plus à jour, comme les listes de joueurs, les équipes, ou les matchs à venir.

2.  **`ChannelManager`** ([Voir la documentation détaillée](./modules_pages/ChannelManager.md))
    *   **Rôle :** Gère la création, la suppression et la gestion des canaux (channels) de manière automatisée.
    *   **Déroulé :** Ce module est souvent déclenché par des événements ou d'autres commandes. Par exemple, après que `GetiJsonToDataBase` a importé un nouveau match, `ChannelManager` pourrait automatiquement créer un canal de discussion privé pour les deux équipes de ce match.

3.  **`AutoRole`** ([Voir la documentation détaillée](./modules_pages/AutoRole.md))
    *   **Rôle :** Attribue automatiquement des rôles aux membres en fonction de critères prédéfinis.
    *   **Déroulé :** Ce module peut fonctionner de plusieurs manières :
        *   Il peut réagir à l'arrivée d'un nouveau membre sur le serveur.
        *   Il peut être lié à `GetiJsonToDataBase` : après une mise à jour des équipes, `AutoRole` pourrait scanner les membres et leur attribuer les rôles correspondants à leur nouvelle équipe.

4.  **`MatchNotifier`** ([Voir la documentation détaillée](./modules_pages/MatchNotifier.md))
    *   **Rôle :** Notifie les utilisateurs des matchs à venir.
    *   **Déroulé :** Ce module dépend des données synchronisées par `GetiJsonToDataBase`. Il surveille la base de données et, lorsqu'un match est sur le point de commencer, il envoie une notification dans un canal spécifié, en mentionnant potentiellement les joueurs concernés grâce aux rôles gérés par `AutoRole`.

5.  **`Secretary`** ([Voir la documentation détaillée](./modules_pages/Secretary.md))
    *   **Rôle :** Gère un système de "secrétariat" pour les messages privés. Il permet aux utilisateurs de contacter le staff en envoyant un message privé au bot, qui le transfère dans un salon dédié.
    *   **Déroulé :** Un utilisateur envoie un DM au bot. Le module crée un salon privé sur un serveur de staff et y poste le message de l'utilisateur. Le staff peut répondre directement dans ce salon, et la réponse est renvoyée en DM à l'utilisateur.

6.  **`ShareChannel`** ([Voir la documentation détaillée](./modules_pages/ShareChannel.md))
    *   **Rôle :** Permet de partager le contenu d'un canal (channel) d'un serveur à un autre.
    *   **Déroulé :** Un administrateur configure un canal à "partager". Le module écoute alors tous les messages de ce canal et les republie automatiquement dans un canal d'un autre serveur, permettant une communication inter-serveurs.

7.  **`VocalDuplicate`** ([Voir la documentation détaillée](./modules_pages/VocalDuplicate.md))
    *   **Rôle :** Crée dynamiquement des copies de canaux vocaux lorsque ceux-ci sont pleins.
    *   **Déroulé :** Le module surveille les canaux vocaux configurés. Si un utilisateur rejoint un canal vocal et que celui-ci atteint sa capacité maximale, le module crée instantanément un nouveau canal vocal identique (par exemple, "Général #2") pour accueillir plus de monde.

## Schéma de collaboration

On peut imaginer le flux de données suivant pour une fonctionnalité de tournoi :

`GetiJsonToDataBase` (importe les équipes/matchs) -> `AutoRole` (donne les rôles aux joueurs) -> `ChannelManager` (crée les canaux pour les matchs) -> `MatchNotifier` (prévient les joueurs avant le match).

Chaque module reste indépendant, mais leur orchestration permet de créer un système de gestion de tournoi entièrement automatisé.
