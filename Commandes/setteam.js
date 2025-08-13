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
    static description = "Crée une nouvelle équipe avec un rôle et un salon dédiés.";
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

    /**
     * Exécute la commande de création d'équipe.
     * Lance le processus de création de rôle et de salon, puis envoie un message de confirmation.
     * @param {object} args - Les arguments de la commande.
     * @param {string} args.teamname - Le nom de l'équipe.
     * @param {string} args.capitaine - L'ID de l'utilisateur capitaine.
     * @param {string} args.elo - L'elo de l'équipe.
     * @param {string} args.btag - Le BattleTag du capitaine.
     * @returns {string} Un message indiquant que la création est en cours.
     */
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

    /**
     * Récupère ou crée les rôles nécessaires pour l'équipe.
     * Crée un rôle spécifique pour l'équipe et trouve le rôle de "Capitaine".
     * @param {object} args - Les arguments de la commande, principalement `args.teamname`.
     * @returns {Promise<{roleteam: import('discord.js').Role, rolecap: import('discord.js').Role}>} Un objet contenant le rôle de l'équipe et le rôle de capitaine.
     */
    async getEventRole(args) {
        await this.guild.roles.fetch();
        let roleteam = await teamManager.createRoleTeam(args.teamname, this.guild);
        let rolecap = await findRole.findRole(captainName, this.guild);
        if (!rolecap) {
            rolecap = await findRole.findRole(captainName, this.guild);
        }
        return { roleteam, rolecap };
    }

    /**
     * Crée le salon de l'équipe, assigne les rôles au capitaine et enregistre les données de l'équipe.
     * @param {object} args - Les arguments de la commande.
     * @param {import('discord.js').Role} roleteam - Le rôle de l'équipe.
     * @param {import('discord.js').Role} rolecap - Le rôle de capitaine.
     */
    async createRoleAnChannel(args, roleteam, rolecap) {
        let member = this.guild.members.cache.get(args.capitaine);
        await teamManager.createChannelTeam(args.teamname, this.guild);
        await teamManager.addRoleTeam(member, rolecap, roleteam);

        //enregistrer en DB
        teamManager.saveTeamData(args.teamname, args.capitaine, args.elo, args.btag);
    }
};
