const Event = require('../../../Class/Event.js');
const { processFromDiscordUserId } = require('../../AutoRole/utils/utils.js');

module.exports = class GuildMemberAddAutorole extends Event {
    static id = 'autorolenewguildmember';
    static listener = 'guildMemberAdd';

    /**
     * Gère l'événement d'arrivée d'un nouveau membre sur le serveur.
     * Déclenche le processus d'attribution de rôles automatique pour ce nouveau membre.
     * @param {import('discord.js').GuildMember} member - Le membre qui vient de rejoindre.
     */
    async handleEvent(member) {
        try {
			const result = await processFromDiscordUserId(member.id, this.bot)
            if (result) this.bot.log( `Arrivé de ${member.user.username } => role de compétition mis à jour `,"autorole-newguildmember")
        } catch (err) {
            this.handleError(err);
        }
    }
};