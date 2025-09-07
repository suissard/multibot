/**
 * @description Initialise le module ShareChannel pour un bot.
 * @narrative Ce module gère le partage de messages entre différents salons, potentiellement sur différents serveurs. Il est composé d'événements pour détecter les messages, les mises à jour et les suppressions, et de commandes pour gérer les partages.
 * @param {import('../../Class/Bot')} bot - L'instance du bot.
 * @returns {object} Un objet contenant les classes du module.
 */
module.exports = (bot) => {
    const LoadShareChannels = require('./LoadShareChannelsBotsReady.js');
    const ShareEvent = require('./ShareEvent.js');
    const ShareEventUpdate = require('./ShareEventUpdate.js');
    const ShareEventDelete = require('./ShareEventDelete.js');
    const SalonCommand = require('./SalonCommand.js');
    const ShareInfoCommand = require('./ShareInfoCommand.js');
    const SharePromoCommand = require('./SharePromoCommand.js');
    const ShareStopCommand = require('./ShareStopCommand.js');
    const ShareGetiCommand = require('./ShareGetiCommand.js');

    return {
        ShareEvent,
        ShareEventUpdate,
        ShareEventDelete,
        SalonCommand,
        ShareInfoCommand,
        SharePromoCommand,
        ShareStopCommand,
        LoadShareChannels,
        ShareGetiCommand,
    };
};
