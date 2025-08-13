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

        /**
         * Exécute la commande pour valider une autre commande en attente.
         * @todo La logique de cette commande est incomplète. Elle récupère une commande
         * depuis `this.bot.validableCommands` mais n'effectue aucune action avec.
         * Le système de commandes validables semble être une fonctionnalité non standard ou inachevée.
         */
        methode() {
            //Chaque commande à valider a un id
            let cmdId = this.args[0];
            this.bot.validableCommands.get(cmdId);


        }
    };