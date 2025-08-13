const Command = require('../Class/Command.js');

module.exports = class Done extends Command {
    static id = 'numberofchans';
    static devBoss = false;
    static home = false;
    static userPermissions = [];
    static botPermissions = [];
    static description = 'Donne le nombre de channel du serveur';
    static help = true;
    static howTo = 'PREFIXCMD';
    static test = [];
    static arguments = [];

    /**
     * Exécute la commande pour obtenir le nombre de salons sur le serveur.
     * @param {object} args - Les arguments de la commande (non utilisés ici).
     * @returns {string} Un message indiquant le nombre de salons.
     */
    methode(args = {}) {
        return `Le nombre de channel de ce server est: ${this.guild.channels.cache.size}/500`;
    }
};
