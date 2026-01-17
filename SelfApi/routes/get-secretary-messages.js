
/**
 * Route permettant de récupérer les messages d'une conversation de secrétariat
 */
module.exports = {
    method: 'GET',
    path: '/secretary/conversations/:channelId',
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('../../Class/Bot')} bot
     */
    handler: async (req, res, bot) => {
        const channelId = req.params.channelId;
        if (!channelId) throw { message: 'Channel ID required', status: 400 };

        const channel = bot.channels.cache.get(channelId);
        if (!channel) throw { message: 'Channel not found', status: 404 };

        // Security check: ensure it is a secretary channel
        if (!channel.name.match(/-[0-9]+$/) || (!channel.name.startsWith('❌') && !channel.name.startsWith('✅'))) {
            throw { message: 'Invalid secretary channel', status: 403 };
        }

        // Fetch messages
        const messages = await channel.messages.fetch({ limit: 50 });

        const formattedMessages = [];
        messages.forEach(msg => {
            const formatted = {
                id: msg.id,
                content: msg.content,
                author: {
                    id: msg.author.id,
                    username: msg.author.username,
                    avatar: msg.author.displayAvatarURL(),
                    bot: msg.author.bot
                },
                timestamp: msg.createdTimestamp,
                attachments: msg.attachments.map(a => ({ url: a.url, name: a.name, type: a.contentType })),
                embeds: msg.embeds
            };
            formattedMessages.push(formatted);
        });

        // Return sorted by timestamp ascending
        return formattedMessages.sort((a, b) => a.timestamp - b.timestamp);
    }
};
