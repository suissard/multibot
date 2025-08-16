---
title: setteam
layout: default
---

# Commande `setteam`

## Description

N/A

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `setteam` |
| **Description** | N/A |
| **Permissions User** | `['ManageRoles']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `true` |

## Arguments

Cette commande est utilisée pour enregistrer une nouvelle équipe sur le serveur. Elle nécessite les quatre arguments suivants :

-   `teamname` (texte, obligatoire) : Le nom officiel de l'équipe.
-   `btag` (texte, obligatoire) : Le BattleTag (ou identifiant de jeu) du capitaine de l'équipe.
-   `capitaine` (utilisateur, obligatoire) : Une mention de l'utilisateur Discord qui est le capitaine.
-   `elo` (texte, obligatoire) : Le niveau ou le classement (Elo) de l'équipe.

## Fonctionnement du Code

La commande `setteam` automatise entièrement le processus de création et de configuration d'une nouvelle équipe sur le serveur. L'opération se déroule en arrière-plan pour ne pas bloquer le bot.

1.  **Réponse Initiale** : Dès que la commande est lancée, elle envoie un message informant que la création de l'équipe est en cours.

2.  **Gestion des Rôles (en arrière-plan)** : La commande commence par déterminer les rôles Discord nécessaires pour l'équipe : un rôle pour les membres de l'équipe et un rôle spécifique pour le capitaine.

3.  **Création des Infrastructures (en arrière-plan)** : Une fois les rôles définis, la commande procède à la création d'un canal privé (textuel et/ou vocal) pour l'équipe. Les permissions de ce canal sont automatiquement configurées pour n'être accessibles qu'aux membres ayant le rôle de l'équipe. Le capitaine se voit également attribuer ses rôles.

4.  **Annonce Finale (en arrière-plan)** : Lorsque toute la configuration est terminée, un message "embed" final est envoyé. Cet embed annonce publiquement la création de la nouvelle équipe, en récapitulant son nom, son capitaine (avec sa mention et son BattleTag) et son classement Elo.
