---
title: valid
layout: default
---

# Commande `valid`

## Description

Permet de valider une commande

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `valid` |
| **Description** | Permet de valider une commande |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

Cette commande n'accepte aucun argument.

## Fonctionnement du Code

```javascript
methode() {
            //Chaque commande à valider a un id
            let cmdId = this.args[0];
            this.bot.validableCommands.get(cmdId);
	}
```
