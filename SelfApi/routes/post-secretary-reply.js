
/**
 * Route permettant de répondre dans une conversation de secrétariat
 */
module.exports = {
    method: 'POST',
    path: '/secretary/reply',
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('../../Class/Bot')} bot
     * @param {import('discord.js').User} user
     */
    handler: async (req, res, bot, user) => {
        const { channelId, content } = req.body;
        if (!channelId || !content) throw { message: 'Channel ID and content required', status: 400 };

        const channel = bot.channels.cache.get(channelId);
        if (!channel) throw { message: 'Channel not found', status: 404 };

        // Security check: ensure it is a secretary channel
        if (!channel.name.match(/-[0-9]+$/) || (!channel.name.startsWith('❌') && !channel.name.startsWith('✅'))) {
            throw { message: 'Invalid secretary channel', status: 403 };
        }

        // Logic similar to Secretary.js handleMsgFromSecretaryGuild but triggered by API
        // We simulate the message object or call the functionality directly? 
        // Secretary.js uses `answer(message)` where message is the Discord Message object from staff.

        // Simpler approach: Send message to the channel as the bot. 
        // BUT Secretary.js `answer` method actually parses the message coming fro THE STAFF inside the channel, then sends DM to user.
        // Wait, if we post to the API, we want the BOT to send the DM to the USER.
        // If we just `channel.send(content)`, the `handleEvent` -> `handleMsgFromSecretaryGuild` of Secretary module MIGHT pick it up if it listens to bot messages?
        // Secretary.js line 19: `if (message.author.bot) return;` (Wait, where is that?)
        // `MessageCheckSecretary.js` line 19: `if (!this.bot.modules.Secretary.secretary || message.author.bot) return;`
        // So the bot ignoring itself preventing the loop.

        // So if we send a message to the channel via API, the module won't trigger `answer`.
        // We must implement the "send DM to user" logic here or reuse the module's method.

        // Let's reuse the module method if possible or replicate the logic.
        // Replicating is safer to avoid mocking a Discord Message object.

        const idUser = channel.name.split('-').pop();
        const targetUser = bot.users.cache.get(idUser) || await bot.users.fetch(idUser).catch(() => null);

        if (!targetUser) throw { message: 'User not found', status: 404 };

        // Send DM to user
        await targetUser.send(content);

        // Send confirmation/log to the secretary channel (optional, but good for history)
        // We can format it to look like it came from the dashboard user
        const embed = {
            description: content,
            author: {
                name: `${user.username} (via Dashboard)`,
                icon_url: user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : null
            },
            footer: { text: 'Réponse envoyée' },
            color: 0x00ff00 // Green
        };

        await channel.send({ embeds: [embed] });
        // Update channel name to ✅ if it was ❌ ? 
        // Secretary.js line 328 checks checks for ❌ and starts with it.
        // `answer` method (Secretary.js line 384) reacts with ✅ but doesn't seem to rename the channel implicitly there?
        // Ah, `checkSecretaryChannel` line 329 renames it back to ❌ if user replies.
        // So we should probably rename it to ✅ to indicate we replied? 
        // Secretary.js doesn't seem to have valid logic for renaming TO ✅, only reset to ❌. 
        // But `answer` reacts with ✅.

        return { success: true };
    }
};
