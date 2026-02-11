import { describe, it, expect, vi, beforeEach } from 'vitest';
import { notifyMatch } from '../../services/discordService';

describe('notifyMatch', () => {
  let bot;
  let channel;
  let teams;
  let casters;

  beforeEach(() => {
    bot = {
      name: 'TestBot',
      modules: {
        MatchNotifier: {
          notifMessage: 'Match starting between ${teams[0].name} and ${teams[1].name} in ${division} at ${timestamp}. Role: ${roleId}',
        },
        AutoRole: {
          organization: 'example.com'
        }
      },
    };

    channel = {
      name: 'test-channel',
      guild: {
        roles: {
          cache: {
            get: vi.fn(),
          },
        },
        members: {
          cache: {
            get: vi.fn().mockReturnValue({ id: 'discord-id' })
          }
        }
      },
      client: {
        // getWebsiteUrl uses textChannel.client sometimes too, but here it uses bot passed as arg to notifyMatch 
        // actually notifyMatch calls generatesMatchMessagePayload which uses textChannel.client if available? 
        // No, generateMatchMessagePayload uses textChannel.client. 
        // And notifyMatch calls channel.send. 
        // Wait, notifyMatch calls channel.send(payload). 
        // But looking at code:
        // notifyMatch calls bot.modules.MatchNotifier.notifMessage.replace... 
        // And constructs embeds. 
        // Inside notifyMatch: 
        // embedTeam.setURL(`${getWebsiteUrl(bot)}/teams/${team.id}`) 
        // So it uses 'bot' for getWebsiteUrl.
      },
      send: vi.fn().mockResolvedValue({}),
    };
    // channel needs a client property because some functions might use it?
    // In notifyMatch, it uses `getWebsiteUrl(bot)`.
    // It also uses `getOlympeMention(member.user, channel.guild)`.

    teams = [
      {
        name: 'Team A',
        id: '1',
        members: [
          {
            user: { id: 'u1', battlenetBtag: 'Tag#1', thirdparties: { discord: { discordID: 'd1' } } },
            tags: { gameRoles: ['dps'] }
          }
        ]
      },
      {
        name: 'Team B',
        id: '2',
        members: [
          {
            user: { id: 'u2', battlenetBtag: 'Tag#2', thirdparties: { discord: { discordID: 'd2' } } },
            tags: { gameRoles: ['heal'] }
          }
        ]
      },
    ];
    casters = [];
  });

  it('should send a message with content if notifMessage is defined', async () => {
    const roleId = '123';
    channel.guild.roles.cache.get.mockReturnValue({ id: roleId });

    await notifyMatch(bot, teams, 'Div 1', 1234567890, casters, channel, roleId);

    expect(channel.send).toHaveBeenCalledWith(expect.objectContaining({
      content: expect.stringContaining('Match starting between Team A and Team B'),
    }));
  });

  it('should send a message without content (only embeds) if notifMessage is undefined', async () => {
    delete bot.modules.MatchNotifier.notifMessage;
    const roleId = '123';
    channel.guild.roles.cache.get.mockReturnValue({ id: roleId });

    await notifyMatch(bot, teams, 'Div 1', 1234567890, casters, channel, roleId);

    expect(channel.send).toHaveBeenCalledWith(expect.objectContaining({
      content: '',
      embeds: expect.any(Array)
    }));
    // We expect content to be empty string or similar, but definitely embeds presence
    const callArgs = channel.send.mock.calls[0][0];
    expect(callArgs.embeds.length).toBeGreaterThan(0);
  });
});
