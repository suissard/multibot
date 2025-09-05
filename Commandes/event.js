const Command = require('../Class/Command.js');
const DataBase = require('../Class/DataBase');
const { Colors, EmbedBuilder, Team, RichPresenceAssets } = require('discord.js');
const teamManager = require('../Tools/teamManager.js');
const findRole = require('../Tools/findRoleFromName.js');

module.exports = class Event extends Command {
    static id = 'event';
    static devBoss = false;
    static home = true;
    static userPermissions = [];
    static botPermissions = [];
    static description = "Gère les événements, incluant l'affichage d'infos, la gestion des équipes et le nettoyage.";
    static help = false;
    static howTo = 'PREFIXCMD';
    static arguments = [
        {
            type: 'STRING',
            name: 'texte',
            description: 'info = tableau des teams, team = ajout de rôle team',
            required: true,
        },
        {
            type: 'STRING',
            name: 'users',
            description: 'user aux quels il faut ajouter le rôle de team',
            required: false,
        },
    ];
    static test = [];

    static narrative = `
- Cette commande sert de point d'entrée pour plusieurs sous-commandes liées à la gestion d'événements.
- L'argument 'texte' détermine quelle action effectuer : 'info', 'team', ou 'wash'.

- **Sous-commande 'info' :**
    - Scanne tous les salons du serveur pour trouver ceux dont le nom correspond au format "Team [...]".
    - Pour chaque salon trouvé, récupère les informations de l'équipe correspondante depuis la base de données.
    - Génère et affiche un message "embed" qui liste toutes les équipes trouvées avec leurs détails (capitaine, nom en jeu, rang).
    - S'il n'y a aucune équipe, l'embed l'indique.

- **Sous-commande 'team' :**
    - Permet à un capitaine d'équipe d'ajouter le rôle de son équipe à d'autres membres.
    - L'argument 'users' doit contenir les mentions des utilisateurs à qui ajouter le rôle.
    - La commande identifie le rôle de l'équipe de l'auteur de la commande (le capitaine).
    - Elle applique ensuite ce rôle à tous les utilisateurs mentionnés.
    - Des vérifications sont en place pour s'assurer que le capitaine a bien un seul rôle d'équipe.

- **Sous-commande 'wash' :**
    - **Action réservée aux administrateurs.**
    - Effectue un nettoyage complet de tous les éléments liés aux équipes sur le serveur.
    - Supprime tous les salons de texte dont le nom correspond à "Team [...]".
    - Retire le rôle "Capitaine" de tous les membres qui le possèdent.
    - Supprime tous les rôles dont le nom correspond à "Team [...]".
    - Envoie des messages de confirmation pour chaque type d'élément nettoyé.
`;

    /**
     * Exécute la sous-commande appropriée en fonction des arguments.
     * @param {object} args - Les arguments de la commande.
     * @param {string} args.texte - La sous-commande à exécuter ('info', 'team', 'wash').
     * @param {string} [args.users] - Les utilisateurs pour la sous-commande 'team'.
     * @returns {Promise<string|EmbedBuilder>} La réponse de la sous-commande.
     */
    async methode(args = {}) {
        if (args.texte.toLowerCase() == 'info') {
            return await this.info();
        } else if (args.texte.toLowerCase() == 'team') {
            if (!args.users) {
                return 'Tu n\'as pas mentionné de personnes aux quels il faut que j\'ajoute le rôle';
            } else {
                return this.addTeamRole(args.users);
            }
        } else if (args.texte.toLowerCase() == 'wash') {
            return await this.eventWash();
        } else {
            return 'Il y a eu une erreur, merci de contacter un admin';
        }
    }

    /**
     * Affiche les informations sur toutes les équipes inscrites sur le serveur.
     * @returns {Promise<EmbedBuilder>} Un embed contenant la liste des équipes et leurs informations.
     */
    async info() {
        let infoteam = async function(guild) {
            let teams = [];
            let getTeamData = async (id) => {
                let team = teamManager.getTeamByName(id);
                if (team) return team;

            };
            // Lister els salon de team actif
            for (let [id, channel] of guild.channels.cache) {
                let idTeam = channel.name.match(/Team \[.+\]/);
                if (idTeam) {
                    idTeam = idTeam[0].match(/\[.+\]/)[0].slice(1, -1);
                    let teamData = await getTeamData(idTeam);
                    teams.push(teamData);
                }
            }
            return teams;
        };

        let embedInfo = new EmbedBuilder()
            .setTitle('Information Général')
            .setColor(Colors.Blurple);
        let nbTeam = 0;
        let teams = await infoteam(this.guild);
        for (let i in teams) {
            nbTeam++;
            let team = teams[i];
            embedInfo.addFields({
                name: `Equipe ${nbTeam} : ${team.name}`,
                value: `** Capitaine :** <@${team.capitaine.User}>\n** InGame :** ${team.battleTag}\n** Rank :** ${team.elo}\n`,
                inline: true,
            });
        }
        if (nbTeam == 0) {
            embedInfo.setDescription('Il n\'y a pas de teams inscrites');
        } else {
            embedInfo.setDescription('Nombre de team : ' + nbTeam);
        }
        return embedInfo;
    }

    /**
     * Ajoute le rôle de l'équipe de l'auteur de la commande aux utilisateurs mentionnés.
     * @param {string} mention - Une chaîne contenant les mentions des utilisateurs.
     * @returns {Promise<string>} Un message de confirmation ou d'erreur.
     */
    async addTeamRole(mention) {
        try {
            let commandUser = this.guild.members.cache.get(this.user.id);
            let roleTeam = {};
            let listeUser = [];
            let listeId = mention.match(/<@!*[0-9]{18}>/g);
            if (listeId) {
                listeId = listeId.map((x) => x.replace(/(<@!*)|>/g, ''));
                for (let i in listeId) {
                    let user = this.guild.members.cache.get(listeId[i]);
                    if (!user) user = await this.guild.members.fetch(listeId[i]).catch(_ => null);
                    listeUser.push(user);
                }
            }
            let x = 0;
            for (let [index, role] of commandUser.roles.cache) {
                if (role.name.match(/Team \[.+\]/)) {
                    roleTeam[index] = role;
                    x += 1;
                }
            }
            if (x == 0) {
                return 'Il n\'y a pas de team inscrites.';
            }
            if (Object.keys(roleTeam).length > 1) {
                return 'Tu as deux rôles de team, merci de contacter un orga afin de régler ça !';
            } else {
                for (let i in listeUser) {
                    listeUser[i].roles.add(Object.keys(roleTeam));
                    await this.checkRole(listeUser[i], Object.keys(roleTeam));
                }
                return 'Le rôle a bien été ajouté aux joueurs mentionnés';
            }
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Vérifie si un membre a bien le rôle de l'équipe.
     * Tente de rajouter le rôle si manquant.
	 * @TODO La variable `rolecap` n'est pas définie dans la portée de cette fonction, ce qui causera une erreur.
     * @param {import('discord.js').GuildMember} member - Le membre à vérifier.
     * @param {import('discord.js').Role} roleteam - Le rôle de l'équipe à vérifier.
     * @returns {Promise<import('discord.js').GuildMember>} Le membre vérifié.
     */
    async checkRole(member, roleteam) {
        await member.fetch(true);
        console.log('Checkrole lancé !', member.user.tag);
        if (!member.roles.cache.has(roleteam.id) || !member.roles.cache.has(rolecap.id)) {
            this.addTeamRole();
        }
        return member;
    }

    /**
     * Nettoie tous les salons, rôles et grades de capitaine liés aux équipes sur le serveur.
     * Commande réservée aux administrateurs.
     * @returns {Promise<string>} Un message de confirmation.
     */
    async eventWash() {
        if (this.member.permissions.has('ADMINISTRATOR')) {
            let guild = this.guild;
            let rolecap = await findRole.findRole('🎉 Capitaine', guild);
            let nbTextChannel = 0;
            let nbCapitaine = 0;
            let nbRoleTeam = 0;
            for (let [channel, typeChan] of guild.channels.cache) {
                if (typeChan.name.match(/Team \[.+\]/)) {
                    guild.channels.cache.get(channel).delete();
                    nbTextChannel = nbTextChannel + 1;
                }
            }
            this.channel.send(nbTextChannel + ' channels nettoyés');
            let listeUser = {};
            for (let [index, user] of guild.members.cache) {
                listeUser[index] = user;
            }
            for (let i in listeUser) {
                let member = this.guild.members.cache.get(i);
                if (member.roles.cache.has(rolecap.id)) {
                    member.roles.remove(rolecap);
                    nbCapitaine = nbCapitaine + 1;
                }
            }
            this.channel.send(nbCapitaine + ' capitaine nettoyés');
            for (let [id, role] of guild.roles.cache) {
                if (role.name.match(/Team \[.+\]/)) {
                    role.delete();
                    nbRoleTeam = nbRoleTeam + 1;
                }
            }
            this.channel.send(nbRoleTeam + ' rôles de team nettoyés');
            return 'Event wash terminé !';
        } else {
            return 'Vous n\'avez pas la permission requise, merci de contacter un admnistrateur';
        }
    }
};
