const Command = require('../../../Class/Command');
const TeamChannel = require('../TeamChannel');
const { ChannelType } = require('discord.js');

module.exports = class UpdateTeamChannelPermissionsCommand extends Command {
    static id = 'updateteamchannelpermissions';
    static description = 'Met à jour les permissions d\'un salon d\'équipe spécifique';
    static userPermissions = ['Administrator'];
    static botPermissions = [];
    static help = true;
    static category = 'TeamManager';
    static arguments = [
        {
            type: 'CHANNEL',
            name: 'channel',
            description: 'Le salon vocal d\'équipe à mettre à jour',
            required: true
        }
    ];

    async methode(args) {
        const channelId = args.channel;
        const channel = this.guild.channels.cache.get(channelId);

        if (!channel || channel.type !== ChannelType.GuildVoice) {
            return 'Veuillez mentionner un salon vocal valide.';
        }

        if (!channel.name.startsWith(TeamChannel.CHANNEL_PREFIX)) {
            return `Ce salon ne semble pas être un salon d'équipe (ne commence pas par ${TeamChannel.CHANNEL_PREFIX}).`;
        }

        const teamName = channel.name.substring(TeamChannel.CHANNEL_PREFIX.length);
        const olympeTeams = this.bot.olympe.teams;
        const team = olympeTeams.find(t => t.name === teamName);

        if (!team) {
            return `Aucune équipe Olympe trouvée avec le nom "${teamName}".`;
        }

        try {
            const teamChannel = new TeamChannel(this.bot, team);
            await teamChannel.updatePermissions(channel, this.guild);
            return `Permissions mises à jour pour le salon ${channel.name}.`;
        } catch (error) {
            console.error(error);
            return 'Une erreur est survenue lors de la mise à jour des permissions.';
        }
    }
};
