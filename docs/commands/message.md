---
title: message
layout: default
---

# Commande `message`

## Description

Envoie un direct message aux membres mentionnés ou ayant un role mentionné

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `message` |
| **Description** | Envoie un direct message aux membres mentionnés ou ayant un role mentionné |
| **Permissions User** | `['BanMembers']` |
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
            type: 'BOOLEAN',
            name: 'sendsecretary',
            description: 'Est ce que les messages envoyé doivent être envoyé au secrétariat',
            required: true,
        },
        {
            type: 'STRING',
            name: 'usersandroles',
            description: 'mention d\'utilisateurs et de roles en masse',
            required: false,
        },
        {
            type: 'USER',
            name: 'user',
            description: 'User à qui envoyer le message',
            required: false,
        },
        {
            //TODO Image marche pas
            type: 'STRING',
            name: 'imageurl',
            description: 'Ajouter une URL d\'image au message',
            required: false,
        },
        {
            type: 'ROLE',
            name: 'role',
            description: 'Envoyer un message à un role',
            required: false,
        },
    ]
```

## Fonctionnement du Code

```javascript
async methode(args = {}) {
        let botAvatar = await this.bot.user.avatarURL();

        await this.guild.members.fetch();
        let listeUser = {};
        if (args.user) {
            let user = this.bot.users.cache.get(args.user);
            if (!user) {
                user = await this.bot.users.fetch(args.user).catch(_ => null);
	}
```
