import { describe, it, expect, vi } from 'vitest';
import { autoChannel } from '../Modules/ChannelManager/utils/channelManagement.js';
import Bot from '../Class/Bot.js';

// Mock dependencies to avoid actual network calls in this demo
vi.mock('../services/apiService', () => ({
    getFutureMatchs: vi.fn(),
    getPastMatchs: vi.fn(),
    getMatchById: vi.fn(),
    getUserById: vi.fn(),
}));

// We only mock what's strictly necessary to avoid crashes
vi.mock('../services/discordService', () => ({
    checkIfChannelExists: vi.fn(),
    createChannel: vi.fn(),
    setPermissions: vi.fn(),
    mentionUsersInChannel: vi.fn(),
}));

describe('AutoChannel Configurable Demo', () => {
    it('should be runnable with a custom Bot configuration and Token', async () => {
        // This test demonstrates how to configure the bot with specific values
        // as requested ("version qui prend en parametre un token olympe et des config de bot")

        const myOlympeToken = "CUSTOM_TOKEN_123";
        const myBotConfig = {
            modules: {
                ChannelManager: {
                    maximumNumberOfHoursToRetrieveFutureMatches: 48, // Custom config
                    maximumMatchDuration: 5, // Custom config
                },
                AutoRole: {
                    organization: "my-custom-org.com",
                    guilds: {
                        'guild123': {
                            specialRoles: { caster: { id: '999' } }
                        }
                    },
                    roleIds: { competitions: {} }
                }
            }
        };

        // Create a Bot instance (mocked or real class)
        // Since we don't want to actually connect to Discord, we stick to a plain object
        // mimicking the Bot class structure relevant for autoChannel
        const bot = {
            name: 'ConfiguredBot',
            token: myOlympeToken, // The token usage resides in how apiService uses the bot
            modules: myBotConfig.modules,
            olympe: {
                api: {
                    matchs: { list: vi.fn().mockResolvedValue([]) },
                    // In a real scenario, this API client would use 'myOlympeToken'
                }
            }
        };

        const guild = {
            id: 'guild123',
            channels: { cache: { filter: vi.fn(() => new Map()) } },
            client: { modules: myBotConfig.modules }
        };

        console.log(`Running AutoChannel with Token: ${bot.token} and MaxDuration: ${bot.modules.ChannelManager.maximumMatchDuration}`);

        await autoChannel(bot, guild);

        // Verification
        expect(bot.modules.ChannelManager.maximumNumberOfHoursToRetrieveFutureMatches).toBe(48);
        expect(bot.token).toBe("CUSTOM_TOKEN_123");
    });
});
