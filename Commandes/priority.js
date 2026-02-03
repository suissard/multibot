const Command = require('../Class/Command.js');
const { ChannelType, PermissionFlagsBits } = require('discord.js');

module.exports = class Priority extends Command {
    static id = 'priority';
    static devBoss = false;
    static home = false;
    static userPermissions = ['ManageMessages'];
    static botPermissions = ['ManageChannels'];
    static description = 'Déplace le ticket en priorité';
    static help = true;
    static howTo = 'PREFIXCMD';
    static test = [];
    static arguments = [];

    static narrative = `
- Cette commande permet de déplacer un ticket vers une catégorie "PRIORITY".
- Elle doit être exécutée dans un salon de ticket.
- Si la catégorie "PRIORITY" n'existe pas, elle est créée en haut de la liste des salons.
`;

    /**
     * Exécute la commande pour déplacer le ticket en priorité.
     * @param {object} args - Les arguments de la commande.
     * @returns {string} Un message de confirmation ou d'échec.
     */
    async methode(args = {}) {
        const chan = this.channel;
        const guild = this.guild;

        // Verify if channel is a ticket
        // Matches typical ticket names like "❌username-1234567890" or "✅username-1234567890"
        const ticketRegex = /^(?:[✅❌🛑⚠️]\s*)?.*-\d{15,20}$/;
        if (!ticketRegex.test(chan.name)) {
            return "❌ Ce salon n'est pas un ticket valide.";
        }

        // Find or create PRIORITY category
        let priorityCat = guild.channels.cache.find(c => c.name === 'PRIORITY' && c.type === ChannelType.GuildCategory);

        if (!priorityCat) {
            try {
                priorityCat = await guild.channels.create({
                    name: 'PRIORITY',
                    type: ChannelType.GuildCategory,
                    position: 0,
                    permissionOverwrites: [
                        {
                            id: guild.id, // @everyone
                            deny: [PermissionFlagsBits.ViewChannel],
                        },
                    ],
                });
            } catch (e) {
                console.error(e);
                return "❌ Impossible de créer la catégorie PRIORITY.";
            }
        }

        // Move channel
        if (chan.parentId === priorityCat.id) {
            return "⚠️ Ce ticket est déjà en priorité.";
        }

        try {
            await chan.setParent(priorityCat, { lockPermissions: false });
            return "Ticket passé en priorité 🔴";
        } catch (e) {
            console.error(e);
            return "❌ Impossible de déplacer le salon.";
        }
    }
};
