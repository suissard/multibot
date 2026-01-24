
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
                this.data = { footer: {}, image: {}, author: {} };
            }
            setAuthor(author) { this.data.author = author; return this; }
            setDescription(desc) { this.data.description = desc; return this; }
            setColor(color) { this.data.color = color; return this; }
            setTimestamp() { return this; }
            setFooter(footer) { this.data.footer = footer; return this; }
            setImage(url) { this.data.image = { url }; return this; }
            toJSON() { return this.data; }
        }
    };
});

describe('SecretaryManager', () => {
    let manager;
    let mockBot;
    let mockSocketIo;

    beforeEach(() => {
        // Suppress console.log, allow error
        vi.spyOn(console, 'log').mockImplementation(() => { });
        // vi.spyOn(console, 'error').mockImplementation(() => { });

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
            channels: { fetch: vi.fn() },
            log: vi.fn(),
            olympe: { users: {} }
        };

        manager = new SecretaryManager(mockBot);
    });

    describe('formatSecretaryEmbed', () => {
        it('should use staffEmbedColor and add staff footer when source is not User', () => {
            const message = { content: 'Hello Staff', attachments: new Map() };
            const author = { username: 'StaffUser', displayAvatarURL: () => 'url' };

            const { embeds } = manager.formatSecretaryEmbed(message, 'Discord', author);

            expect(embeds[0].data.color).toBe('Green'); // Configured color
            expect(embeds[0].data.footer.text).toBe("Message d'organisateur");
        });

        it('should use userEmbedColor when source is User', () => {
            const message = { content: 'Hello User', attachments: new Map() };
            const author = { username: 'NormalUser', id: '123', displayAvatarURL: () => 'url' };

            // Mock olympe data helper to avoid error in getMessageFooterFromUser
            manager.getMessageFooterFromUser = vi.fn().mockReturnValue('Footer Info');

            const { embeds } = manager.formatSecretaryEmbed(message, 'User', author);

            expect(embeds[0].data.color).toBe('DarkGrey'); // Configured color
        });
    });

    describe('emitSocketMessage', () => {
        it('should emit socket event only to authorized users', async () => {
            const message = {
                content: 'Test Msg',
                author: { id: '1', username: 'u', displayAvatarURL: () => '' },
                attachments: [],
                embeds: []
            };

            const mockChannel = {
                guild: {
                    members: {
                        fetch: vi.fn()
                    }
                },
                permissionsFor: vi.fn()
            };
            mockBot.channels.fetch.mockResolvedValue(mockChannel);

            // Setup API sockets
            const userSockets = new Map();
            userSockets.set('user1', new Set(['socket1']));
            userSockets.set('user2', new Set(['socket2']));
            mockBot.BOTS.API.userSockets = userSockets;
            mockBot.BOTS.API.getUserSockets = (id) => userSockets.get(id);

            // Mock permissions
            // User 1 has permission
            mockChannel.guild.members.fetch.mockImplementation(async (id) => {
                if (id === 'user1') return { id: 'user1' };
                if (id === 'user2') return { id: 'user2' };
                return null;
            });
            mockChannel.permissionsFor.mockImplementation((member) => {
                if (member.id === 'user1') return { has: () => true };
                return { has: () => false };
            });

            await manager.emitSocketMessage(message, 'channel_123', 'msg_123', true);

            // Verify authorized user got message
            expect(mockSocketIo.to).toHaveBeenCalledWith('socket1');
            expect(mockSocketIo.emit).toHaveBeenCalledWith('secretaryMessage', expect.anything());

            // Verify unauthorized user did NOT get message
            expect(mockSocketIo.to).not.toHaveBeenCalledWith('socket2');
        });
    });

    describe('sendStaffResponse', () => {
        it('should send DM to user, Embed to channel, and emit Socket event', async () => {
            const mockUser = { send: vi.fn().mockResolvedValue({ id: 'dm_msg_id', attachments: [] }) };
            mockBot.users.fetch.mockResolvedValue(mockUser);

            const mockChannel = {
                id: 'channel_123', // ID needed for emit
                name: '❌Username-999999',
                send: vi.fn().mockResolvedValue({ id: 'staff_msg_id' })
            };

            // Ensure channel fetch works for the internal call in emitSocketMessage
            mockBot.channels.fetch.mockResolvedValue(mockChannel);

            const author = { username: 'Staff', displayAvatarURL: () => '' };

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
