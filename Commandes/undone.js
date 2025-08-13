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

    methode(args = {}) {
        let chan = this.channel;
        if (chan.name.startsWith('❌') == false) {
            chan.setName('❌' + chan.name.replace(/✅/g, ''));
            return 'Ticket réouvert ! ✅';
        }
        return 'Le ticket n\'a pas pu être réouvert ❌';
    }
};
