---
title: invite
layout: default
---

# Commande `invite`

## Description

Récupérer un lien d\invitation pour faire venir le Getibot dans ton discord

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `invite` |
| **Description** | Récupérer un lien d\invitation pour faire venir le Getibot dans ton discord |
| **Permissions User** | `[]` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `false` |

## Arguments

Cette commande n'accepte aucun argument.

## Fonctionnement du Code

```javascript
async methode(args = {}) {
        //Réponses ludiques pour inciter a l'utilisation de la commande
        const answers = [
            `Tu es sûr de vouloir cette invitation ?`,
            `Voici une invitation rien que pour toi ;)`,
            `Ouais !!! ${this.bot.user.username} partout !!`,
            `Avec toi, ça fera ${this.bot.guilds.cache.size + 1} serveurs !`,
            `Je veux bien te révéler l'invitation, mais je serais obligé de te tuer après 🔫🤵`,
            `A toi je peux bien te la donner ;)`,
            `Super, pleins de nouveaux potes à découvrir chez toi`,
            `Grand fou, on se connaît à peine ^^`,
            `C'est pour moi un grand honneur de te partager cette invitation ${this.user} :)`,
            `Plus on sera de fou, plus on rira : n'hésite pas à parler de moi !!`,
            `Je sais pas quoi te dire, je crois que je suis ému d'une telle demande ...`,
            `Je savais qu'on était fait pour s'entendre, invite moi grand fou !!!`,
            `Vous n'avez pas les droits pour cette commande ... mais comme vous êtes trop BG, je vous offre le lien quand même :)`,
            `Non j'parlerai pas, jamais je te donnerai l'inv ... 👊💥\n\n🦷\n`,
            // ``,
            // ``,
        ];
        answers.push(`Tu savais que le développeur a imaginé ${answers.length + 1} pour te donner cette invit ?`);
        const answer = answers[getRandom(answers.length - 1)];
        return `${answer}\nhttps://discord.com/api/oauth2/authorize?client_id=${this.bot.user.id}&permissions=8&scope=bot`;
	}
```
