
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
        if (!channel.name.match(/-[0-9]+$/)) {
            throw { message: 'Invalid secretary channel format', status: 403 };
        }

        // Extract User ID from channel name (format: STATUS-USERNAME-USERID)
        // Taking the last part ensures we get the ID even if username has hyphens
        const userId = channel.name.split('-').pop();

        let user;
        try {
            user = await bot.users.fetch(userId);
        } catch (e) {
            throw { message: 'User not found or invalid ID', status: 404 };
        }

        // Fetch DM Channel
        const dmChannel = await user.createDM();

        // Fetch messages from DM
        const messages = await dmChannel.messages.fetch({ limit: 50 });

        const formattedMessages = [];
        messages.forEach(msg => {
            // Determine "Author" for the frontend
            // If msg.author.id == userId -> It's the User
            // If msg.author.id == bot.user.id -> It's the Bot (representing Staff)
            // Others -> Ignore or mark as system? generally DMs are 1on1.

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
                embeds: msg.embeds,
                // Add a flag to help frontend know if it's "Staff" (Bot) or "User"
                isStaff: msg.author.id === bot.user.id
            };
            formattedMessages.push(formatted);
        });

        // Return sorted by timestamp ascending
        return formattedMessages.sort((a, b) => a.timestamp - b.timestamp);
    }
};
