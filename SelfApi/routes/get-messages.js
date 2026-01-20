module.exports = {
    path: '/messages',
    method: 'get',
    /**
     * Get recent messages from a channel.
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('../../Class/Bot')} bot
     */
    handler: async (req, res, bot) => {
        if (!bot) return res.status(404).json({ message: 'Bot non trouvé' });

        const channelId = req.query.channel_id;
        if (!channelId) return res.status(400).json({ message: 'channel_id required' });

        try {
            const channel = await bot.channels.fetch(channelId);
            if (!channel || !channel.isText()) {
                return res.status(404).json({ message: 'Channel textuel introuvable ou invalide' });
            }

            const limit = parseInt(req.query.limit) || 50;
            const messages = await channel.messages.fetch({ limit });

            return messages.map(m => ({
                id: m.id,
                content: m.content ? (m.content.length > 50 ? m.content.substring(0, 50) + '...' : m.content) : '[Contenu non textuel]',
                author: {
                    id: m.author.id,
                    username: m.author.username,
                    avatar: m.author.displayAvatarURL()
                },
                createdAt: m.createdAt,
                embeds: m.embeds.length
            }));

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erreur lors de la récupération des messages' });
        }
    },
};
