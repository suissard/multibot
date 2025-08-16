---
title: updateteam
layout: default
---

# Commande `updateteam`

## Description

Met à jour une équipe

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `updateteam` |
| **Description** | Met à jour une équipe |
| **Permissions User** | `['ManageRoles']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

Cette commande permet de modifier les informations d'une équipe existante.

-   `teamname` (texte, obligatoire) : Le nom actuel de l'équipe que vous souhaitez modifier.
-   `newteamname` (texte, optionnel) : Le nouveau nom que vous souhaitez donner à l'équipe.
-   `newcap` (utilisateur, optionnel) : La mention du nouveau capitaine.
-   `newbtag` (texte, optionnel) : Le nouveau BattleTag du capitaine. Cet argument est **obligatoire** si vous changez de capitaine.
-   `newrank` (nombre entier, optionnel) : Le nouveau classement (Elo) de l'équipe.

*Note : Vous devez fournir au moins une des options de modification pour que la commande fonctionne.*

## Fonctionnement du Code

La commande `updateteam` est un outil de gestion qui permet de mettre à jour les détails d'une équipe déjà enregistrée, en modifiant ses informations sur Discord et dans la base de données interne.

1.  **Identification de l'Équipe** : La commande commence par utiliser le `teamname` fourni pour retrouver tous les éléments associés à l'équipe : son rôle Discord, son canal privé, son capitaine actuel et ses données en base de données. Si l'un de ces éléments est introuvable, la commande s'arrête.

2.  **Mises à Jour Modulaires** : En fonction des arguments que vous fournissez, la commande effectue différentes actions, qui peuvent être combinées :
    -   **Changement de nom (`newteamname`)** : Si un nouveau nom est fourni, la commande renomme à la fois le rôle de l'équipe et son canal privé.
    -   **Changement de capitaine (`newcap` et `newbtag`)** : Si un nouveau capitaine et son BattleTag sont fournis, la commande transfère le rôle "Capitaine" de l'ancien au nouveau capitaine et met à jour le BattleTag dans la base de données.
    -   **Changement de classement (`newrank`)** : Si un nouveau classement est fourni, la commande met à jour cette information dans la base de données.

3.  **Validation et Confirmation** : La commande vérifie qu'au moins une modification a été demandée. Si toutes les modifications sont effectuées avec succès, elle renvoie un message confirmant que l'équipe a été mise à jour.
