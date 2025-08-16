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

## Fonctionnement du Code

Cette commande a pour but de marquer un canal (ou "ticket") comme étant "terminé" ou "résolu".

1.  **Vérification du statut** : La commande vérifie d'abord si le nom du canal où elle est exécutée commence déjà par l'icône ✅.

2.  **Action de clôture** :
    -   Si le canal n'est pas déjà marqué comme clos (ne commence pas par ✅), la commande modifie son nom. Elle ajoute l'icône ✅ au début et supprime toute icône ❌ qui pourrait s'y trouver. Un message de confirmation "Ticket clos ! ✅" est ensuite envoyé.
    -   Si le canal est déjà marqué comme clos, la commande n'effectue aucune action et retourne un message indiquant que l'opération ne peut pas être effectuée.
