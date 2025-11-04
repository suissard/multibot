import {
	getProcessableTeamFromTeamMatch,
	processMatch,
	processFromOlympeTeamId,
	processTeamMembers,
	processFromOlympeUserId,
	processFromDiscordUserId,
} from '../Modules/AutoRole/utils/utils.js'; // Remplacez par le bon chemin vers votre module

import { describe, it, expect, vi } from 'vitest';

//! tester avec la tactique de module
// Mock de processTeamMembers tout en gardant les autres exports réels
// vi.mock("../Modules/AutoRole/utils/utils.js", () => {
//     return {
//         ...{getProcessableTeamFromTeamMatch,
//     processMatch,
//     processFromOlympeTeamId}, // Conserve les autres fonctions/exportations réelles
//         processTeamMembers: vi.fn(), // Mock spécifique de processTeamMembers
//     };
// });

// Mocks de dépendances

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
	membersLent: [],
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
	guilds: {
		cache: new Map([[mockGuild.id, mockGuild]]),
	},
	home: mockGuild.id,
	users: {
		cache: {
			get: vi.fn(),
		},
	},
};

mockBot.olympe.users.filter = () => [
	[mockUser1.id, mockUser1],
	[mockUser2.id, mockUser2],
	[mockUser3.id, mockUser3],
];

// const ChallengesRolesId = require('../Modules/AutoRole/models/ChallengesRolesId.js');
// let challengesRolesId = new ChallengesRolesId(
// 	challengesJson.ALL,
// 	challengesJson.captain,
// 	challengesJson.competitions
// );
// let test = challengesRolesId.getAllIds()

const challengesRolesId = ['challenge1', 'challenge2'];
const rolesCompetId = ['role1', 'role2'];

describe.skip('getProcessableTeamFromTeamMatch', () => {
	it('should return a team object with combined members and substitutes', async () => {
		const teamFromMatch = {
			...mockTeam,
			lineup: {
				members: [mockUser1],
				substitutes: [mockUser2],
			},
		};

		const processedTeam = await getProcessableTeamFromTeamMatch(teamFromMatch);

		expect(processedTeam).toEqual({
			...teamFromMatch,
			members: [mockUser1, mockUser2],
			membersLent: [],
		});
	});

	it('should return a team object with empty members if no lineup exists', async () => {
		const teamFromMatch = { id: 'team2', name: 'Team Beta', segments: [] };

		const processedTeam = await getProcessableTeamFromTeamMatch(teamFromMatch);

		expect(processedTeam).toEqual({ ...teamFromMatch, members: [], membersLent: [] });
	});
});

describe.skip('processMatch', () => {
	it('should process a match and call processTeamMembers and processUser', async () => {
		const match = {
			team1: {
				id: 'team1',
				lineup: {
					members: [mockUser1],
					substitutes: [],
				},
				segments: [],
			},
			team2: {
				id: 'team2',
				lineup: {
					members: [mockUser2],
					substitutes: [mockUser3],
				},
				segments: [],
			},
		};

		await processMatch(match, mockBot);

		// Vérification des appels
		// expect(processTeamMembers).toHaveBeenCalledWith(
		//     expect.any(Array),
		//     expect.any(Object),
		//     mockBot
		// )

		// expect(processUser).toHaveBeenCalledTimes(3) // Trois utilisateurs à traiter
	});
});

describe.skip('processFromOlympeTeamId', () => {
	it('should process a team from Olympe and call processUser', async () => {
		await processFromOlympeTeamId(mockTeam.id, mockBot, challengesRolesId, rolesCompetId);

		expect(mockOlympeApi.teams.get).toHaveBeenCalledWith(mockTeam.id, {
			userFields: ['thirdpartiesDiscord'],
		});

		// expect(mockBot.olympe.users).toHaveProperty('1234');
		const userData = mockBot.olympe.users[mockUser1.id];
		expect(userData).toHaveProperty('id', mockUser1.id);

		// expect(processTeamMembers).toHaveBeenCalledWith(
		//     expect.any(Array),
		//     expect.any(Object),
		//     mockBot
		// )

		// expect(processUser).toHaveBeenCalledTimes(1) // Un utilisateur lié à l'équipe
	});
});

describe.skip('processFromOlympeUserId', () => {
	it('should process a team from Olympe and call processUser', async () => {
		await processFromOlympeUserId(mockTeam.id, mockBot, challengesRolesId, rolesCompetId);

		expect(mockOlympeApi.teams.get).toHaveBeenCalledWith(mockTeam.id, {
			userFields: ['thirdpartiesDiscord'],
		});

		const userData = mockBot.olympe.users[mockUser1.id];
		// expect(userData).toHaveProperty('userData');
	});
});

describe.skip('processFromDiscordUserId', () => {
	it('should process a team from Olympe and call processUser', async () => {
		await processFromDiscordUserId(mockUser1.id, mockBot, challengesRolesId, rolesCompetId);

		expect(mockOlympeApi.teams.get).toHaveBeenCalledWith('team1', {
			userFields: ['thirdpartiesDiscord'],
		});

		const userData = mockBot.olympe.users[mockUser1.id];
		// expect(userData).toHaveProperty('userData');
	});
});
