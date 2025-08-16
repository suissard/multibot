---
title: setactivity
layout: default
---

# Commande `setactivity`

## Description

change le status du bot

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `setactivity` |
| **Description** | change le status du bot |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `true` |
| **Home Server Only** | `false` |

## Arguments

Cette commande, réservée aux développeurs, permet de changer le statut d'activité du bot affiché sur Discord.

-   `status` (texte, obligatoire) : Le texte qui sera affiché comme statut du bot (par exemple, "Joue à Minecraft").
-   `type` (texte, optionnel) : Le type d'activité (par exemple, "PLAYING", "STREAMING", "LISTENING"). *Note : cette fonctionnalité n'est pas encore totalement implémentée.*

## Fonctionnement du Code

Cette commande modifie le statut "Joue à..." du bot visible par tous les utilisateurs sur Discord.

Son fonctionnement est simple : elle prend le texte fourni dans l'argument `status` et l'utilise pour mettre à jour l'activité du bot via la fonction `setActivity` de l'API Discord.js.

Actuellement, la commande ne change que le texte de l'activité. Une version plus avancée permettant de changer également le type d'activité (comme "Écoute...", "Regarde...") est envisagée mais pas encore active.

Après avoir changé le statut, la commande renvoie un message pour confirmer que la mise à jour a été effectuée.
