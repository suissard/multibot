---
title: mute
layout: default
---

# Commande `mute`

## Description

N/A

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `mute` |
| **Description** | N/A |
| **Permissions User** | `['BanMembers']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `true` |

## Arguments

Cette commande sert à restreindre l'accès d'un utilisateur aux canaux du serveur.

-   `user` (utilisateur, obligatoire) : L'utilisateur qui doit être rendu muet.
-   `raison` (texte, optionnel) : La raison de cette sanction, qui sera incluse dans le message de confirmation.

## Fonctionnement du Code

La commande `mute` applique une sanction à un utilisateur, limitant drastiquement sa capacité à interagir sur le serveur. Ce n'est pas un simple silence vocal, mais une restriction d'accès complète.

1.  **Préparation** : La commande s'assure d'abord que les éléments nécessaires à la sanction existent :
    -   Un rôle nommé "mute".
    -   Un canal textuel spécial nommé "tu-as-été-mute". Si ce canal n'existe pas, il est créé et configuré pour être invisible pour les membres standards.

2.  **Vérification du statut** : Elle vérifie si l'utilisateur ciblé possède déjà le rôle "mute". Si c'est le cas, la commande s'arrête et signale que l'utilisateur est déjà sanctionné.

3.  **Application de la Sanction** : Si l'utilisateur n'est pas déjà muet, les actions suivantes sont enchaînées :
    -   Le rôle "mute" est ajouté à l'utilisateur.
    -   Un message est envoyé dans le canal "tu-as-été-mute" pour informer l'utilisateur de sa situation et lui expliquer qu'il peut toujours communiquer avec les administrateurs dans ce canal.
    -   La commande parcourt ensuite **tous les canaux du serveur** un par un. Pour chaque canal, elle modifie ses permissions pour interdire à l'utilisateur sanctionné de le voir.
    -   Simultanément, les permissions du canal "tu-as-été-mute" sont ajustées pour que l'utilisateur puisse y voir les messages et y répondre.

4.  **Confirmation** : Un message de confirmation est envoyé dans le canal où la commande a été lancée, indiquant qui a été sanctionné, par qui, et pour quelle raison si elle a été fournie.
