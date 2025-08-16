---
title: testCommand
layout: default
---

# Commande `testCommand`

## Description

N/A

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `testCommand` |
| **Description** | N/A |
| **Permissions User** | `['BanMembers']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `true` |
| **Home Server Only** | `false` |

## Arguments

Cette commande, réservée aux développeurs, est un outil pour lancer les suites de tests intégrés d'autres commandes. Elle peut être utilisée de deux manières :

-   `nom_de_commande` (texte, optionnel) : Pour tester une seule commande. Fournissez son nom exact.
-   `noms_des_commandes` (texte, optionnel) : Pour tester plusieurs commandes en une seule fois. Fournissez les noms des commandes séparés par des espaces.

*Note : Vous devez utiliser l'un ou l'autre de ces arguments, mais pas les deux en même temps.*

## Fonctionnement du Code

Cette commande sert de point d'entrée pour exécuter des tests automatisés sur d'autres commandes du bot.

1.  **Test d'une Commande Unique** : Si l'argument `nom_de_commande` est utilisé, la commande effectue les étapes suivantes :
    -   Elle vérifie d'abord si la commande spécifiée existe et si un processus de test lui est bien associé.
    -   Si ce n'est pas le cas, elle retourne un message d'erreur.
    -   Sinon, elle lance le processus de test pour cette commande.
    -   Une fois le test terminé, elle affiche un message de succès.

2.  **Test de Commandes Multiples** : Si l'argument `noms_des_commandes` est utilisé :
    -   La commande découpe la chaîne de texte pour obtenir une liste de noms de commandes.
    -   Elle parcourt cette liste et, pour chaque nom, exécute le même processus de vérification et de test que pour une commande unique.
    -   **Important** : Si une seule des commandes de la liste n'existe pas ou n'a pas de test, le processus s'arrête immédiatement avec un message d'erreur.
    -   Si tous les tests sont lancés avec succès, un message final récapitule toutes les commandes qui ont été testées.

3.  **Aucun Argument** : Si aucun argument n'est fourni, la commande renvoie un message demandant de spécifier quelle(s) commande(s) tester.
