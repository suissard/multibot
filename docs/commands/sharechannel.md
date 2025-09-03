---
title: sharechannel
layout: default
---

# Commande `sharechannel`

## Description

Définit un salon partagée de recherche de joueur ou le supprime

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `sharechannel` |
| **Description** | Définit un salon partagée de recherche de joueur ou le supprime |
| **Permissions User** | `['MANAGE_CHANNELS']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

```javascript
[
        {
            type: 'STRING',
            name: 'game',
            description: 'A quel jeu est dédié ce channel : overwatch, tekken, lol ou valorant',
            required: true,
        },
        {
            type: 'STRING',
            name: 'catégorie',
            description: 'A quel catégorie est dédié ce channel : scrim, team, player ou staff',
            required: true,
        },
    ]
```

## Fonctionnement du Code

```javascript
methode(args = {}) {

        let game = args.game,
            categorie = args.catégorie,
            listeItem = [];

        for (let i in gamePattern) {
            listeItem.push(i);
            if (game.match(gamePattern[i])) {
                game = i;
                break;
	}
```
