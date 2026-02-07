const Command = require('../../Class/Command.js');
const Discord = require('discord.js');

module.exports = class PriorityCommand extends Command {
    static id = 'priority';
    static description = 'Passe un ticket en priorité haute 🔴';
    static userPermissions = ['ManageChannels'];
    static botPermissions = ['ManageChannels'];
    static arguments = [
        {
            type: 'CHANNEL',
            name: 'channel',
            description: 'Le salon à passer en priorité (optionnel)',
            required: false
        }
    ];

    /**
     * Exécute la commande pour passer un ticket en priorité.
     * @param {object} args - Arguments de la commande.
     * @returns {string} Message de confirmation.
     */
    async methode(args = {}) {
        const { interaction } = args;

        // Use the provided channel argument (resolved object), or default to the current channel
        let targetChannel = interaction?.options?.getChannel('channel');
        if (!targetChannel) {
            targetChannel = this.channel;
        }

        if (!targetChannel) {
             return "❌ Salon introuvable.";
        }

        // Only works on Text/News channels (Ticket channels)
        // Compatibility check for older djs versions if needed, but isTextBased() is standard v14.
        // We check type explicitly to match SecretarySort logic and avoid threads if necessary (though tickets aren't threads usually).
        // Actually SecretarySort uses: c.type === Discord.ChannelType.GuildText || c.type === Discord.ChannelType.GuildAnnouncement
        const validTypes = [Discord.ChannelType.GuildText, Discord.ChannelType.GuildAnnouncement, Discord.ChannelType.GuildNews];
        if (!validTypes.includes(targetChannel.type)) {
             return "❌ Ce n'est pas un salon valide (Text/Announcement uniquement).";
        }

        const bot = this.bot;
        const secretaryConfig = bot.modules?.Secretary?.secretary;
        if (!secretaryConfig) return "❌ Module Secrétariat inactif.";

        const guildSettings = secretaryConfig.filter(c => c.guild.id === this.guild.id);
        if (!guildSettings.length) return "❌ Aucun secrétariat configuré ici.";

        // Identify Base Name
        let identifiedBase = null;
        let originalParent = targetChannel.parent;

        // Helper regex for logo match
        const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const isBaseOrOverflow = (name, base) => {
            if (name === base) return true;
             // Check "Base - 1", "Base - 2"
            const regex = new RegExp(`^${escapeRegExp(base)} - \\d+$`);
            return regex.test(name);
        };

        // Also check if it's already in a Priority Category
        const isPriorityCategory = (name, base) => name === `🔴 ${base}`;

        for (const config of guildSettings) {
            const base = config.name;

            // 1. Check Parent Category Name
            if (originalParent) {
                if (isBaseOrOverflow(originalParent.name, base) || isPriorityCategory(originalParent.name, base)) {
                    identifiedBase = base;
                    break;
                }
            }
        }

        // 2. Fallback: Check Channel Name (Orphan detection) or Single Base
        if (!identifiedBase && guildSettings.length === 1) {
             // If only one base exists, and the channel looks like a ticket (ends in digits), assume it's ours.
             // Regex: Ends with -digits (at least 15)
             if (/-\d{15,20}$/.test(targetChannel.name)) {
                 identifiedBase = guildSettings[0].name;
             }
        }

        if (!identifiedBase) {
            return "❌ Ce salon ne semble pas être un ticket du secrétariat (Impossible de déterminer la catégorie parente).";
        }

        // Target Category Name
        const priorityCatName = `🔴 ${identifiedBase}`;

        // Check if already in correct category
        if (originalParent && originalParent.name === priorityCatName) {
            return "⚠️ Ce ticket est déjà en priorité.";
        }

        if (interaction && !interaction.deferred && !interaction.replied) await interaction.deferReply();

        // Find or Create Priority Category
        let priorityCat = this.guild.channels.cache.find(c =>
            c.type === Discord.ChannelType.GuildCategory && c.name === priorityCatName
        );

        if (!priorityCat) {
            // Find the "Standard" base category to copy perms
            // We search for the base name to copy its permissions
            const standardCat = this.guild.channels.cache.find(c =>
                c.type === Discord.ChannelType.GuildCategory && c.name === identifiedBase
            );

            const perms = standardCat ? standardCat.permissionOverwrites.cache : [];

            try {
                priorityCat = await this.guild.channels.create({
                    name: priorityCatName,
                    type: Discord.ChannelType.GuildCategory,
                    position: 0, // TOP
                    permissionOverwrites: perms
                });
            } catch (e) {
                return `❌ Erreur lors de la création de la catégorie prioritaire : ${e.message}`;
            }
        } else {
             // Ensure position is 0 (or close to top)
             // We force 0.
             if (priorityCat.position > 1) {
                 await priorityCat.setPosition(0).catch(console.error);
             }
        }

        // Move the channel
        try {
            await targetChannel.setParent(priorityCat, { lockPermissions: false });
            return "Ticket passé en priorité 🔴";
        } catch (e) {
            return `❌ Erreur lors du déplacement du ticket : ${e.message}`;
        }
    }
};
