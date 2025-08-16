---
title: restart
layout: default
---

# Commande `restart`

## Description

redemarre le bot

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `restart` |
| **Description** | redemarre le bot |
| **Permissions User** | `['Administrator']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `true` |
| **Home Server Only** | `true` |

## Arguments

La commande accepte un argument optionnel :

-   `raison` (texte, optionnel) : Permet de spécifier une raison pour le redémarrage, qui sera affichée dans le message de confirmation.

## Fonctionnement du Code

Cette commande permet de redémarrer le processus du bot. C'est une commande critique, et son accès est donc hautement restreint.

1.  **Vérification des droits** : Avant toute chose, la commande vérifie si l'utilisateur qui l'invoque est bien le propriétaire officiel du bot (tel que défini dans sa configuration). Bien que les permissions de la commande limitent déjà son usage, cette vérification interne ajoute une couche de sécurité supplémentaire. Si l'utilisateur n'est pas le propriétaire, la commande renvoie un message d'erreur et s'arrête immédiatement.

2.  **Procédure de redémarrage** : Si l'utilisateur est bien le propriétaire, la commande exécute les actions suivantes :
    -   Elle prépare un message de confirmation. Si une raison a été fournie en argument, elle est ajoutée à ce message.
    -   Elle appelle la fonction `restart()` de l'objet bot, qui déclenche la séquence de redémarrage du processus.
    -   Elle retourne le message de confirmation.

*Note : Le message de confirmation est envoyé juste avant que le bot ne s'éteigne. Il peut y avoir un court délai avant que le bot ne soit de nouveau en ligne.*
