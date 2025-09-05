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

```javascript
[
        {
            type: 'STRING',
            name: 'status',
            description: 'Status a mettre',
            required: true,
        },
        {
            type: 'STRING',
            name: 'type',
            description: 'Type de status a mettre',
            required: false,
        },
    ]
```

## Fonctionnement

- Cette commande permet de changer le message d'activité (le statut "Joue à...") du bot.
- **Sécurité :** L'exécution est strictement réservée au propriétaire du bot (\`devBoss = true\`).

- **Fonctionnement :**
    1.  La commande prend un argument \`status\` (texte) qui est le message à afficher.
    2.  Elle appelle la méthode \`setActivity()\` sur l'objet \`user\` du bot, en lui passant le texte du statut.
    3.  Elle retourne ensuite un message confirmant que le statut a été mis à jour.
    4.  Note : Un argument \`type\` existe mais n'est pas actuellement utilisé dans le code. La fonctionnalité pour changer le type d'activité (Streaming, Watching, etc.) est présente en commentaire mais n'est pas active.
