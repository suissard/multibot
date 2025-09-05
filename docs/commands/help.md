---
title: help
layout: default
---

# Commande `help`

## Description

Permet d\obtenir le détail des commandes

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `help` |
| **Description** | Permet d\obtenir le détail des commandes |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `true` |

## Arguments

Cette commande n'accepte aucun argument.

## Fonctionnement

- Cette commande a deux modes de fonctionnement :
    1.  **Afficher la liste de toutes les commandes :** Si aucun nom de commande spécifique n'est fourni.
    2.  **Afficher les détails d'une commande :** Si un nom de commande est passé en argument.

- **Mode Liste :**
    - La commande récupère la liste de toutes les commandes enregistrées dans le bot.
    - Elle filtre les commandes qui ne sont pas destinées à être affichées publiquement (celles avec \`help = false\`), à moins que l'utilisateur ne soit un développeur.
    - Elle construit un ou plusieurs messages "embed" pour afficher la liste. Si la liste est trop longue (plus de 20 commandes), elle est automatiquement divisée en plusieurs messages.
    - Chaque commande dans la liste est affichée avec son nom et sa description.

- **Mode Détail :**
    - Si l'utilisateur fournit un nom de commande valide, la commande recherche cette commande spécifique.
    - Elle génère un message "embed" détaillé qui inclut :
        - Le nom de la commande.
        - Sa description.
        - Des instructions sur comment l'utiliser (\`howTo\`), en remplaçant les placeholders comme 'PREFIX' par la configuration actuelle du bot.
