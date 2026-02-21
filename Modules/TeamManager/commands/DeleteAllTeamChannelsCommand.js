const Command = require('../../../Class/Command');
const TeamChannel = require('../TeamChannel');
const { ChannelType } = require('discord.js');

module.exports = class DeleteAllTeamChannelsCommand extends Command {
    static id = 'deleteallteamchannels';
    static description = 'Supprime tous les salons vocaux d\'équipe (commençant par 🛡️)';
    static userPermissions = ['Administrator'];
    static botPermissions = [];
    static help = true;
    static arguments = [];
    static category = 'TeamManager';

    async methode(args) {
        const guild = this.guild;
        if (!guild) return;

        const channels = guild.channels.cache.filter(c =>
            c.type === ChannelType.GuildVoice &&
            c.name.startsWith(TeamChannel.CHANNEL_PREFIX)
        );

        if (channels.size === 0) {
            return 'Aucun salon d\'équipe trouvé à supprimer.';
        }

        // Send initial message (if possible via interaction/reply mechanism)
        // Command.js handles generic return strings as replies.
        // But for progress updates, we might need to use this.interaction or this.channel

        let msg;
        if (this.interaction) {
            await this.interaction.reply(`Suppression de ${channels.size} salons...`);
            msg = await this.interaction.fetchReply();
        } else if (this.channel) {
            msg = await this.channel.send(`Suppression de ${channels.size} salons...`);
        }

        let deletedCount = 0;
        for (const [id, channel] of channels) {
            try {
                await channel.delete('Commande deleteallteamchannels');
                deletedCount++;
            } catch (error) {
                console.error(`Erreur lors de la suppression du salon ${channel.name}:`, error);
            }
        }

        const finalMsg = `Suppression terminée : ${deletedCount}/${channels.size} salons supprimés.`;

        if (msg) {
            if (this.interaction) await this.interaction.editReply(finalMsg);
            else await msg.edit(finalMsg);
            return; // Already replied/edited
        }

        return finalMsg;
    }
};
