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

    methode(args = {}) {
        let chan = this.channel;
        if (chan.name.startsWith('✅') == false) {
            chan.setName('✅' + chan.name.replace(/❌/g, ''));
            return 'Ticket clos ! ✅';
        }
        return 'Le ticket n\'a pas pu être clos ❌';
    }
};
