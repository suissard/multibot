const Command = require('../Class/Command.js');

module.exports = class Done extends Command {
    static id = 'done';
    static devBoss = false;
    static home = false;
    static userPermissions = [];
    static botPermissions = [];
    static description = 'Clos un ticket';
    static help = true;
    static howTo = 'PREFIXCMD';
    static test = [];
    static arguments = [];

    /**
     * Exécute la commande pour marquer un ticket comme "terminé".
     * Renomme le salon actuel en ajoutant un préfixe "✅" pour indiquer qu'il est clos.
     * @param {object} args - Les arguments de la commande (non utilisés ici).
     * @returns {string} Un message de confirmation ou d'échec.
     */
    methode(args = {}) {
        let chan = this.channel;
        if (chan.name.startsWith('✅') == false) {
            chan.setName('✅' + chan.name.replace(/❌/g, ''));
            return 'Ticket clos ! ✅';
        }
        return 'Le ticket n\'a pas pu être clos ❌';
    }
};
