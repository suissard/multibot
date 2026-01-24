import { describe, it, expect, vi, beforeEach } from 'vitest';
import SecretaryManager from '../../Modules/Secretary/SecretaryManager.js';
import { EmbedBuilder, Colors } from 'discord.js';

// Mock Discord.js parts used
vi.mock('discord.js', () => {
    return {
        ChannelType: { GuildText: 0, GuildCategory: 4 },
        PermissionFlagsBits: { ViewChannel: 1024 },
        Colors: { Green: 123456, DarkGrey: 654321, Blue: 111111 },
        EmbedBuilder: class {
            constructor() {
                this.data = { footer: {} };
            }
            setAuthor(author) { this.data.author = author; return this; }
            setDescription(desc) { this.data.description = desc; return this; }
            setColor(color) { this.data.color = color; return this; }
            setTimestamp() { return this; }
            setFooter(footer) { this.data.footer = footer; return this; }
            setImage(url) { this.data.image = { url }; return this; }
        }
    };
});

describe('SecretaryManager', () => {
    let manager;
    let mockBot;
    let mockSocketIo;

    beforeEach(() => {
        // Suppress console.error/log during tests
        vi.spyOn(console, 'error').mockImplementation(() => { });
        vi.spyOn(console, 'log').mockImplementation(() => { });

        mockSocketIo = {
            to: vi.fn().mockReturnThis(),
            emit: vi.fn()
        };

        mockBot = {
            id: 'bot_id',
            user: { displayAvatarURL: () => 'bot_avatar_url' },
            modules: {
                Secretary: {
                    secretary: [],
                    staffEmbedColor: 'Green',
                    userEmbedColor: 'DarkGrey'
                }
            },
            BOTS: {
                API: {
                    io: mockSocketIo
                }
            },
            users: {
                fetch: vi.fn()
            },
            log: vi.fn(),
            olympe: { users: {} } // Add olympe structure to avoid crashes
        };

        manager = new SecretaryManager(mockBot);
    });

    describe('formatSecretaryEmbed', () => {
        it('should use staffEmbedColor and add staff footer when source is not User', () => {
            const message = { content: 'Hello Staff', attachments: { size: 0 } };
            const author = { username: 'StaffUser', displayAvatarURL: () => 'url' };

            const { embeds } = manager.formatSecretaryEmbed(message, 'Discord', author);

            expect(embeds[0].data.color).toBe('Green'); // Configured color
            expect(embeds[0].data.footer.text).toBe("Message d'organisateur");
        });

        it('should use userEmbedColor when source is User', () => {
            const message = { content: 'Hello User', attachments: { size: 0 } };
            const author = { username: 'NormalUser', id: '123', displayAvatarURL: () => 'url' };

            // Mock olympe data helper to avoid error in getMessageFooterFromUser
            manager.getMessageFooterFromUser = vi.fn().mockReturnValue('Footer Info');

            const { embeds } = manager.formatSecretaryEmbed(message, 'User', author);

            expect(embeds[0].data.color).toBe('DarkGrey'); // Configured color
        });
    });

    describe('emitSocketMessage', () => {
        it('should emit socket event to the correct channel room with isStaff flag', () => {
            const message = {
                content: 'Test Msg',
                author: { id: '1', username: 'u', displayAvatarURL: () => '' },
                attachments: [] // Map logic needs real map or array, here manager expects .map? No, in emit it expects array? Check code. 
                // In emitSocketMessage: originalMessage.attachments.map
                // We need to pass an object that has .map or is an array if the code expects it. 
                // Code: attachments: originalMessage.attachments.map(...)
            };
            // Allow attachments to be mocked as array with map
            message.attachments = [];
            // Mock embeds
            message.embeds = [];

            manager.emitSocketMessage(message, 'channel_123', 'msg_123', true);

            expect(mockSocketIo.to).toHaveBeenCalledWith('channel_123');
            expect(mockSocketIo.emit).toHaveBeenCalledWith('secretaryMessage', expect.objectContaining({
                message: expect.objectContaining({
                    isStaff: true,
                    content: 'Test Msg'
                })
            }));
        });
    });

    describe('sendStaffResponse', () => {
        it('should send DM to user, Embed to channel, and emit Socket event', async () => {
            const mockUser = { send: vi.fn().mockResolvedValue({ id: 'dm_msg_id', attachments: [] }) };
            mockBot.users.fetch.mockResolvedValue(mockUser);

            const mockChannel = {
                name: '❌Username-999999',
                send: vi.fn().mockResolvedValue({ id: 'staff_msg_id' })
            };

            const author = { username: 'Staff', displayAvatarURL: () => '' };

            // Spy on emitSocketMessage
            const emitSpy = vi.spyOn(manager, 'emitSocketMessage');

            await manager.sendStaffResponse(mockChannel, 'Response Content', author);

            // 1. Check DM sent
            expect(mockUser.send).toHaveBeenCalledWith({ content: 'Response Content' });

            // 2. Check Embed sent to channel
            expect(mockChannel.send).toHaveBeenCalled();

            // 3. Check Socket emitted
            expect(emitSpy).toHaveBeenCalledWith(expect.anything(), mockChannel.id, 'staff_msg_id', true);
        });
    });
});
