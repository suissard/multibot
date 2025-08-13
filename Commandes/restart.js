const Commande = require('../Class/Command.js');

module.exports =
    class Restart extends Commande {

        static id = 'restart';
        static devBoss = true;
        static home = true;
        static userPermissions = ['Administrator'];
        static botPermissions = [];
        static description = 'redemarre le bot';
        static help = false;
        static howTo = 'PREFIXCMD';
        static test = [];
        static arguments = [
            {
                type: 'STRING',
                name: 'raison',
                description: 'Raison du restart',
                required: false,
            },
        ];


        methode(args = {}) {
            let result = 'Redémarrage efféctué avec succès !';
            if (this.bot.ownerId == this.user.id) {
                if (args.raison) {
                    result = result + '\nPour la raison suivante : ' + args.raison;
                }
                this.bot.restart();
                return result;
            } else {
                return 'Cette commande est réservé au proprietaire du bot';
            }
            //throw new Error("Cette commande est réservé au proprietaire du bot")
        }
    };