const Event = require('../../../Class/Event.js');
const { processFromDiscordUserId } = require('../../AutoRole/utils/utils.js');
const { syncMemberPermissions } = require('../utils/channelManagement.js');

module.exports = class GuildMemberAddAutorole extends Event {
    static id = 'autorolenewguildmember';
    static listener = 'guildMemberAdd';
    static description = "Déclenche l'attribution de rôles automatique pour un nouveau membre.";
    static narrative = `Cet événement écoute l'événement \`guildMemberAdd\` et, lorsqu'un nouveau membre rejoint le serveur, il déclenche le processus d'attribution de rôles automatique pour cet utilisateur.`;

    /**
     * Gère l'événement d'arrivée d'un nouveau membre sur le serveur.
     * Déclenche le processus d'attribution de rôles automatique pour ce nouveau membre.
     * @param {import('discord.js').GuildMember} member - Le membre qui vient de rejoindre.
     */
    async handleEvent(member) {
        try {
			const result = await processFromDiscordUserId(member.id, this.bot)
            if (result) this.bot.log( `Arrivé de ${member.user.username } => role de compétition mis à jour `,"autorole-newguildmember")
            await syncMemberPermissions(this.bot, member, member.guild);
        } catch (err) {
            this.handleError(err);
        }
    }
};