const Command = require('../../Class/Command.js');
const BOTS = require('../../Class/BOTS.js');
const { gamePattern, categoryPattern } = require('./shareChannelsConfig.js');

/**
 * Commande de gestion des shareChannel
 */
class SalonCommand extends Command {
    static id = 'sharechannel';
    static devBoss = false;
    static home = false;
    static userPermissions = ['MANAGE_CHANNELS'];
    static botPermissions = [];
    static description = 'Définit un salon partagée de recherche de joueur ou le supprime';
    static help = true;
    static howTo =
        '``PREFIXCMD`` puis :\n▫ **info :** Donne des infos sur le channel\n▫ **del** : retirer le salon du système\n▫ ***un jeu*** : indiquer un jeu existante\n▫ ***une catégorie*** : indiquer une catégorie existante';
    static test = ['scrim ow', 'info'];
    static arguments = [
        {
            type: 'STRING',
            name: 'game',
            description: 'A quel jeu est dédié ce channel : overwatch, tekken, lol ou valorant',
            required: true,
        },
        {
            type: 'STRING',
            name: 'catégorie',
            description: 'A quel catégorie est dédié ce channel : scrim, team, player ou staff',
            required: true,
        },
    ];

    methode(args = {}) {

        let game = args.game,
            categorie = args.catégorie,
            listeItem = [];

        for (let i in gamePattern) {
            listeItem.push(i);
            if (game.match(gamePattern[i])) {
                game = i;
                break;
            }
        }
        if (!game)
            throw new Error(
                `Le jeu doit appartenir à la liste suivante :\n${listeItem.join(', ')}`,
            );

        listeItem = [];
        for (let i in categoryPattern) {
            listeItem.push(i);
            if (categorie.match(categoryPattern[i])) {
                categorie = i;
                break;
            }
        }
        if (!categorie)
            throw new Error(
                `La catégorie doit appartenir à la liste suivante :\n${listeItem.join(', ')}`,
            );

        return this.add(categorie, game);
    }

    /**
     * Ajouter un salon au systeme
     * @param {String} categorie
     * @param {String} game
     */
    async add(categorie, game) {
        let shareChannel = BOTS.ShareChannels.get(`${game}-${categorie}`);
        if (!shareChannel)
            throw new Error(`Pas de salons de ${categorie} pour le jeux ${game}`);
        else await shareChannel.addChannel(this.channel, game, categorie);

        return `✅ Le channel **<#${
            this.channel.id
        }>** est définit comme channel de **${categorie} pour le jeu ${game}**${
            this.guild.memberCount < 50
                ? '\n==> il recevera les annonces mais il faut **dépasser les 50 membres** pour activer la diffusion'
                : ''
        }`;

    }
}

module.exports = SalonCommand;
