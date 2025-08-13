import { describe, it, expect, vi, beforeEach } from 'vitest';
import Discord from 'discord.js';

import { OlympeUser, OlympeTeam } from '../FakeData/FakeClass.js';

const mockDiscordUser = {
	id: 'discordID123',
	nickname: 'OlympeUser | TeamOne',
	user: { id: 'discordID123', username: 'TestUser', tag: 'TestUser#0001' },
	setNickname: vi.fn(() => Promise.resolve()),
	roles: {
		cache: new Discord.Collection(),
		add: vi.fn((roleIds) => Promise.resolve(roleIds)),
		remove: vi.fn((roleIds) => Promise.resolve(roleIds)),
		find: vi.fn((roleIds) => Promise.resolve(roleIds)),
	},
};

const mockGuild = {
	roles: {
		cache: {
			get: vi.fn((id) => ({ id })),
		},
	},
};

const mockUser1 = new OlympeUser();
const mockUser2 = new OlympeUser();
const mockUser3 = new OlympeUser();

const mockTeam = new OlympeTeam();

mockTeam.members = [mockUser1, mockUser2, mockUser3];
mockTeam.segments = [{ id: 'segment1', name: 'Segment 1' }];

const mockOlympeApi = {
	teams: {
		get: vi.fn().mockResolvedValue(mockTeam),
	},
	users: {
		get: (id) => {
			return {
				[mockUser1.id]: mockUser1,
				[mockUser2.id]: mockUser2,
				[mockUser3.id]: mockUser3,
			}[id];
		},
	},
};

const mockBot = {
	olympe: {
		users: {
			[mockUser1.id]: mockUser1,
			[mockUser2.id]: mockUser2,
			[mockUser3.id]: mockUser3,
		},
		api: mockOlympeApi,
		segments: [{ id: 'segment1' }],
	},
	guilds: {
		cache: new Map([[mockGuild.id, mockGuild]]),
	},
	users: { cache: new Map([[mockDiscordUser.id, mockDiscordUser]]) },
	home: mockGuild.id,
};

mockBot.olympe.users.filter = () => [
	[mockUser1.id, mockUser1],
	[mockUser2.id, mockUser2],
	[mockUser3.id, mockUser3],
];

export default { mockDiscordUser, mockGuild, mockBot, mockTeam, mockUser1, mockUser2, mockUser3 };
