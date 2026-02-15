import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import Discord from 'discord.js';

let addOlympeUserData,
	getName,
	renameDiscordUserWithOlympeData,
	changeDiscordRole,
	getRoleToAdd,
	getRealRole;

// Mocks et setup d'environnement doit se faire avant les imports qui utilisent DataBase
beforeAll(async () => {
	vi.resetModules();
	process.env.STRAPI_URL = 'http://localhost:1337';
	process.env.STRAPI_TOKEN = 'dummy_token';
	vi.doMock('suissard-strapi-client', () => ({
		StrapiApi: class { constructor() { } },
		StrapiCollections: class { },
		StrapiObject: class { }
	}));

	const utils = await import('../Modules/AutoRole/utils/utils.js');
	addOlympeUserData = utils.addOlympeUserData;
	getName = utils.getName;
	renameDiscordUserWithOlympeData = utils.renameDiscordUserWithOlympeData;
	changeDiscordRole = utils.changeDiscordRole;
	getRoleToAdd = utils.getRoleToAdd;
	getRealRole = utils.getRealRole;
});

// Mocks et setup
const mockChallengesRolesId = {
	ALL: 'existingRole',
	captain: '1012102173477322852',
	competitions: {
		46: {
			club: { segment1: 'clubRoleId' },
			coach: { segment1: 'coachRoleId' },
			manager: { segment1: 'managerRoleId' },
			player: { segment1: 'playerRoleId' },
		},
	},
};
const mockRolesCompetId = ['existingRole', '1012102173477322852'];
const mockBot = {
	olympe: {
		users: {},
		segments: [{ id: 'segment1' }],
	},
};

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

mockGuild.client = {
	error: vi.fn(console.error),
	olympe: {
		users: {},
	},
};

const mockOlympeMember = {
	user: {
		id: 'userID123',
		username: 'OlympeUser',
		thirdparties: {
			discord: { discordID: 'discordID123', publicDiscordTag: 1 },
		},
	},
	roles: ['manager', 'head coach', 'staff'],
	tags: { gameRoles: ['role1'] },
};

const mockTeam = {
	name: 'TeamOne',
	segments: [{ id: 'segment1', name: 'Segment 1' }],
	members: [mockOlympeMember],
	membersLent: [],
};

// Tests unitaires pour chaque fonction

describe('addOlympeUserData', () => {
	it('devrait ajouter un utilisateur à bot.olympe.users avec les informations correctes', () => {
		addOlympeUserData(mockOlympeMember, mockTeam, mockBot);
		const userData = mockBot.olympe.users[mockOlympeMember.user.thirdparties.discord.discordID];

		expect(userData).toBeDefined();
		expect(userData.id).toBe(mockOlympeMember.user.id);
		expect(userData.username).toBe(mockOlympeMember.user.username);
		expect(userData.TeamOne.roles).toContain('manager');
	});

	it('ne devrait rien ajouter si discordID est absent', () => {
		const invalidMember = {
			...mockOlympeMember,
			user: { ...mockOlympeMember.user, thirdparties: { discord: {} } },
		};
		addOlympeUserData(invalidMember, mockTeam, mockBot);

		expect(mockBot.olympe.users[invalidMember.user.id]).toBeUndefined();
	});
});

describe('getName', () => {
	it('devrait retourner un nom formaté correctement', () => {
		const name = getName(mockOlympeMember.user, mockDiscordUser, mockTeam.name);
		expect(name).toBe('OlympeUser | TeamOne');
	});

	it('devrait tronquer le nom si la longueur dépasse 32 caractères', () => {
		const longUsername = {
			...mockOlympeMember.user,
			username: 'VeryLongUsernameExceedingLength',
		};
		const name = getName(longUsername, mockDiscordUser, 'SomeVeryLongTeamName');
		expect(name).toBe('VeryLongUsernameExceedingLeng...');
	});
});

describe('renameDiscordUserWithOlympeData', () => {
	it('ne devrait pas renommer si le nom est identique', async () => {
		mockDiscordUser.nickname = 'OlympeUser | TeamOne';
		const result = await renameDiscordUserWithOlympeData(mockOlympeMember, mockTeam.name, {
			...mockDiscordUser,
			nickname: 'OlympeUser | TeamOne',
		});
		expect(result).toBe('same');
		expect(mockDiscordUser.setNickname).not.toHaveBeenCalled();
	});
	it("devrait renommer l'utilisateur si le nom est différent", async () => {
		const result = await renameDiscordUserWithOlympeData(mockOlympeMember, mockTeam.name, {
			...mockDiscordUser,
			nickname: 'NotValidName',
		});
		expect(result).toBe('NotValidName -> OlympeUser | TeamOne');
		expect(mockDiscordUser.setNickname).toHaveBeenCalled();
	});
});

describe('changeDiscordRole', () => {
	it('devrait ajouter et retirer les rôles corrects', async () => {
		//mockDiscordUser.roles.cache.set('existingRole', { id: 'existingRole' })
		mockDiscordUser.roles.cache.set('1012102173477322852', {
			id: '1012102173477322852',
		});

		const result = await changeDiscordRole(
			mockOlympeMember.user.id,
			mockGuild,
			mockTeam.segments,
			mockDiscordUser,
			[mockTeam],
			mockChallengesRolesId,
			mockRolesCompetId
		);

		// expect(result).toBeInstanceOf(Array);
		// expect(mockDiscordUser.roles.add).toHaveBeenCalled();
		// expect(mockDiscordUser.roles.remove).toHaveBeenCalled();
	});
});

describe('getRoleToAdd', () => {
	it('devrait retourner les rôles appropriés basés sur les rôles Olympe', () => {
		const roles = getRoleToAdd(mockOlympeMember);
		expect(roles).toContain('manager');
		expect(roles).toContain('coach');
		expect(roles).toContain('player');
	});

	it("devrait retourner 'club' par défaut si aucun rôle spécifique", () => {
		const memberWithoutRoles = {
			...mockOlympeMember,
			roles: [],
			tags: { gameRoles: [] },
		};
		const roles = getRoleToAdd(memberWithoutRoles);
		expect(roles).toContain('club');
	});
});

describe('getRealRole', () => {
	it('devrait retourner un tableau de rôles Discord correspondant aux rôles Olympe', () => {
		const listRole = ['club', 'manager'];
		//mockGuild.roles.cache.set("existingRole", { id: "existingRole" })
		const realRoles = getRealRole(
			listRole,
			mockGuild,
			mockTeam.segments,
			mockChallengesRolesId,
			mockOlympeMember
		);

		expect(realRoles).toBeInstanceOf(Array);
		expect(realRoles.length).toBeGreaterThan(0);
		expect(realRoles[0].id).toBe('existingRole'); // Par exemple, si ID "ALL" correspond dans le cache des rôles.
	});
});
