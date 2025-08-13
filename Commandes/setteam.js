const Commande = require('../Class/Command.js');
const teamManager = require('../Tools/teamManager.js');
const findRole = require('../Tools/findRoleFromName.js');
const MultiBotMessageEmbed = require('../Tools/MultiBotMessageEmbed.js');

const captainName = '🎉 Capitaine';

module.exports = class SetTeam extends Commande {
    static id = 'setteam';
    static devBoss = false;
    static home = true;
    static userPermissions = ['ManageRoles'];
    static botPermissions = [];
    static description = 'setteam';
    static help = true;
    static howTo = 'PREFIXCMD';
    static test = [
        {
            options: [
                { name: 'teamname', value: 'test' },
                { name: 'btag', value: 'Xekko#1625' },
                { name: 'capitaine', value: '244419544825856000' },
                { name: 'elo', value: '2500' },
            ],
        },
    ];
    static arguments = [
        {
            type: 'STRING',
            name: 'teamname',
            description: 'Nom de la team',
            required: true,
        },
        {
            type: 'STRING',
            name: 'btag',
            description: 'Btag Du capitaine',
            required: true,
        },
        {
            type: 'USER',
            name: 'capitaine',
            description: 'Capitaine de la team',
            required: true,
        },
        {
            type: 'STRING',
            name: 'elo',
            description: 'Rank de la team',
            required: true,
        },
    ];

    async methode(args = {}) {
        this.getEventRole(args).then(async ({ roleteam, rolecap }) => {
            await this.createRoleAnChannel(args, roleteam, rolecap);
            const embed = new MultiBotMessageEmbed(
                `__Création de la team **${args.teamname}**__`,
                `**Capitaine :** <@${args.capitaine}>\n**Elo :** ${args.elo}\n**Btag :** ${args.btag}`,
            );
            this.answerToUser(embed);
        });

        return 'Team en cours d\'ajout ...';
    }

    async getEventRole(args) {
        await this.guild.roles.fetch();
        let roleteam = await teamManager.createRoleTeam(args.teamname, this.guild);
        let rolecap = await findRole.findRole(captainName, this.guild);
        if (!rolecap) {
            rolecap = await findRole.findRole(captainName, this.guild);
        }
        return { roleteam, rolecap };
    }

    async createRoleAnChannel(args, roleteam, rolecap) {
        let member = this.guild.members.cache.get(args.capitaine);
        await teamManager.createChannelTeam(args.teamname, this.guild);
        await teamManager.addRoleTeam(member, rolecap, roleteam);

        //enregistrer en DB
        teamManager.saveTeamData(args.teamname, args.capitaine, args.elo, args.btag);
    }
};
