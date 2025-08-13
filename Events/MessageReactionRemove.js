const Event = require('../Class/Event.js');
const BOTS = require('../Class/BOTS.js');

module.exports = class CheckCommand extends Event {
    static id = 'MessageReactionRemove';
    static listener = 'messageReactionRemove';

    /**
     * Gère l'événement `messageReactionRemove`.
     * Transmet l'événement au `EmoteMessageManager` pour qu'il le traite,
     * ce qui permet de gérer les systèmes de rôles par réaction.
     * @param {import('discord.js').MessageReaction} reaction - La réaction qui a été retirée.
     * @param {import('discord.js').User} user - L'utilisateur qui a retiré la réaction.
     */
    handleEvent(reaction, user) {
        try {
            BOTS.EmoteMessages.handleMessageReactionRemove(reaction, user);

        } catch (err) {
            this.handleError(err, reaction.message.channel);
        }
    }
};
