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

        static narrative = `
- Cette commande est conçue pour redémarrer le bot.
- **Sécurité :** L'exécution est strictement réservée au propriétaire du bot, dont l'ID est défini dans la configuration (\`this.bot.ownerId\`).
- La commande vérifie si l'ID de l'utilisateur qui l'exécute correspond à l'ID du propriétaire.
- Si c'est le cas, elle appelle la méthode \`this.bot.restart()\` qui gère le processus de redémarrage.
- Si une raison est fournie en argument, elle est ajoutée au message de confirmation qui est envoyé juste avant le redémarrage.
- Si l'utilisateur n'est pas le propriétaire, la commande renvoie un message d'erreur et ne fait rien d'autre.
`;


        /**
         * Exécute la commande pour redémarrer le bot.
         * La commande ne peut être exécutée que par le propriétaire du bot.
         * @param {object} args - Les arguments de la commande.
         * @param {string} [args.raison] - La raison du redémarrage, qui sera incluse dans la réponse.
         * @returns {string} Un message de confirmation ou un message d'erreur si l'utilisateur n'est pas le propriétaire.
         */
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