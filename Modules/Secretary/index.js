const MessageCheckSecretary = require('./MessageCheckSecretary.js');
const ReadyCreateSecretary = require('./ReadyCreateSecretary.js');
const Secretary = require('./Secretary.js');

/**
 * Le module "Secretary" met en place un système de support par message privé.
 *
 * Lorsqu'un utilisateur envoie un message privé au bot, ce module l'intercepte.
 * Si un salon de support dédié à cet utilisateur n'existe pas déjà, il en crée un nouveau dans une catégorie privée visible uniquement par le staff.
 * Le message de l'utilisateur est ensuite transféré dans ce salon, permettant aux membres du staff de discuter de la demande et d'y répondre de manière centralisée et confidentielle.
 * Le module gère l'ensemble du cycle de vie de ces salons de support.
 *
 * @param {import('../../Class/Bot')} bot - L'instance du bot.
 * @returns {object} Un objet contenant les classes du module.
 */
module.exports = (bot) => {
    return {
        MessageCheckSecretary,
        ReadyCreateSecretary,
        Secretary,
    };
};