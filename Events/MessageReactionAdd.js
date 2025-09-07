const Event = require('../Class/Event.js');
const BOTS = require('../Class/BOTS.js');

module.exports = class CheckCommand extends Event {
    static id = 'MessageReactionAdd';
    static listener = 'messageReactionAdd';
    static description = 'Gère l\'ajout de réactions pour les rôles par réaction.';
    static narrative = "Cet événement écoute l'événement `messageReactionAdd` et transmet la réaction et l'utilisateur au `EmoteMessageManager`. Ce manager gère ensuite la logique pour attribuer ou retirer des rôles en fonction des réactions.";

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
