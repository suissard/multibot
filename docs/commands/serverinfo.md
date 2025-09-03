---
title: serverinfo
layout: default
---

# Commande `serverinfo`

## Description

Donne des infos sur le serveur

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `serverinfo` |
| **Description** | Donne des infos sur le serveur |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `true` |

## Arguments

Cette commande n'accepte aucun argument.

## Fonctionnement du Code

```javascript
async methode(args = {}) {
            let embed = await this.serverInfoEmbed(this.guild);
            return embed;
	}
```
