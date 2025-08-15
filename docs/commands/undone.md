---
title: undone
layout: default
---

# Commande `undone`

## Description

Rouvre un ticket

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `undone` |
| **Description** | Rouvre un ticket |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

Cette commande n'accepte aucun argument.

## Fonctionnement du Code

```javascript
methode(args = {}) {
        let chan = this.channel;
        if (chan.name.startsWith('❌') == false) {
            chan.setName('❌' + chan.name.replace(/✅/g, ''));
            return 'Ticket réouvert ! ✅';
        }
        return 'Le ticket n\'a pas pu être réouvert ❌';
    }
```
