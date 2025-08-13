const { ChannelType } = require('discord.js');
const Commande = require('../Class/Command.js');
const FindChanRole = require('../Tools/findRoleFromName.js');

module.exports =
    class Dev extends Commande {

        static id = 'unmute';
        static devBoss = false;
        static home = true;
        static userPermissions = ['BanMembers'];
        static botPermissions = [];
        static description = 'unmute';
        static help = false;
        static howTo = 'PREFIXCMD';
        static test = [];
        static arguments = [
            {
                type: 'USER',
                name: 'user',
                description: 'User à unmute',
                required: true,
            },
        ];


        /**
         * Exécute la commande pour enlever le statut muet d'un utilisateur.
         * Supprime le rôle "mute" de l'utilisateur et restaure ses permissions sur tous les salons.
         * @param {object} args - Les arguments de la commande.
         * @param {string} args.user - L'ID de l'utilisateur à démuter.
         * @returns {Promise<string>} Un message de confirmation ou un message indiquant que l'utilisateur n'était pas muet.
         */
        async methode(args = {}) {
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
    };