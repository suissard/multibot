---
title: numberofchans
layout: default
---

# Commande `numberofchans`

## Description

Donne le nombre de channel du serveur

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `numberofchans` |
| **Description** | Donne le nombre de channel du serveur |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

Cette commande n'accepte aucun argument.

## Fonctionnement du Code

```javascript
methode(args = {}) {
        return `Le nombre de channel de ce server est: ${this.guild.channels.cache.size}/500`;
    }
```
