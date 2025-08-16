---
title: ping
layout: default
---

# Commande `ping`

## Description

Répond pong

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `ping` |
| **Description** | Répond pong |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

La commande peut prendre deux arguments optionnels pour personnaliser le message de retour :

-   `texte` : Permet d'ajouter une chaîne de caractères au message. Le texte fourni sera ajouté après "Pong".
-   `user` : Permet de mentionner un utilisateur dans la réponse.

## Fonctionnement du Code

Le script de la commande `ping` est conçu pour être simple et réactif. Voici son déroulement :

1.  **Initialisation** : La commande commence par préparer une réponse de base, qui est la chaîne de caractères "Pong".

2.  **Personnalisation (optionnelle)** :
    -   Si un argument `user` est fourni, la commande ajoute à la réponse une mention à cet utilisateur.
    -   Si un argument `texte` est fourni, la commande ajoute ce texte à la suite du message.

3.  **Envoi** : La commande retourne la chaîne de caractères finale, qui est ensuite envoyée sur le canal où la commande a été appelée. Par exemple, si un utilisateur `JohnDoe` est mentionné avec le texte "ça va ?", la réponse sera `Pong @JohnDoe ça va ?`.
