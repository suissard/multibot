---
title: serverinfo
layout: default
---

# Commande `serverinfo`

## Description

Donne des infos sur le serveur

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `serverinfo` |
| **Description** | Donne des infos sur le serveur |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `true` |

## Arguments

Cette commande n'accepte aucun argument.

## Fonctionnement du Code

Cette commande a pour but de fournir un résumé des informations clés concernant le serveur sur lequel elle est exécutée.

1.  **Appel Principal** : La fonction principale de la commande est très concise. Son seul rôle est d'appeler une fonction assistante, `serverInfoEmbed`, en lui passant l'objet représentant le serveur actuel.

2.  **Construction de l'Embed** : La fonction `serverInfoEmbed` est celle qui rassemble et met en forme les données.
    -   Elle commence par récupérer les informations complètes sur le propriétaire du serveur.
    -   Ensuite, elle construit un message "embed" riche et structuré :
        -   **Titre** : Affiche le nom du serveur et le nombre total de membres.
        -   **Miniature** : Utilise l'icône du serveur comme image miniature.
        -   **Description** : Contient les informations détaillées :
            -   Le propriétaire du serveur (mentionné avec son tag Discord).
            -   La date de création du serveur.
            -   Le nombre total de canaux (tous types confondus).
            -   Le nombre total de rôles.

3.  **Retour** : L'embed finalisé est retourné par la fonction assistante, puis par la méthode principale, avant d'être affiché à l'utilisateur.
