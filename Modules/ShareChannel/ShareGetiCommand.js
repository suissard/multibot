const Command = require('../../Class/Command.js');
const BOTS = require('../../Class/BOTS.js');

module.exports = class Done extends Command {
    static id = 'sharegeti';
    static devBoss = false;
    static home = false;
    static userPermissions = [];
    static botPermissions = [];
    static description = 'Définit ce salon pour partager les annonces Geti';
    static help = true;
    static howTo = 'PREFIXCMD';
    static test = [];
    static arguments = [];

    static narrative = `
- Cette commande est un raccourci pour désigner le salon actuel comme un salon de partage pour les annonces "Geti" (probablement GeekingTime).
- Elle ne nécessite aucune permission particulière pour être utilisée.
- Elle ne prend aucun argument.

- **Fonctionnement :**
    1.  La commande cible directement le groupe de partage "overwatch-geti".
    2.  Elle ajoute le salon dans lequel la commande a été exécutée à ce groupe de partage spécifique.
    3.  Elle renvoie ensuite un message confirmant que les annonces GeekingTime seront désormais publiées dans ce salon.
`;

    /**
     * Exécute la commande pour définir le salon actuel comme un salon de partage pour les annonces "Geti".
     * Ajoute le salon au groupe de partage "overwatch-geti".
     * @param {object} args - Les arguments de la commande (non utilisés ici).
     * @returns {Promise<string>} Un message de confirmation.
     */
    async methode(args = {}) {
        let shareChannel = BOTS.ShareChannels.get(`overwatch-geti`);
        await shareChannel.addChannel(this.channel, 'overwatch', 'geti');
        return 'Les annonces de GeekingTime seront dorénavant publiés ici';
    }
};
