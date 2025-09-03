---
title: help
layout: default
---

# Commande `help`

## Description

Permet d\obtenir le détail des commandes

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `help` |
| **Description** | Permet d\obtenir le détail des commandes |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `true` |

## Arguments

Cette commande n'accepte aucun argument.

## Fonctionnement du Code

```javascript
methode() {
            if (Commands.get(this.args[0])) return this.answerToUser(this.detailHelpEmbed(this.args[0]));

            let allEmbed = this.helpEmbed(this.helpArray());
            for (let i in allEmbed) this.answerToUser(allEmbed[i].setTitle(`Liste des commandes`));
	}
```
