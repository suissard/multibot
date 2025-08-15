---
title: unmute
layout: default
---

# Commande `unmute`

## Description

N/A

## Détails

| Propriété | Valeur |
| --- | --- |
| **ID** | `unmute` |
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
                description: 'User à unmute',
                required: true,
            },
        ]
```

## Fonctionnement du Code

```javascript
methode(args = {}) {
            let channelMute = this.guild.channels.cache.find((chan) => {
                if (chan.name == 'tu-as-été-mute') return chan;
            });
            let muteRole = await FindChanRole.findRole('mute', this.guild);
            if (!muteRole) {
                await FindChanRole.findRole('mute', this.guild);
            }
            await this.guild.members.fetch();
            let userMute = await this.guild.members.cache.get(args.user);
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
            const unmute = async (channel) => {
                if (channel != channelMute) {
                    channel.permissionOverwrites.delete(args.user);
                    await setTimeout(console.log, 1000);
                }
            };
            await channelMute.permissionOverwrites.delete(args.user);
            if (userMute.roles.cache.has(muteRole.id)) {
                this.loading(this.guild.channels.cache.map((chan) => {
                    return chan;
                }), unmute);
                userMute.roles.remove(muteRole);
                return 'Utilisateur unmute par : <@' + this.user.id + '> ✅';
            } else if (!userMute.roles.cache.has(muteRole.id)) {
                return 'L\'utilisateur n\'est pas mute';
            }


        }


        // async methode() {
        //     try{
        //         let guild = this.message.guild
        //         let channelMute = guild.channels.cache.find((chan) => {if (chan.name == "tu-as-été-mute") return chan;})
        //         for (let [id, user] of this.message.mentions.users){
        //             const unmute = async (channel) =>{
        //                 channel.permissionOverwrites.delete(user)
        //                 await setTimeout(console.log, 1000)
        //             }
        //             channelMute.permissionOverwrites.delete(user)
        //             this.loading(guild.channels.cache, unmute)
        //         }
        //     }catch(e){
        //         console.log(e)
        //     }
        // }
    }
```
