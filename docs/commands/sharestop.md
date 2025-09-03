---
title: sharestop
layout: default
---

# Commande `sharestop`

## Description

Retirer un salon du systeme de partage

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `sharestop` |
| **Description** | Retirer un salon du systeme de partage |
| **Permissions User** | `['MANAGE_CHANNELS']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

Cette commande n'accepte aucun argument.

## Fonctionnement du Code

```javascript
methode(args = {}) {
        try {
            let shareChannel = BOTS.ShareChannels.get('all').get(this.channel.id);

            if (shareChannel !== undefined) return this.del();
            else return 'Ce salon n\'est pas dans le système de salon partagée';
	}
```
