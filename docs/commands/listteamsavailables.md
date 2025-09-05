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

```javascript
[
        {
            type: 'INTEGER',
            name: 'challengeid',
            description: 'ID du challenge pour lequel lister les équipes',
            required: false,
        },
    ]
```

## Fonctionnement

- Cette commande a deux modes de fonctionnement en fonction de si un 'challengeid' est fourni.

- **Mode 1 : 'challengeid' non fourni**
    - La commande interroge une API externe (via \`this.bot.olympe.api\`) pour obtenir la liste de tous les challenges disponibles.
    - Elle construit et renvoie un message listant chaque challenge avec son nom et son ID, invitant l'utilisateur à relancer la commande avec un ID spécifique.
    - En cas d'erreur ou si aucun challenge n'est trouvé, un message approprié est renvoyé.

- **Mode 2 : 'challengeid' fourni**
    - La commande utilise la fonction \`getAllTeamsFromChallenge\` pour récupérer toutes les équipes participant au challenge spécifié.
    - Elle prépare une réponse contenant la liste des noms de toutes les équipes trouvées.
    - Pour éviter de dépasser la limite de caractères de Discord (2000), elle envoie la liste en plusieurs messages si nécessaire.
    - Un message final confirme que la liste a été envoyée avec succès.
    - En cas d'erreur ou si aucune équipe n'est trouvée pour le challenge, un message d'erreur est renvoyé.
