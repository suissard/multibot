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

        static narrative = `
- **ATTENTION : Cette commande semble incomplète ou faire partie d'un système inachevé.**
- L'objectif de cette commande est de "valider" une autre commande qui serait en attente.
- Elle prend en argument l'ID d'une commande à valider.
- Elle tente de récupérer cette commande depuis une collection \`this.bot.validableCommands\`.
- Cependant, le code actuel ne fait rien avec la commande une fois qu'elle est récupérée. La logique de validation elle-même n'est pas implémentée.
`;

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