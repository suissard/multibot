const Command = require('../Class/Command.js');
const fs = require('fs');
const privacypolicy = fs.readFileSync('./PRIVACY.md').toString();

module.exports = class Ping extends Command {
    static id = 'privacypolicy';
    static devBoss = false;
    static home = false;
    static userPermissions = [];
    static botPermissions = [];
    static description = 'Fournit la politique de confidentialité du bot';
    static help = true;
    static howTo = 'PREFIXCMD';
    static test = [{ options: [{ name: 'texte', value: 'test de Ping' }] }];
    static arguments = [];

    static narrative = `
- Au moment du chargement initial du fichier de commande (et non à chaque exécution), le contenu du fichier \`PRIVACY.md\` situé à la racine du projet est lu et stocké en mémoire.
- Lorsque la commande est exécutée, elle retourne simplement le contenu de ce fichier qui a été préalablement chargé.
- Cela permet d'afficher la politique de confidentialité du bot directement dans Discord.
`;

    /**
     * Exécute la commande pour afficher la politique de confidentialité.
     * Lit le fichier PRIVACY.md et retourne son contenu.
     * @param {object} args - Les arguments de la commande (non utilisés ici).
     * @returns {string} Le contenu du fichier de politique de confidentialité.
     */
    methode(args = {}) {
        return privacypolicy;
    }
};
