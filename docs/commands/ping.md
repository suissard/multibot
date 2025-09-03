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

## Fonctionnement du Code

```javascript
methode(args = {}) {
        let result = 'Pong';
        if (args.user) result += ' <@' + args.user + '>';
        if (args.texte) result += ` ${args.texte}`;
        return result;
	}
```
