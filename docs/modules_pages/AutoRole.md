---
title: "Module: AutoRole"
layout: default
---

# Module: `AutoRole`

## Rôle

Le module `AutoRole` est conçu pour attribuer automatiquement des rôles aux membres d'un serveur Discord en fonction de critères prédéfinis. C'est un outil puissant pour automatiser la gestion des permissions et des statuts des utilisateurs, en particulier dans les grandes communautés ou les serveurs de jeu.

## Déroulé et Cas d'Usage

Le fonctionnement de `AutoRole` peut être déclenché de plusieurs manières, ce qui le rend très flexible.

### 1. Réaction à l'arrivée de nouveaux membres

C'est le cas d'usage le plus simple. Lorsqu'un nouveau membre rejoint le serveur, le module peut automatiquement lui assigner un rôle de "Nouveau" ou de "Membre", lui donnant accès à certains canaux de base.

*   **Exemple de situation :** Un nouveau joueur rejoint le serveur Discord de votre communauté de jeu. `AutoRole` lui donne immédiatement le rôle "Visiteur", ce qui lui permet de lire les règles et de se présenter dans le canal d'accueil, mais pas encore de rejoindre les canaux de discussion des équipes.

### 2. Synchronisation avec une source de données externe

`AutoRole` peut être couplé avec des modules comme `GetiJsonToDataBase`. Après une mise à jour des données (par exemple, la liste des équipes d'un tournoi), `AutoRole` peut parcourir tous les membres du serveur et mettre à jour leurs rôles en fonction de ces nouvelles informations.

*   **Exemple de situation :** Votre bot vient de synchroniser les dernières informations d'un tournoi. Le joueur "PlayerX" a été promu capitaine de l'équipe "Les Aigles". Le module `AutoRole` détecte ce changement, retire son ancien rôle de "Membre de l'équipe" et lui attribue le rôle "Capitaine", lui donnant de nouvelles permissions, comme la possibilité de déplacer d'autres joueurs dans les canaux vocaux de l'équipe.

### 3. Attribution de rôles basés sur des succès ou des statuts

Le module peut également être utilisé pour récompenser des utilisateurs ou refléter leur statut. Par exemple, si les données externes indiquent qu'un joueur a remporté un certain nombre de matchs, `AutoRole` pourrait lui attribuer un rôle de "Vétéran" ou de "Champion".

*   **Exemple de situation :** Une joueuse, "GameMasterZ", a atteint le statut de "Caster" officiel pour les matchs de la communauté. Le module `AutoRole` lui assigne le rôle "Caster", qui met son nom en évidence dans la liste des membres et lui donne accès à un canal privé pour coordonner les diffusions avec les autres casters.

En résumé, `AutoRole` est un pilier de l'automatisation de la gestion de communauté. Il assure que les bons utilisateurs ont les bons rôles au bon moment, sans intervention manuelle, ce qui permet aux administrateurs de se concentrer sur d'autres tâches.
