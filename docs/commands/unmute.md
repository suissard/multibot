---
title: unmute
layout: default
---

# Commande `unmute`

## Description

N/A

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `unmute` |
| **Description** | N/A |
| **Permissions User** | `['BanMembers']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `true` |

## Arguments

Cette commande annule la sanction de `mute` pour un utilisateur.

-   `user` (utilisateur, obligatoire) : L'utilisateur qui doit être réhabilité.

## Fonctionnement du Code

Cette commande est l'antidote de la commande `mute`. Elle lève la sanction et restaure les permissions de l'utilisateur sur le serveur.

1.  **Préparation** : La commande identifie les éléments clés : l'utilisateur à réhabiliter, le rôle "mute", et le canal spécial "tu-as-été-mute".

2.  **Vérification du Statut** : Elle vérifie si l'utilisateur possède bien le rôle "mute". Si ce n'est pas le cas, la commande s'arrête et signale que l'utilisateur n'est pas sanctionné.

3.  **Restauration des Permissions** : Si l'utilisateur est bien muet, la commande procède à la levée de la sanction :
    -   Elle commence par supprimer le rôle "mute" de l'utilisateur.
    -   Ensuite, elle supprime la permission d'accès spécifique de l'utilisateur au canal "tu-as-été-mute".
    -   Enfin, elle parcourt **tous les autres canaux du serveur** et, pour chacun, supprime les permissions spécifiques qui avaient été mises en place pour l'utilisateur, restaurant ainsi ses droits de lecture et d'écriture par défaut.

4.  **Confirmation** : Un message est envoyé pour confirmer que l'utilisateur a bien été réhabilité.
