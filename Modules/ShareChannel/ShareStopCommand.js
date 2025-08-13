const Command = require('../../Class/Command.js');
const BOTS = require('../../Class/BOTS.js');
const { gamePattern, categoryPattern } = require('./shareChannelsConfig.js');

/**
 * Commande de gestion des shareChannel
 */
class SalonCommand extends Command {
    static id = 'sharestop';
    static devBoss = false;
    static home = false;
    static userPermissions = ['MANAGE_CHANNELS'];
    static botPermissions = [];
    static description = 'Retirer un salon du systeme de partage';
    static help = true;
    static howTo = '';
    static test = [];

    /**
     * Exécute la commande pour retirer le salon actuel de son groupe de partage.
     * @param {object} args - Les arguments de la commande (non utilisés ici).
     * @returns {string} Un message de confirmation ou d'erreur.
     */
    methode(args = {}) {
        try {
            let shareChannel = BOTS.ShareChannels.get('all').get(this.channel.id);

            if (shareChannel !== undefined) return this.del();
            else return 'Ce salon n\'est pas dans le système de salon partagée';
        } catch (err) {
            this.handleError(err);
        }
    }

    /**
     * Retire le salon actuel de son groupe de partage.
     * @returns {string} Un message de confirmation.
     * @throws {Error} Si le salon n'était pas dans le système de partage.
     * @todo Utilise `this.message.channel.id` qui est obsolète, devrait utiliser `this.channel.id`.
     */
    del() {
        let shareChannel = BOTS.ShareChannels.get('all').get(this.message.channel.id);
        if (!shareChannel)
            throw new Error(
                `❌ Le Channel ${this.channel.name} n'est pas dans le systeme de partage`,
            );

        //supprimer l'entrée
        shareChannel.deleteChannel(this.channel.id);
        return `🗑️ Le Channel ${this.channel.name} n'est plus dans le systeme`;
    }
}

module.exports = SalonCommand;
