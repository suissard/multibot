---
title: shareinfo
layout: default
---

# Commande `shareinfo`

## Description

Récuperer les infos sur ce salon partagé

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `shareinfo` |
| **Description** | Récuperer les infos sur ce salon partagé |
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
            if (shareChannel !== undefined) return shareChannel.channelInfo();
            else return 'Ce salon n\'est pas dans le système de salon partagée';
	}
```
