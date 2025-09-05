---
title: ping
layout: default
---

# Commande `ping`

## Description

Répond pong

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `ping` |
| **Description** | Répond pong |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

```javascript
[
        {
            type: 'STRING',
            name: 'texte',
            description: 'Texte à envoyer',
            required: false,
        },
        {
            type: 'USER',
            name: 'user',
            description: 'Mentionner un user à ping',
            required: false,
        },
    ]
```

## Fonctionnement

- La commande répond simplement "Pong".
- Si un argument 'user' est fourni, elle mentionne l'utilisateur.
- Si un argument 'texte' est fourni, elle ajoute le texte à la réponse.
