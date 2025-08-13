const Command = require('../../Class/Command.js');
const BOTS = require('../../Class/BOTS.js');
const { gamePattern, categoryPattern } = require('./shareChannelsConfig.js');

/**
 * Commande de gestion des shareChannel
 */
class SalonCommand extends Command {
    static id = 'shareinfo';
    static devBoss = false;
    static home = false;
    static userPermissions = ['MANAGE_CHANNELS'];
    static botPermissions = [];
    static description = 'Récuperer les infos sur ce salon partagé';
    static help = true;
    static howTo = '';
    static test = [];

    methode(args = {}) {
        try {
            let shareChannel = BOTS.ShareChannels.get('all').get(this.channel.id);
            if (shareChannel !== undefined) return shareChannel.channelInfo();
            else return 'Ce salon n\'est pas dans le système de salon partagée';
        } catch (err) {
            this.handleError(err);
        }
    }
}

module.exports = SalonCommand;
