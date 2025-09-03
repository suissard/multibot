---
title: test
layout: default
---

# Commande `test`

## Description

Test une commande ou serie de commandes

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `test` |
| **Description** | Test une commande ou serie de commandes |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

```javascript
[
        {
            type: 'STRING',
            name: 'string',
            description: 'un texte',
            required: false,
        },
        {
            type: 'INTEGER',
            name: 'integer',
            description: 'un chiffre',
            required: false,
        },
        {
            type: 'BOOLEAN',
            name: 'boolean',
            description: 'un boolean',
            required: false,
        },
        {
            type: 'USER',
            name: 'user',
            description: 'un utilisateur',
            required: false,
        },
        {
            type: 'CHANNEL',
            name: 'channel',
            description: 'un channel',
            required: false,
        },
        {
            type: 'ROLE',
            name: 'role',
            description: 'un role',
            required: false,
        },
        {
            type: 'MENTIONABLE',
            name: 'mentionable',
            description: 'une mention',
            required: false,
        },
        {
            type: 'ATTACHMENT',
            name: 'attachement',
            description: 'une piece jointe',
            required: false,
        },
    ]
```

## Fonctionnement du Code

```javascript
async methode(args = {}) {

        return 'test OK\n```json\n' + JSON.stringify(args);
        +'\n```';
	}
```
