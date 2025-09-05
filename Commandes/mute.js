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
        static description = "Rend un utilisateur muet, restreignant son accès aux salons.";
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

        static narrative = `
- Cette commande permet de rendre un utilisateur muet sur le serveur.
- Elle nécessite la permission "Bannir des membres" (\`BanMembers\`).

- **Fonctionnement :**
    1.  La commande cible un utilisateur spécifié en argument.
    2.  Elle recherche un rôle nommé "mute". Si ce rôle n'existe pas, elle le crée.
    3.  Elle recherche un salon textuel nommé "tu-as-été-mute". Si ce salon n'existe pas, il est créé avec des permissions qui le rendent privé.
    4.  Si l'utilisateur n'est pas déjà muet (ne possède pas le rôle "mute"), la commande procède :
        a.  Elle ajoute le rôle "mute" à l'utilisateur.
        b.  Elle envoie un message dans le salon "tu-as-été-mute" pour informer l'utilisateur qu'il peut y communiquer avec les administrateurs.
        c.  Elle parcourt **tous les salons** du serveur pour modifier les permissions de l'utilisateur rendu muet :
            - Elle lui retire la permission de voir le salon.
        d.  Elle accorde explicitement à l'utilisateur la permission de voir et d'envoyer des messages dans le salon "tu-as-été-mute".
    5.  Si une raison est fournie, elle est incluse dans le message de confirmation.
    6.  Si l'utilisateur possède déjà le rôle "mute", la commande renvoie un message indiquant qu'il est déjà muet.
`;


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