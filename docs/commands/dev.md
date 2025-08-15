---
title: dev
layout: default
---

# Commande `dev`

## Description

Execute le code javascript indiqué dans le message

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `dev` |
| **Description** | Execute le code javascript indiqué dans le message |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `true` |
| **Home Server Only** | `true` |

## Arguments

Cette commande n'accepte aucun argument.

## Fonctionnement du Code

```javascript
methode() {
        try {
            let result = eval(this.args.join(' '));
            if (result) this.answerToUser(result);
        } catch (e) {
            this.answerToUser(e.stack);
        }
    }
```
