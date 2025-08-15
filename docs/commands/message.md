---
title: message
layout: default
---

# Commande `message`

## Description

N/A

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `message` |
| **Description** | N/A |
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
methode(args = {}) {
        let botAvatar = await this.bot.user.avatarURL();

        await this.guild.members.fetch();
        let listeUser = {};
        if (args.user) {
            let user = this.bot.users.cache.get(args.user);
            if (!user) {
                user = await this.bot.users.fetch(args.user).catch(_ => null);
            }
            listeUser[args.user] = user;
        } else if (args.role) {
            let role = this.guild.roles.cache.get(args.role);
            for (let [id, member] of role.members) {
                if (!listeUser[member.user.id]) {
                    listeUser[id] = member.user;
                }
            }
        } else if (args.usersandroles) {
            listeUser = await this.getUsersFromUsersAndRolesString(args.usersandroles);
        } else
            return '❌ Tu dois mentionner un rôle ou un utilisateur à qui envoyer le message';
        let texte = args.texte.replace(/(%%)|(\\n)/g, '\n'); //pour repérer les souhaits de sauts de ligne
        let embed = new EmbedBuilder()
            .setThumbnail(botAvatar)
            .setDescription(texte)
        // .setFooter("Vous avez été contacté car vous possédez le role j'aime les events"); // TODO manque pk le message a été envoyé dinamyquement: mention spécial ou a travers un role

        if (args.imageurl) {
            embed.setImage(args.imageurl);
        }

        listeUser = Object.values(listeUser);
        //Envoie des messages

        await this.loading(listeUser, async (user) => {
            let message = await user.send({ embeds: [embed] });
            if (args.sendsecretary == true) {
                message.author.bot = false; //déclenche un eevenement secretary et modifie els varialb pour alimenter les channels de secretariat
                message.botAvatar = botAvatar;
                message.author.id = user.id;
                message.author.username = user.username;
                message.content = texte;
                message.fromCommandMessage = true;
                this.bot.emit('secretary', message, true);
            }
        });
        return 'les messages ont été envoyé';
    }
```
