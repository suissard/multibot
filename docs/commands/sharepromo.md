---
title: sharepromo
layout: default
---

# Commande `sharepromo`

## Description

Partager un message format embed sur ce salon partagé

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `sharepromo` |
| **Description** | Partager un message format embed sur ce salon partagé |
| **Permissions User** | `['ADMINISTRATOR']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `true` |

## Arguments

```javascript
[
        {
            type: 'STRING',
            name: 'texte',
            description: 'Message à envoyer',
            required: true,
        },
        {
            type: 'STRING',
            name: 'imageurl',
            description: 'Ajouter une URL d\'image au message',
            required: false,
        },
    ]
```

## Fonctionnement du Code

```javascript
async methode(args = {}) {
        try {
            let texte = args.texte.replace(/%%/g, '\n '); //pour repérer les souhaits de sauts de ligne
            let shareChannel = BOTS.ShareChannels.get('all').get(this.channel.id);

            if (shareChannel) {
                shareChannel = BOTS.ShareChannels.get(shareChannel.id);
                let embed = new MultiBotMessageEmbed()
                    .setDescription(texte)
                    .setImage(args.imageurl);

                await this.loading(shareChannel._channels, async (channel) => {
                    try {
                        await channel.send(embed);
	}
```
