const Command = require('../../Class/Command.js');
const { processCasterUsers } = require('./utils/utils.js');

module.exports = class GiveCasterRole extends Command {
    static id = 'givecasterrole';
    static devBoss = false;
    static home = true;
    static userPermissions = ['MANAGE_ROLES'];
    static botPermissions = [];
    static description = 'Lance la procédure pour donner les roles aux casters';
    static help = true;
    static howTo = 'PREFIXCMD';
    static test = [];
    static arguments = [];

    static narrative = `
- La commande lance la procédure pour donner les roles aux casters.
`;

    /**
     * Exécute la commande caster.
     * @param {object} args - Les arguments de la commande.
     * @returns {string} La réponse de la commande.
     */
    async methode(args = {}) {
        await processCasterUsers(this.bot, this.guild);
        return "La procédure pour donner les roles aux casters a été lancée.";
    }
};