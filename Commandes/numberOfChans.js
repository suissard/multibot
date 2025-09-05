const Command = require('../Class/Command.js');

module.exports = class Done extends Command {
    static id = 'numberofchans';
    static devBoss = false;
    static home = false;
    static userPermissions = [];
    static botPermissions = [];
    static description = 'Donne le nombre de channel du serveur';
    static help = true;
    static howTo = 'PREFIXCMD';
    static test = [];
    static arguments = [];

    static narrative = `
- La commande récupère le nombre total de salons (channels) actuellement présents sur le serveur.
- Elle accède à la collection \`channels.cache\` de l'objet \`guild\` (serveur) pour en obtenir la taille.
- Elle retourne une simple chaîne de caractères indiquant ce nombre, avec un rappel de la limite de 500 salons par serveur sur Discord.
`;

    /**
     * Exécute la commande pour obtenir le nombre de salons sur le serveur.
     * @param {object} args - Les arguments de la commande (non utilisés ici).
     * @returns {string} Un message indiquant le nombre de salons.
     */
    methode(args = {}) {
        return `Le nombre de channel de ce server est: ${this.guild.channels.cache.size}/500`;
    }
};
