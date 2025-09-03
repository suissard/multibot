---
title: castreward
layout: default
---

# Commande `castreward`

## Description

Renvoit un url personnalisé pour réclamer une récompense de cast OAFO

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `castreward` |
| **Description** | Renvoit un url personnalisé pour réclamer une récompense de cast OAFO |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

```javascript
[
        {
            type: 'USER',
            name: 'user',
            description: 'Utilisateur a qui faire parvenir le formulaire de récompense',
            required: false,
        },
    ]
```

## Fonctionnement du Code

```javascript
async methode(args = {}) {
        const discordUser = this.bot.users.cache.get(args.user) || this.user;


        const formUrl = this.getCastRewardUrlForm(discordUser);

        //envoyer par mp
        var msgEmbed = new EmbedBuilder()
            .setTitle("Formulaire castReward")
            .setColor(Colors.Purple)
            .setDescription(`[**LIEN**](${formUrl})`);

        discordUser.send({ embeds: [msgEmbed] });

        return 'Un formulaire personnalisé a été envoyer par mp';
	}
```
