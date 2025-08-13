const Commande = require('../Class/Command.js');

module.exports = class Dev extends Commande {
    static id = 'dev';
    static devBoss = true;
    static home = true;
    static userPermissions = [];
    static botPermissions = [];
    static description = 'Execute le code javascript indiqué dans le message';
    static help = false;
    static howTo = 'PREFIXCMD';
    static test = [];

    /**
     * Exécute du code JavaScript fourni en argument.
     * Commande réservée au développeur du bot.
     * @warning L'utilisation de `eval` est extrêmement dangereuse et peut exposer le système à des vulnérabilités.
     */
    methode() {
        try {
            let result = eval(this.args.join(' '));
            if (result) this.answerToUser(result);
        } catch (e) {
            this.answerToUser(e.stack);
        }
    }
};
