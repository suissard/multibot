const Event = require('../Class/Event.js');
const BOTS = require('../Class/BOTS.js');

module.exports = class CheckCommand extends Event {
    static id = 'MessageReactionAdd';
    static listener = 'messageReactionAdd';

    /**
     * Gère l'événement `messageReactionAdd`.
     * Transmet l'événement au `EmoteMessageManager` pour qu'il le traite,
     * ce qui permet de gérer les systèmes de rôles par réaction.
     * @param {import('discord.js').MessageReaction} reaction - La réaction qui a été ajoutée.
     * @param {import('discord.js').User} user - L'utilisateur qui a ajouté la réaction.
     */
    handleEvent(reaction, user) {
        try {
            BOTS.EmoteMessages.handleMessageReactionAdd(reaction, user); //XEKKO C'est el manager qui gere les evenements

        } catch (err) {
            this.handleError(err, reaction.message.channel);
        }
    }
};
