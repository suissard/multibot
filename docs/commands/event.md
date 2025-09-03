---
title: event
layout: default
---

# Commande `event`

## Description

Gère les événements, incluant laffichage dinfos, la gestion des équipes et le nettoyage.

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `event` |
| **Description** | Gère les événements, incluant laffichage dinfos, la gestion des équipes et le nettoyage. |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `true` |

## Arguments

```javascript
[
        {
            type: 'STRING',
            name: 'texte',
            description: 'info = tableau des teams, team = ajout de rôle team',
            required: true,
        },
        {
            type: 'STRING',
            name: 'users',
            description: 'user aux quels il faut ajouter le rôle de team',
            required: false,
        },
    ]
```

## Fonctionnement du Code

```javascript
async methode(args = {}) {
        if (args.texte.toLowerCase() == 'info') {
            return await this.info();
	}
```
