---
title: serverinfo
layout: default
---

# `serverinfo`

## Description

Donne des infos sur le serveur

## Narrative


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


Exécute la commande serverinfo. Génère et retourne un embed contenant les informations du serveur actuel.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `args` | `object` | - Les arguments de la commande (non utilisés ici). |

**Returns:** `Promise<Discord.EmbedBuilder>` - avec les informations du serveur.

Crée et retourne un `EmbedBuilder` avec les informations d'un serveur.

**Parameters:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `guild` | `Discord.Guild` | - L'objet Guild du serveur dont il faut extraire les informations. |

**Returns:** `Promise<Discord.EmbedBuilder>` - EmbedBuilder contenant les informations formatées du serveur.

