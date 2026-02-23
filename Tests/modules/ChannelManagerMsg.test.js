import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock apiService at the top level
vi.mock('../../services/apiService', () => ({
    getWebsiteUrl: vi.fn().mockReturnValue('https://example.com'),
    getUserById: vi.fn(),
    getFutureMatchs: vi.fn(),
    getPastMatchs: vi.fn(),
    getMatchById: vi.fn()
}));

import { mentionUsersInChannel } from '../../services/discordService';

describe('ChannelManager Custom Message', () => {
    let textChannel;
    let teams;
    let casters;
    let matchID;
    let timestamp;

    beforeEach(() => {
        timestamp = 1234567890;
        matchID = 'match-123';
        teams = [
            { name: 'Team A', id: '1', members: [], membersLent: [] },
            { name: 'Team B', id: '2', members: [], membersLent: [] },
        ];
        casters = [];

        textChannel = {
            name: 'match-channel',
            guild: {
                roles: { cache: { get: vi.fn() } },
                members: { cache: { get: vi.fn() } }
            },
            parent: {
                children: {
                    cache: {
                        find: vi.fn().mockReturnValue('gradins-channel-id')
                    }
                }
            },
            client: {
                modules: {
                    ChannelManager: {},
                    AutoRole: {
                        organization: 'example.com'
                    }
                },
            },
            send: vi.fn().mockResolvedValue({}),
        };
    });

    it('should use default message if ChannelManager.notifMessage is undefined', async () => {
        delete textChannel.client.modules.ChannelManager.notifMessage;

        await mentionUsersInChannel(textChannel, timestamp, teams, casters, matchID);

        expect(textChannel.send).toHaveBeenCalled();
        const payload = textChannel.send.mock.calls[0][0];
        expect(payload.content).toContain('Hey !');
        expect(payload.content).toContain('Le match entre **Team A ⚔️ Team B**');
    });

    it('should use custom message from ChannelManager.notifMessage if defined', async () => {
        textChannel.client.modules.ChannelManager.notifMessage =
            'Custom Notification: ${teams[0].name} vs ${teams[1].name} at ${timestamp}. Check ${url}/matchs/${matchID}';

        await mentionUsersInChannel(textChannel, timestamp, teams, casters, matchID);

        expect(textChannel.send).toHaveBeenCalled();
        const payload = textChannel.send.mock.calls[0][0];
        expect(payload.content).toContain('Custom Notification: Team A vs Team B at 1234567890');
        expect(payload.content).toContain('Check https://example.com/matchs/match-123');
    });
});
