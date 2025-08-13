const Command = require('../../Class/Command.js');
const BOTS = require('../../Class/BOTS.js');

module.exports = class Done extends Command {
    static id = 'sharegeti';
    static devBoss = false;
    static home = false;
    static userPermissions = [];
    static botPermissions = [];
    static description = 'Définit ce salon pour partager les annonces Geti';
    static help = true;
    static howTo = 'PREFIXCMD';
    static test = [];
    static arguments = [];

    /**
     * Exécute la commande pour définir le salon actuel comme un salon de partage pour les annonces "Geti".
     * Ajoute le salon au groupe de partage "overwatch-geti".
     * @param {object} args - Les arguments de la commande (non utilisés ici).
     * @returns {Promise<string>} Un message de confirmation.
     */
    async methode(args = {}) {
        let shareChannel = BOTS.ShareChannels.get(`overwatch-geti`);
        await shareChannel.addChannel(this.channel, 'overwatch', 'geti');
        return 'Les annonces de GeekingTime seront dorénavant publiés ici';
    }
};
