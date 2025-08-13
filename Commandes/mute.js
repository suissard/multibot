const { ChannelType } = require('discord.js');
const Commande = require('../Class/Command.js');
const FindChanRole = require('../Tools/findRoleFromName.js');

module.exports =
    class Mute extends Commande {

        static id = 'mute';
        static devBoss = false;
        static home = true;
        static userPermissions = ['BanMembers'];
        static botPermissions = [];
        static description = 'mute';
        static help = false;
        static howTo = 'PREFIXCMD';
        static test = [];
        static arguments = [
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
        ];


        /**
         * Exécute la commande pour rendre un utilisateur muet sur le serveur.
         * Applique un rôle "mute" à l'utilisateur, ce qui restreint son accès aux salons,
         * et lui donne accès à un salon spécial pour communiquer avec les modérateurs.
         * Crée le rôle et le salon s'ils n'existent pas.
         * @param {object} args - Les arguments de la commande.
         * @param {string} args.user - L'ID de l'utilisateur à rendre muet.
         * @param {string} [args.raison] - La raison pour laquelle l'utilisateur est rendu muet.
         * @returns {Promise<string>} Un message de confirmation ou un message indiquant que l'utilisateur est déjà muet.
         */
        async methode(args = {}) {
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
    };