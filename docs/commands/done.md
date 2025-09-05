---
title: done
layout: default
---

# Commande `done`

## Description

Clos un ticket

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `done` |
| **Description** | Clos un ticket |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

Cette commande n'accepte aucun argument.

## Fonctionnement

- La commande est conçue pour être utilisée dans un salon (canal) qui représente un "ticket".
- Elle vérifie si le nom du salon actuel commence déjà par l'emoji "✅".
- Si ce n'est pas le cas, elle modifie le nom du salon :
    - Elle supprime tout emoji "❌" qui pourrait exister dans le nom.
    - Elle ajoute l'emoji "✅" au début du nom.
- Elle retourne ensuite un message "Ticket clos ! ✅" pour confirmer l'action.
- Si le salon est déjà marqué comme clos (commence par "✅"), elle ne fait rien et retourne un message d'échec.
