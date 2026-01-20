/**
 * Schemas/Templates for Discord Event payloads.
 * These keys correspond to the event names.
 * The values are JSON templates that the user can fill in efficiently.
 */
const EventSchemas = {
    // Basic Guild Events
    guildMemberAdd: { guildId: "GUILD_ID", userId: "USER_ID" },
    guildMemberRemove: { guildId: "GUILD_ID", userId: "USER_ID" },

    // Message Events
    messageCreate: { channelId: "CHANNEL_ID", content: "Hello World", authorId: "USER_ID" },
    messageDelete: { channelId: "CHANNEL_ID", messageId: "MESSAGE_ID" },
    messageUpdate: { channelId: "CHANNEL_ID", messageId: "MESSAGE_ID", newContent: "New Content" },

    // Reaction Events
    messageReactionAdd: { channelId: "CHANNEL_ID", messageId: "MESSAGE_ID", userId: "USER_ID", emoji: "👍" },
    messageReactionRemove: { channelId: "CHANNEL_ID", messageId: "MESSAGE_ID", userId: "USER_ID", emoji: "👍" },

    // Channel Events
    channelCreate: { guildId: "GUILD_ID", name: "new-channel", type: 0 },
    channelDelete: { channelId: "CHANNEL_ID" },

    // Custom Module Events (if they appear in the list)
    Secretary: {
        // Assuming this is used for testing Secretary module logic via event trigger
        userId: "USER_ID",
        content: "Message for support"
    },

    // Interaction (Slash Command Simulation)
    interactionCreate: {
        guildId: "GUILD_ID",
        channelId: "CHANNEL_ID",
        userId: "USER_ID",
        commandName: "ping",
        options: []
    },

    // Generic/Unknown
    default: { note: "No template available for this event. Please check Discord.js documentation." }
};

module.exports = EventSchemas;
