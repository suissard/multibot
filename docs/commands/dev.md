---
title: dev
layout: default
---

# Commande `dev`

## Description

Execute le code javascript indiqué dans le message

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `dev` |
| **Description** | Execute le code javascript indiqué dans le message |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `true` |
| **Home Server Only** | `true` |

## Arguments

Cette commande n'accepte aucun argument.

## Fonctionnement du Code

Cette commande est conçue pour le développement et offre la possibilité d'exécuter du code JavaScript à la volée.

1.  **Exécution du code** : La commande prend le code fourni en argument et l'exécute en utilisant la fonction `eval`.

2.  **Gestion de la réponse** :
    -   Si le code s'exécute avec succès et retourne un résultat, ce dernier est envoyé en réponse à l'utilisateur.
    -   Si une erreur se produit pendant l'exécution, la commande intercepte l'exception et envoie la trace de la pile (`stack trace`) comme réponse, ce qui est utile pour le débogage.

**Note de sécurité** : L'utilisation de `eval` est potentiellement dangereuse. Cette commande est donc restreinte aux développeurs de confiance (`Dev Boss Only`) et ne peut être utilisée que sur le serveur principal (`Home Server Only`) pour éviter tout abus.
