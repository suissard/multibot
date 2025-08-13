const Command = require('../Class/Command.js');

module.exports = class Undone extends Command {
    static id = 'undone';
    static devBoss = false;
    static home = false;
    static userPermissions = [];
    static botPermissions = [];
    static description = 'Rouvre un ticket';
    static help = true;
    static howTo = 'PREFIXCMD';
    static test = [];
    static arguments = [];

    /**
     * Exécute la commande pour marquer un ticket comme "non terminé" ou le rouvrir.
     * Renomme le salon actuel en ajoutant un préfixe "❌" pour indiquer qu'il est en cours.
     * @param {object} args - Les arguments de la commande (non utilisés ici).
     * @returns {string} Un message de confirmation ou d'échec.
     */
    methode(args = {}) {
        let chan = this.channel;
        if (chan.name.startsWith('❌') == false) {
            chan.setName('❌' + chan.name.replace(/✅/g, ''));
            return 'Ticket réouvert ! ✅';
        }
        return 'Le ticket n\'a pas pu être réouvert ❌';
    }
};
