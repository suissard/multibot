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

## Fonctionnement du Code

Cette commande sert à marquer un canal (ou "ticket") comme étant non résolu ou nécessitant une attention particulière. C'est l'inverse de la commande `done`.

1.  **Vérification du Statut** : La commande regarde d'abord si le nom du canal où elle est utilisée commence déjà par l'icône ❌.

2.  **Action de Réouverture** :
    -   Si le canal n'est pas déjà marqué comme "non résolu" (ne commence pas par ❌), la commande modifie son nom. Elle ajoute l'icône ❌ au début et s'assure de supprimer toute icône ✅ qui aurait pu s'y trouver. Un message de confirmation est ensuite envoyé.
    -   Si le canal est déjà marqué avec un ❌, la commande considère que l'opération n'est pas nécessaire et retourne un message indiquant que le ticket n'a pas pu être rouvert.
