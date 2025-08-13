const Event = require('../../Class/Event.js');
const BOTS = require('../../Class/BOTS.js');


/**
 * Evenement permettant de gerer les messages envoyés dans un shareChannel
 */
class ShareEvent extends Event {
    static id = 'shareEvent';
    static listener = 'messageCreate';

    /**
     * Gère l'événement `messageCreate` pour les salons partagés.
     * Si le message provient d'un salon qui fait partie d'un groupe de partage,
     * il est transmis au gestionnaire de ce groupe pour être traité.
     * @param {import('discord.js').Message} message - Le message créé.
     */
    handleEvent(message) {
        try {
            let shareChannels = BOTS.ShareChannels.get('all').get(message.channel.id);
            if (shareChannels) shareChannels.handleMessage(message);
        } catch (err) {
            this.handleError(err);
        }
    }
}

module.exports = ShareEvent;