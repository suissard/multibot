---
title: "Module: ChannelManager"
layout: default
---

# Module: `ChannelManager`

## Rôle

Le module `ChannelManager` est le gestionnaire automatisé des canaux (channels) du serveur. Son rôle principal est de créer, configurer, et archiver les canaux de manière dynamique en réponse à des événements spécifiques, comme la planification d'un match de tournoi.

## Déroulé et Cas d'Usage

`ChannelManager` est souvent le maillon d'une chaîne d'automatisation, se déclenchant après que d'autres modules ont préparé le terrain.

### 1. Création de Canaux de Match

C'est la fonctionnalité centrale du module. Lorsqu'un nouveau match est enregistré dans le système (par exemple, par `GetiJsonToDataBase`), `ChannelManager` peut automatiquement créer un ensemble de canaux dédiés à ce match.

*   **Exemple de situation :** Un match de tournoi entre "Équipe A" et "Équipe B" est annoncé. `ChannelManager` entre en action et crée :
    *   Un canal textuel privé `#match-avsb` accessible uniquement aux joueurs des deux équipes et aux organisateurs.
    *   Un canal vocal privé `Vocal A vs B` pour que les équipes puissent communiquer pendant le match.
    *   Le module configure également les permissions de ces canaux pour s'assurer que seuls les membres autorisés peuvent y accéder.

### 2. Gestion du Cycle de Vie des Canaux

Les canaux créés ne sont pas destinés à être permanents. `ChannelManager` gère également leur suppression ou leur archivage une fois qu'ils ne sont plus nécessaires.

*   **Exemple de situation :** Le match entre "Équipe A" et "Équipe B" est terminé. Quelques heures plus tard, `ChannelManager` archive automatiquement le canal textuel en le déplaçant dans une catégorie "Archives" en lecture seule, et supprime le canal vocal pour ne pas encombrer la liste des canaux.

### 3. Canaux à la Demande

Le module peut aussi être configuré pour créer des canaux temporaires à la demande des utilisateurs, via une commande.

*   **Exemple de situation :** Un groupe de joueurs souhaite créer un salon privé pour discuter d'une stratégie. Un joueur utilise la commande `/creer-salon-prive` et le `ChannelManager` génère un nouveau canal textuel et vocal temporaire, en invitant les joueurs mentionnés. Le canal est automatiquement supprimé après quelques heures d'inactivité.

En bref, `ChannelManager` est un outil essentiel pour maintenir un serveur Discord organisé et dynamique, en particulier lors d'événements comme des tournois. Il élimine le besoin pour les administrateurs de créer et gérer manuellement des dizaines de canaux, tout en offrant aux utilisateurs des espaces de discussion privés et pertinents au moment où ils en ont besoin.
