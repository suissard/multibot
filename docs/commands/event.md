---
title: event
layout: default
---

# Commande `event`

## Description

N/A

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `event` |
| **Description** | N/A |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `true` |

## Arguments

Cette commande fonctionne avec deux arguments principaux pour gérer différentes actions liées aux événements.

-   `texte` (obligatoire) : Un mot-clé qui définit l'action à réaliser. Les options sont :
    -   `info` : Pour afficher des informations sur les équipes.
    -   `team` : Pour assigner des rôles d'équipe.
    -   `wash` : Pour lancer une procédure de "nettoyage".
-   `users` (optionnel) : Une liste d'utilisateurs. Cet argument n'est nécessaire que lorsque l'argument `texte` est `team`.

## Fonctionnement du Code

Le comportement de la commande dépend entièrement de l'argument `texte` qui lui est passé.

1.  **Action `info`** : Si `texte` est "info", la commande exécute une fonction pour récupérer et afficher un tableau contenant les informations sur les équipes.

2.  **Action `team`** : Si `texte` est "team", la commande vérifie si l'argument `users` a été fourni.
    -   Si oui, elle procède à l'ajout d'un rôle spécifique aux utilisateurs mentionnés.
    -   Si non, elle retourne un message d'erreur demandant de spécifier les utilisateurs.

3.  **Action `wash`** : Si `texte` est "wash", la commande exécute une fonction de "nettoyage" liée à l'événement (`eventWash`).

4.  **Cas par défaut** : Si la valeur de `texte` ne correspond à aucune des actions prédéfinies, un message d'erreur générique est renvoyé, invitant l'utilisateur à contacter un administrateur.
