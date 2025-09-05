const Command = require('../Class/Command.js');
const teamManager = require('../Tools/teamManager.js');
const DATAS = require('../Class/DataBase');

module.exports = class UpdateTeam extends Command {
    static id = 'updateteam';
    static devBoss = false;
    static home = false;
    static userPermissions = ['ManageRoles'];
    static botPermissions = [];
    static description = 'Met à jour une équipe';
    static help = true;
    static howTo = 'PREFIXCMD';
    static test = [
        {
            options: [
                { name: 'teamname', value: 'Test2' },
                { name: 'newteamname', value: 'Test' },
                { name: 'newcap', value: '244419544825856000' },
                { name: 'newbtag', value: 'Xekko#16225' },
            ],
        },
    ];
    //,{ name: "newbtag", value: "Xekko#16225" }, { name: "newrank", value: 2500 }
    static arguments = [
        {
            type: 'STRING',
            name: 'teamname',
            description: 'Nom de la team à modifier',
            required: true,
        },
        {
            type: 'STRING',
            name: 'newteamname',
            description: 'Nouveau nom de la team',
            required: false,
        },
        {
            type: 'USER',
            name: 'newcap',
            description: 'Nouveau capitaine de la team',
            required: false,
        },
        {
            type: 'STRING',
            name: 'newbtag',
            description: 'Nouveau battleTag du capitaine de la team',
            required: false,
        },
        {
            type: 'INTEGER',
            name: 'newrank',
            description: 'Nouveau rank de la team',
            required: false,
        },
    ];

    static narrative = `
- Cette commande permet de modifier les informations d'une équipe existante.
- Elle nécessite la permission "Gérer les rôles" (\`ManageRoles\`).
- L'utilisateur doit spécifier le nom de l'équipe à modifier et au moins une information à changer.

- **Champs modifiables :**
    - \`newteamname\` : Pour changer le nom de l'équipe.
    - \`newcap\` : Pour désigner un nouveau capitaine.
    - \`newbtag\` : Pour mettre à jour le BattleTag du capitaine.
    - \`newrank\` : Pour changer le classement (elo) de l'équipe.

- **Fonctionnement :**
    1.  La commande identifie l'équipe cible en base de données ainsi que son rôle et son salon associés.
    2.  Elle effectue les mises à jour en fonction des arguments fournis :
        - **Changement de nom :** Si \`newteamname\` est fourni, le nom du rôle et du salon de l'équipe sont mis à jour.
        - **Changement de capitaine :** Si \`newcap\` est fourni, l'ancien capitaine perd ses rôles de capitaine et d'équipe, et le nouveau membre les reçoit. Le \`newbtag\` est obligatoire dans ce cas.
        - **Changement de BattleTag :** Le BattleTag est mis à jour en base de données.
        - **Changement de rang :** Le rang (elo) est mis à jour en base de données.
    3.  Toutes les modifications de données (nom, capitaine, btag, elo) sont sauvegardées dans la base de données.
    4.  Si aucune information à modifier n'est fournie, la commande renvoie un message d'erreur.
`;

    /**
     * Exécute la commande pour mettre à jour les informations d'une équipe.
     * Permet de changer le nom de l'équipe, le capitaine, le BattleTag et le classement (elo).
     * @param {object} args - Les arguments de la commande.
     * @param {string} args.teamname - Le nom actuel de l'équipe à modifier.
     * @param {string} [args.newteamname] - Le nouveau nom pour l'équipe.
     * @param {string} [args.newcap] - L'ID du nouveau capitaine.
     * @param {string} [args.newbtag] - Le nouveau BattleTag du capitaine.
     * @param {number} [args.newrank] - Le nouveau classement (elo) de l'équipe.
     * @returns {Promise<string>} Un message de confirmation ou d'erreur.
     * @todo La logique de mise à jour des données en base (`saveUpdateTeamData`) semble contenir des erreurs
     * et utilise des arguments non définis.
     */
    async methode(args = {}) {
        await this.guild.roles.fetch();
        await this.guild.members.fetch();
        let roleTeam = this.guild.roles.cache.find((role) => {
            if (role.name == `Team [${args.teamname}]`) return role;
        });
        let roleCap = this.guild.roles.cache.find((r) => r.name === 'Capitaine');
        let channelTeam = this.guild.channels.cache.find((chan) => {
            if (chan.name == `Team [${args.teamname}]`) return chan;
        });
        let newTeamCap = this.guild.members.cache.get(args.newcap);
        let teamCap = this.guild.members.cache.find((cap) => {
            if (cap.roles.cache.has(roleTeam.id) && cap.roles.cache.has(roleCap.id)) return cap;
        });

        let team = DATAS.collections.teams.cache.find((t) => {
            return t.name == args.teamname;
        });
        if (!team) return 'Le nom de la team n\'est pas correct';
        if (!roleTeam) return 'Le role de la team n\'est pas disponible';
        if (!channelTeam) return 'Le channel de la team n\'est pas disponible';

        let saveUpdateTeamData = async (id, teamname, cap, elo, btag) => {
            return await DATAS.collections.teams.update(id, {
                capitaine: { User: cap },
                name: teamname,
                elo,
                battleTag: btag,
            });
        };

        saveUpdateTeamData(team.getID(), args.teamname, args.capitaine, args.elo, args.btag);

        if (args.newteamname) {
            await teamManager.updateChannelTeam(channelTeam, args.newteamname);
            await teamManager.updateRoleTeam(roleTeam, args.newteamname);
        }
        if (args.newcap && args.newbtag) {
            await teamManager.updateTeamCap(teamCap, newTeamCap, roleCap, roleTeam);
            await teamManager.updateCapBtag(team, args.newbtag);
        } else if (args.newcap && !args.newbtag) {
            return 'Si tu veux changer de capitaine, tu dois changer le btag renseigné';
        }
        if (args.newrank) {
            await teamManager.updateTeamRank(team, args.newrank);
        }
        if (!args.newteamname && !args.newcap && !args.newbtag && !args.newrank) {
            return 'Tu dois mettre au moins une informations à modifier';
        }


        return 'Team mis-à-jour';
    }

};
