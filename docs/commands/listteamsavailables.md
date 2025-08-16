---
title: listteamsavailables
layout: default
---

# Commande `listteamsavailables`

## Description

Renvoie la liste des teams disponibles pour un challenge donné

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `listteamsavailables` |
| **Description** | Renvoie la liste des teams disponibles pour un challenge donné |
| **Permissions User** | `[]` |
| **Permissions Bot** | `['SEND_MESSAGES']` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

La commande accepte un argument optionnel :

-   `challengeid` (nombre entier) : L'identifiant numérique du challenge pour lequel vous souhaitez lister les équipes. Si cet argument n'est pas fourni, la commande listera tous les challenges disponibles.

## Fonctionnement du Code

Cette commande a pour but de lister les équipes participant à un challenge spécifique de l'écosystème Olympe.

1.  **Vérification initiale** : La commande s'assure d'abord que le module Olympe est bien connecté et fonctionnel.

2.  **Comportement sans ID de challenge** : Si l'utilisateur n'a pas fourni d'ID de challenge, la commande va :
    -   Interroger l'API pour obtenir la liste de tous les challenges existants.
    -   Afficher cette liste à l'utilisateur, en indiquant l'ID et le nom de chaque challenge, pour l'inviter à relancer la commande avec un ID précis.

3.  **Comportement avec ID de challenge** : Si un ID de challenge est fourni, la commande va :
    -   Appeler une fonction pour récupérer toutes les équipes inscrites à ce challenge via l'API.
    -   Si aucune équipe n'est trouvée, un message l'indiquant est retourné.
    -   Si des équipes sont trouvées, elle prépare un message listant les noms de toutes les équipes.
    -   **Gestion des limites de Discord** : Pour éviter de dépasser la limite de 2000 caractères par message sur Discord, la commande envoie la liste en plusieurs messages si nécessaire.
    -   Une fois la liste complète envoyée, un message final confirme que l'opération a réussi.

En cas de problème de communication avec l'API à n'importe quelle étape, un message d'erreur est affiché.
