---
title: test
layout: default
---

# Commande `test`

## Description

Test une commande ou serie de commandes

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `test` |
| **Description** | Test une commande ou serie de commandes |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

Cette commande est un outil de débogage conçu pour tester la manière dont le bot interprète les différents types d'arguments. Elle accepte une large gamme d'arguments optionnels, couvrant tous les principaux types de données de Discord :

-   `string` (texte)
-   `integer` (nombre entier)
-   `boolean` (vrai/faux)
-   `user` (utilisateur)
-   `channel` (canal)
-   `role` (rôle)
-   `mentionable` (mentionable : rôle ou utilisateur)
-   `attachement` (pièce jointe)

Vous pouvez fournir n'importe quelle combinaison de ces arguments pour voir comment ils sont traités.

## Fonctionnement du Code

Le but de cette commande est de vérifier que le bot reçoit et interprète correctement les données envoyées par Discord.

Lorsqu'elle est exécutée, la commande ne fait qu'une seule chose : elle prend l'objet contenant tous les arguments que vous avez fournis, le convertit en une chaîne de caractères au format JSON, et vous le renvoie dans un bloc de code.

La réponse est précédée d'un "test OK" pour confirmer que la commande a bien fonctionné. Cela permet aux développeurs de voir la structure exacte des données pour chaque type d'argument et de s'assurer que tout est traité comme prévu.
