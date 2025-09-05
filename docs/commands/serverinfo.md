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

## Fonctionnement

- La commande est conçue pour afficher des informations clés sur le serveur Discord où elle est exécutée.
- Elle ne nécessite aucune permission particulière pour être utilisée.

- **Fonctionnement :**
    1.  La commande récupère l'objet "guild" (serveur) actuel.
    2.  Elle fait un appel à l'API de Discord pour obtenir les informations sur le propriétaire du serveur, notamment son tag (nom#discriminant).
    3.  Elle construit un message "embed" qui contient les informations suivantes :
        - **Titre :** Le nom du serveur et le nombre total de membres.
        - **Miniature (Thumbnail) :** L'icône du serveur.
        - **Description :**
            - La mention du propriétaire du serveur et son tag.
            - La date de création du serveur.
            - Le nombre total de salons (channels).
            - Le nombre total de rôles.
    4.  Elle retourne cet embed pour qu'il soit affiché dans le salon.
