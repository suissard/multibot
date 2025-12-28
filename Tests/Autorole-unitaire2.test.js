import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
	wipeOlympeData,
	recurciveIdGet,
	getAllTeamsFromChallenge,
} from './../Modules/AutoRole/utils/utils2.js';

const mockUser1 = {
	user: {
		id: 'user1',
		name: 'Player1',
		thirdparties: {
			discord: { discordID: 'user1', publicDiscordTag: 1 },
		},
	},
	id: 'user1',
};

const mockUser2 = {
	user: {
		id: 'user2',
		name: 'Player2',
		thirdparties: {
			discord: { discordID: 'user2', publicDiscordTag: 1 },
		},
	},
	id: 'user2',
};

const mockUser3 = {
	user: {
		id: 'user3',
		name: 'Player3',
		thirdparties: {
			discord: { discordID: 'user3', publicDiscordTag: 1 },
		},
	},
	id: 'user3',
};

const mockUsers = {
	[mockUser1.id]: mockUser1,
	[mockUser2.id]: mockUser2,
	[mockUser3.id]: mockUser3,
};

const mockTeam = {
	id: 'team1',
	name: 'Team Alpha',
	members: [mockUser1, mockUser2, mockUser3],
	segments: [],
};

mockUser1.teams = [mockTeam];
mockUser2.teams = [mockTeam];
mockUser3.teams = [mockTeam];

const mockOlympeApi = {
	teams: {
		get: vi.fn().mockResolvedValue(mockTeam),
	},
	users: {
		get: (id) => mockUsers[id],
	},
};
const mockGuild = {
	id: 'guild1',
	name: 'Test Guild',
	members: {
		cache: {
			get: (id) => {
				return {
					[mockUser1.id]: mockUser1,
					[mockUser2.id]: mockUser2,
					[mockUser3.id]: mockUser3,
				}[id];
			},
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
	},
	modules: {
		AutoRole: { olympeDomain: 'new.domain' },
	},

	guilds: {
		cache: new Map([[mockGuild.id, mockGuild]]),
	},
	home: mockGuild.id,
};

mockBot.olympe.users.filter = () => [
	[mockUser1.id, mockUser1],
	[mockUser2.id, mockUser2],
	[mockUser3.id, mockUser3],
];

describe('wipeOlympeData', () => {
	it('should reset olympe data in the bot object', () => {
		const bot = {
			olympe: {
				url: 'https://old.domain',
				users: { user1: {}, user2: {} },
				segments: [1, 2],
				teams: [3, 4],
			},
		};

		wipeOlympeData(mockBot);

		expect(mockBot.olympe).toEqual({
			url: `https://${mockBot.modules.AutoRole.olympeDomain}`,
			users: {},
			segments: [],
			teams: [],
			api: mockOlympeApi,
		});
	});
});

describe('recurciveIdGet', () => {
	it('should retrieve all IDs from a nested object', () => {
		const object = {
			comp1: {
				subComp: {
					id1: '123',
					id2: '456',
				},
			},
			comp2: '789',
		};
		const target = [];
		const result = recurciveIdGet(object, target);

		expect(result).toEqual(['123', '456', '789']);
	});
});

describe('getAllTeamsFromChallenge', () => {
	it('should return an empty array if the challenge ID is invalid', async () => {
		const idChallenge = 'invalid_id';

		const result = await getAllTeamsFromChallenge(mockBot, idChallenge);

		expect(result).toEqual([]);
		expect(mockBot.olympe.api.teams.get).not.toHaveBeenCalled();
	});

	it('should return teams from the API if the challenge ID is valid', async () => {
		const bot = {
			olympe: {
				api: {
					GET: vi
						.fn()
						.mockResolvedValueOnce({ pools: [{ id: 'pool1' }] })
						.mockResolvedValueOnce(['team1', 'team2']),
				},
			},
		};
		const idChallenge = '123';

		const result = await getAllTeamsFromChallenge(bot, idChallenge);

		expect(result).toEqual(['team1', 'team2']);
		expect(bot.olympe.api.GET).toHaveBeenCalledWith('challenges/123/pools');
		expect(bot.olympe.api.GET).toHaveBeenCalledWith(
			'challenges/123/pools/pool1/teams/available'
		);
	});
});
