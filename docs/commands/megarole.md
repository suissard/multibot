---
title: megarole
layout: default
---

# Commande `megarole`

## Description

N/A

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `megarole` |
| **Description** | N/A |
| **Permissions User** | `['ManageRoles']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `true` |

## Arguments

Cette commande permet d'ajouter ou de supprimer en masse un ou plusieurs rôles à tous les membres du serveur. Elle accepte les arguments suivants :

-   `del` (booléen, obligatoire) : C'est le commutateur d'action. Mettez `true` pour supprimer les rôles spécifiés de tous les membres, ou `false` pour les leur ajouter.
-   `role` (rôle, optionnel) : Permet de spécifier un rôle unique à traiter.
-   `multipleroles` (texte, optionnel) : Permet de spécifier plusieurs rôles à la fois, sous forme de texte (par exemple, en les listant).

*Note : Vous devez fournir au moins l'argument `role` ou `multipleroles`.*

## Fonctionnement du Code

Cette commande est un outil puissant pour la gestion des rôles à l'échelle d'un serveur entier. Voici comment elle opère :

1.  **Mise à jour des données** : Pour commencer, la commande rafraîchit la liste de tous les membres du serveur pour s'assurer qu'elle travaille avec les informations les plus récentes.

2.  **Collecte des rôles** : La commande identifie les rôles à traiter en se basant sur les arguments fournis :
    -   Si l'argument `role` est utilisé, ce rôle est ajouté à une liste de traitement.
    -   Si l'argument `multipleroles` est utilisé, la commande analyse le texte pour en extraire les différents rôles et les ajoute à la liste.
    -   Si aucun de ces deux arguments n'est fourni, la commande s'arrête et signale qu'il manque un rôle à traiter.

3.  **Action sur les membres** : Une fois la liste des rôles et la liste de tous les membres prêtes, la commande délègue l'action principale à une autre fonction. Cette fonction se charge de parcourir chaque membre du serveur et, en fonction de la valeur de l'argument `del` (`true` ou `false`), d'ajouter ou de retirer les rôles collectés.

4.  **Confirmation** : Après avoir terminé l'opération sur tous les membres, la commande renvoie un message confirmant que la tâche a été effectuée.
