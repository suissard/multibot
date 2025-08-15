---
title: mute
layout: default
---

# Commande `mute`

## Description

N/A

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `mute` |
| **Description** | N/A |
| **Permissions User** | `['BanMembers']` |
| **Permissions Bot** | `[]` |
| **Dev Boss Only** | `false` |
| **Home Server Only** | `true` |

## Arguments

```javascript
[
            {
                type: 'USER',
                name: 'user',
                description: 'User à mute',
                required: true,
            }, {
                type: 'STRING',
                name: 'raison',
                description: 'Raison du mute',
                required: false,
            },
        ]
```

## Fonctionnement du Code

```javascript
methode(args = {}) {
            await this.guild.members.fetch();
            let userMute = await this.guild.members.cache.get(args.user);
            let result = 'Utilisateur mute par : <@' + this.user.id + '> ✅';
            let muteRole = await FindChanRole.findRole('mute', this.guild);
            if (!muteRole) {
                await FindChanRole.findRole('mute', this.guild);
            }
            let channelMute = this.guild.channels.cache.find((chan) => {
                if (chan.name == 'tu-as-été-mute') return chan;
            });
            if (args.raison) {
                result = result + '\nPour la raison suivante : ' + args.raison;
            }
            if (!channelMute) {
                channelMute = await this.guild.channels.create({
                    name: 'tu-as-été-mute',
                    type: ChannelType.GuildText,
                    permissionOverwrites: [
                        {
                            id: this.guild.id,
                            deny: ['ViewChannel', 'SendMessages'],
                        },
                    ],
                });
            }
            const mute = async (channel) => {
                channel.permissionOverwrites.edit(args.user, {
                    ViewChannel: false,
                });
                await setTimeout(console.log, 1000);
                channelMute.permissionOverwrites.edit(args.user, {
                    ViewChannel: true,
                    SendMessages: true,
                });
            };
            if (userMute.roles.cache.has(muteRole.id)) {
                return 'L\'utilisateur est déjà mute';
            } else if (!userMute.roles.cache.has(muteRole.id)) {
                channelMute.send(`<@${args.user}>, tu as été mute, mais ce salon te permet toujours d'échanger avec les administrateurs du discord`);
                this.loading(this.guild.channels.cache.map((chan) => {
                    return chan;
                }), mute);
                userMute.roles.add(muteRole);
                return result;
            }
        }
    }
```
