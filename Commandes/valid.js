const Command = require('../Class/Command.js');

module.exports =
    class Valid extends Command {

        static id = 'valid';
        static devBoss = false;
        static home = false;
        static userPermissions = [];
        static botPermissions = [];
        static description = 'Permet de valider une commande';
        static help = true;
        static howTo = 'PREFIXCMD';
        static test = [];

        methode() {
            //Chaque commande à valider a un id
            let cmdId = this.args[0];
            this.bot.validableCommands.get(cmdId);


        }
    };