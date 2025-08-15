---
title: respond
layout: default
---

# Commande `respond`

## Description

Répond au message du secretary

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `respond` |
| **Description** | Répond au message du secretary |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

```javascript
[
        {
            type: 'STRING',
            name: 'texte',
            description: 'Texte à envoyer',
            required: false,
        }, {
            type: 'ATTACHMENT',
            name: 'fichier',
            description: 'Fichier à envoyer',
            required: false,
        }
    ]
```

## Fonctionnement du Code

```javascript
methode(args = {}) {
        let passing = false;
        for (let i in this.bot.modules.Secretary.secretary) {
            if (this.bot.modules.Secretary.secretary[i].guild.id == args.interaction.guild.id) {
                passing = true;
            }
        }
        if (!passing) {
            return "❌ Vous n'avez pas accès à cette commande";
        }

        if (!args['texte'] && !args.interaction.options.getAttachment("fichier")) {
            return "❌ Vous devez envoyer un message ou un fichier !";
        }

        const interaction = args.interaction;
        const match = interaction.channel.name.match(/.+-(\d{17,19})$/);
        if (!match) {
            return "❌ Pas dans un channel valide !";
        }
        let userID = match[1];

        let user = this.bot.users.cache.get(userID);
        if (!user) user = await this.bot.users.fetch(userID).catch(_ => null);

        let rawResult = args.texte;
        let file = interaction.options.getAttachment("fichier");
        let embed = new Discord.EmbedBuilder()
        .setTitle(this.bot.name)
        .setColor('#0099ff')
        .setTimestamp()

        if (file) {
            embed.setImage(file.url);
        }

        if (rawResult) {
            let result = rawResult.replace(/\\n/g, '\n');
            embed.setDescription(result);
        }

        user.send({ embeds: [embed] }).catch(_ => null);
        this.channel.send({ embeds: [embed] });
        return "✅ Réponse envoyée !";
    }
```
