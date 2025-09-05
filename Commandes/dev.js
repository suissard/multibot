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

    static narrative = `
- Cette commande est réservée exclusivement au propriétaire du bot (devBoss).
- Elle prend en entrée une chaîne de caractères qui est du code JavaScript.
- Elle exécute ce code directement en utilisant \`eval()\`.
- **AVERTISSEMENT :** L'utilisation de \`eval()\` est extrêmement dangereuse et ne doit être utilisée qu'en toute connaissance de cause, car elle peut exposer le bot et le système à des risques de sécurité majeurs.
- Si le code exécuté retourne un résultat, celui-ci est renvoyé à l'utilisateur.
- En cas d'erreur lors de l'exécution, la commande renvoie le message d'erreur et la pile d'appels (stack trace) à l'utilisateur.
`;

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
