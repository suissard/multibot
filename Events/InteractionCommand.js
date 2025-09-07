const Event = require('../Class/Event.js');
const BOTS = require('../Class/BOTS.js');

module.exports = class InteractionCommand extends Event {
    static id = 'InteractionCommand';
    static listener = 'interactionCreate';
    static description = 'Gère les interactions de commande slash.';
    static narrative = `Cet événement est le point d'entrée pour la gestion des commandes slash (interactions). Lorsqu'un utilisateur exécute une commande slash, Discord envoie une interaction que cet événement intercepte. Son rôle est de vérifier si l'interaction est une commande, et si c'est le cas, de la transmettre au CommandManager pour traitement.`;

    /**
     * Gère l'événement `interactionCreate` pour les commandes slash.
     * Si l'interaction est une commande, elle est transmise au CommandManager pour être traitée.
     * @param {import('discord.js').Interaction} interaction - L'interaction reçue.
     */
    handleEvent(interaction) {
        try {
            if (interaction.isCommand()) BOTS.Commands.handleInteractionCommand(this.bot, interaction);
        } catch (err) {
            this.handleError(err);
        }
    }
};

