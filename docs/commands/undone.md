---
title: undone
layout: default
---

# Commande `undone`

## Description

Rouvre un ticket

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `undone` |
| **Description** | Rouvre un ticket |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

Cette commande n'accepte aucun argument.

## Fonctionnement

- Cette commande est conçue pour être utilisée dans un salon (canal) qui représente un "ticket" qui a été fermé.
- Son but est de rouvrir un ticket.
- Elle vérifie si le nom du salon actuel commence déjà par l'emoji "❌".
- Si ce n'est pas le cas, elle modifie le nom du salon :
    - Elle supprime tout emoji "✅" qui pourrait exister dans le nom (provenant de la commande \`/done\`).
    - Elle ajoute l'emoji "❌" au début du nom pour indiquer que le ticket est de nouveau ouvert ou en attente.
- Elle retourne ensuite un message "Ticket réouvert ! ✅" pour confirmer l'action.
- Si le salon est déjà marqué comme non résolu (commence par "❌"), elle ne fait rien et retourne un message d'échec.
