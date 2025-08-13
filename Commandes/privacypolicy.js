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

    methode(args = {}) {
        return privacypolicy;
    }
};
