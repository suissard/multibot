const { GuildMember, Message, Guild, TextChannel, User } = require('discord.js');

/**
 * Hydrates a pure JSON payload into Discord.js objects based on the event name.
 * @param {import('../../Class/Bot')} bot - The bot instance.
 * @param {string} eventName - The name of the event (e.g., 'guildMemberAdd').
 * @param {object|Array} payload - The raw data from the API.
 * @returns {Promise<Array>} An array of arguments ready to be emitted.
 */
async function hydratePayload(bot, eventName, payload) {
    if (!Array.isArray(payload)) {
        payload = [payload];
    }

    const hydratedArgs = [];

    // Helper to fetch or mock
    const helpers = {
        getGuild: async (id) => bot.guilds.cache.get(id) || bot.guilds.fetch(id).catch(() => null),
        getUser: async (id) => bot.users.cache.get(id) || bot.users.fetch(id).catch(() => null),
        getChannel: async (id) => bot.channels.cache.get(id) || bot.channels.fetch(id).catch(() => null),
    };

    switch (eventName) {
        case 'guildMemberAdd':
        case 'guildMemberRemove':
            // Payload [0]: GuildMember
            // Expected JSON: { guildId, userId } or full object
            {
                const data = payload[0] || {};
                let member = null;
                if (data.guildId && data.userId) {
                    const guild = await helpers.getGuild(data.guildId);
                    if (guild) {
                        member = await guild.members.fetch(data.userId).catch(() => null);
                    }
                }
                // If we couldn't fetch, we can try to construct a mock if we have enough data, 
                // but for now let's return what we found or the raw data if it's just a test object
                hydratedArgs.push(member || data);
            }
            break;

        case 'messageCreate':
        case 'messageDelete':
            // Payload [0]: Message
            // Expected JSON: { channelId, messageId }
            {
                const data = payload[0] || {};
                let message = null;
                if (data.channelId && data.messageId) {
                    const channel = await helpers.getChannel(data.channelId);
                    if (channel && channel.isTextBased()) {
                        message = await channel.messages.fetch(data.messageId).catch(() => null);
                    }
                }

                // Fallback to Mock if fetch failed or insufficient IDs
                if (!message) {
                    message = {
                        id: data.messageId || 'mock-message-id',
                        content: data.content || '',
                        author: { id: data.authorId || 'mock-author-id', bot: false, username: 'MockUser' },
                        channelId: data.channelId || 'mock-channel-id',
                        guildId: data.guildId,
                        // Add other necessary properties/methods as needed by listeners
                        reply: async (msg) => console.log('Mock Reply:', msg),
                    };
                }

                hydratedArgs.push(message);
            }
            break;

        case 'channelCreate':
        case 'channelDelete':
        case 'channelUpdate':
            // Payload: Channel
            {
                const data = payload[0] || {};
                let channel = null;
                if (data.id) {
                    channel = await helpers.getChannel(data.id);
                }
                hydratedArgs.push(channel || data);
                if (eventName === 'channelUpdate') {
                    // Update needs old channel too, which is hard to simulate perfectly without caching history.
                    // We might just pass the same channel twice or accept a second arg in payload.
                    const oldData = payload[1] || data;
                    hydratedArgs.push(oldData);
                }
            }
            break;

        default:
            // For unknown events, return payload as is
            return payload;
    }

    return hydratedArgs;
}

module.exports = { hydratePayload };
