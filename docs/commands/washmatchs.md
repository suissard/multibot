---
title: washmatchs
layout: default
---

# Commande `washmatchs`

## Description

Supprime les channels de matchs

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `washmatchs` |
| **Description** | Supprime les channels de matchs |
| **Permissions User** | `["ManageChannels"]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

Cette commande n'accepte aucun argument.

## Fonctionnement

- Cette commande permet de lancer manuellement le processus de nettoyage des anciens salons de match.
- Elle nécessite la permission "Gérer les salons" (\`ManageChannels\`).

- **Fonctionnement :**
    1.  La commande appelle la fonction \`washOldChannels()\`.
    2.  Cette fonction est responsable de parcourir les salons du serveur, d'identifier ceux qui sont liés à des matchs terminés, et de les supprimer.
    3.  Un argument \`exceptionName\` (actuellement vide) pourrait permettre d'exclure certains salons du nettoyage.
    4.  Un argument booléen (ici \`true\`) semble forcer l'action de suppression.
    5.  La commande renvoie immédiatement un message "⏳ Channels en cours de suppression..." pour indiquer que le processus est lancé en arrière-plan.
    6.  Une fois le nettoyage terminé, un second message "Channels supprimé avec succés !" est envoyé.
