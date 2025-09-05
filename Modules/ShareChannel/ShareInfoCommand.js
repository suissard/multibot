const Command = require('../../Class/Command.js');
const BOTS = require('../../Class/BOTS.js');
const { gamePattern, categoryPattern } = require('./shareChannelsConfig.js');

/**
 * Commande de gestion des shareChannel
 */
class SalonCommand extends Command {
    static id = 'shareinfo';
    static devBoss = false;
    static home = false;
    static userPermissions = ['MANAGE_CHANNELS'];
    static botPermissions = [];
    static description = 'Récuperer les infos sur ce salon partagé';
    static help = true;
    static howTo = '';
    static test = [];

    static narrative = `
- Cette commande permet d'obtenir des informations sur le groupe de partage auquel le salon actuel appartient.
- Elle nécessite la permission "Gérer les salons" (\`MANAGE_CHANNELS\`).
- Elle ne prend aucun argument.

- **Fonctionnement :**
    1.  La commande recherche l'ID du salon actuel dans la liste de tous les salons partagés.
    2.  Si l'ID est trouvé, cela signifie que le salon fait partie d'un groupe de partage.
    3.  Elle appelle alors la méthode \`channelInfo()\` de l'objet "ShareChannel" correspondant. Cette méthode est responsable de formater et de retourner les informations sur le groupe (nom, nombre de salons, etc.).
    4.  Si l'ID du salon n'est trouvé dans aucun groupe de partage, elle renvoie un message indiquant que le salon n'est pas partagé.
`;

    /**
     * Exécute la commande pour obtenir des informations sur le groupe de partage du salon actuel.
     * @param {object} args - Les arguments de la commande (non utilisés ici).
     * @returns {string} Une chaîne contenant les informations du groupe, ou un message si le salon n'est pas partagé.
     */
    methode(args = {}) {
        try {
            let shareChannel = BOTS.ShareChannels.get('all').get(this.channel.id);
            if (shareChannel !== undefined) return shareChannel.channelInfo();
            else return 'Ce salon n\'est pas dans le système de salon partagée';
        } catch (err) {
            this.handleError(err);
        }
    }
}

module.exports = SalonCommand;
