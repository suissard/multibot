---
title: done
layout: default
---

# Commande `done`

## Description

Clos un ticket

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `done` |
| **Description** | Clos un ticket |
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
        if (chan.name.startsWith('✅') == false) {
            chan.setName('✅' + chan.name.replace(/❌/g, ''));
            return 'Ticket clos ! ✅';
        }
        return 'Le ticket n\'a pas pu être clos ❌';
    }
```
