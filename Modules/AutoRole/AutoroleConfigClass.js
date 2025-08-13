const Bot = require('../../Class/Bot');

/**
 * Represents an authentication object.
 * @class
 */
class Auth {
	/**
	 * The authentication token.
	 * @type {string}
	 */
	token;

	/**
	 * The validity period of the token.
	 * @type {number}
	 */
	validity;

	/**
	 * Creates an instance of Auth.
	 * @param {string} token - The authentication token.
	 * @param {number} validity - The validity period of the token.
	 */
	constructor(token, validity) {
		this.token = token;
		this.validity = validity;
	}
}

/**
 * Represents a Guild ID with an associated challenge ID.
 * @class
 */
class GuildIdChallenge {
	/**
	 * The ID of the guild.
	 * @type {string}
	 */
	id;

	/**
	 * The challenge ID associated with the guild.
	 * @type {string}
	 */
	challengeID;

	/**
	 * Creates an instance of GuildIdChallenge.
	 * @param {string} id - The ID of the guild.
	 * @param {string} challengeID - The challenge ID.
	 */
	constructor(id, challengeID) {
		this.id = id;
		this.challengeID = challengeID;
	}
}

/**
 * Represents a parameter for the AutoRole configuration.
 * @class
 */
class Param {
	/**
	 * An array of guild IDs and their challenge IDs.
	 * @type {GuildIdChallenge[]}
	 */
	guildIds;

	/**
	 * The authentication details.
	 * @type {Auth}
	 */
	auth;

	/**
	 * The cron schedule string.
	 * @type {string}
	 */
	cronSchedule;

	/**
	 * The domain.
	 * @type {string}
	 */
	domain;

	/**
	 * The organization.
	 * @type {string}
	 */
	organization;

	/**
	 * Creates an instance of Param.
	 * @param {object} paramData - The raw parameter data from JSON.
	 * @param {Array<{id: string, challengeID: string}>} paramData.guildIds - Guild ID and challenge ID pairs.
	 * @param {{token: string, validity: number}} paramData.auth - Authentication data.
	 * @param {string} paramData.cronSchedule - Cron schedule.
	 * @param {string} paramData.domain - Domain.
	 * @param {string} paramData.organization - Organization.
	 */
	constructor({ guildIds, auth, cronSchedule, domain, organization }) {
		this.guildIds = guildIds.map((g) => new GuildIdChallenge(g.id, g.challengeID));
		this.auth = new Auth(auth.token, auth.validity);
		this.cronSchedule = cronSchedule;
		this.domain = domain;
		this.organization = organization;
	}
}

/**
 * Represents details of a special role.
 * @class
 */
class SpecialRoleDetail {
	/**
	 * The name of the special role.
	 * @type {string}
	 */
	name;

	/**
	 * The ID of the special role.
	 * @type {string}
	 */
	id;

	/**
	 * Whether the role allows renaming.
	 * @type {boolean}
	 */
	rename;

	/**
	 * Whether renaming has priority.
	 * @type {boolean}
	 */
	priorityRename;

	/**
	 * Creates an instance of SpecialRoleDetail.
	 * @param {string} name - The name of the role.
	 * @param {string} id - The ID of the role.
	 * @param {boolean} rename - Allows renaming.
	 * @param {boolean} priorityRename - Renaming has priority.
	 */
	constructor(name, id, rename, priorityRename) {
		this.name = name;
		this.id = id;
		this.rename = rename;
		this.priorityRename = priorityRename;
	}
}

/**
 * Represents information about a role.
 * @class
 */
class RoleInfo {
	/**
	 * The name of the role.
	 * @type {string}
	 */
	name;

	/**
	 * The ID of the role, can be null.
	 * @type {?string}
	 */
	id;

	/**
	 * Creates an instance of RoleInfo.
	 * @param {string} name - The name of the role.
	 * @param {?string} id - The ID of the role.
	 */
	constructor(name, id) {
		this.name = name;
		this.id = id;
	}
}

/**
 * Represents a mapping between a list of source roles and a target RoleInfo.
 * This is a tuple-like structure [string[], RoleInfo].
 * @class
 */
class RoleMapping {
	/**
	 * An array of source role names.
	 * @type {string[]}
	 */
	sourceRoles;

	/**
	 * The target role information.
	 * @type {RoleInfo}
	 */
	targetRole;

	/**
	 * Creates an instance of RoleMapping.
	 * @param {string[]} sourceRoles - Array of source role names.
	 * @param {RoleInfo} targetRole - Target role information.
	 */
	constructor(sourceRoles, targetRole) {
		this.sourceRoles = sourceRoles;
		this.targetRole = targetRole;
	}
}

/**
 * Represents a division.
 * @class
 */
class Division {
	/**
	 * The name of the division.
	 * @type {string}
	 */
	name;

	/**
	 * The ID of the division, can be null.
	 * @type {?string}
	 */
	id;

	/**
	 * Creates an instance of Division.
	 * @param {string} name - The name of the division.
	 * @param {?string} id - The ID of the division.
	 */
	constructor({ name, id }) {
		this.name = name;
		this.id = id;
	}
}

/**
 * Represents tags including game roles.
 * @class
 */
class Tags {
	/**
	 * Mappings for game roles.
	 * @type {RoleMapping[]}
	 */
	gameRoles;

	/**
	 * Creates an instance of Tags.
	 * @param {object} tagsData - The raw tags data from JSON.
	 * @param {Array<[string[], {name: string, id: ?string}]>} tagsData.gameRoles - Game roles mappings.
	 * @param {Array<{name: string, id: ?string}>} tagsData.divisions - Divisions.
	 */
	constructor({ gameRoles }) {
		this.gameRoles = gameRoles.map(
			(gr) => new RoleMapping(gr[0], new RoleInfo(gr[1].name, gr[1].id))
		);
		// this.divisions = divisions.map(d => new Division(d.name, d.id));
	}
}

/**
 * Represents divisions.
 * @class
 */
class Divisions {
	/**
	 * An array of divisions.
	 * @type {Division[]}
	 */
	divisions;

	/**
	 * Creates an instance of Tags.
	 * @param {object} tagsData - The raw tags data from JSON.
	 * @param {Array<[string[], {name: string, id: ?string}]>} tagsData.gameRoles - Game roles mappings.
	 * @param {Array<{name: string, id: ?string}>} tagsData.divisions - Divisions.
	 */
	constructor(divisions) {
		this.divisions = divisions.map((d) => new Division(d.name, d.id));
	}
}

/**
 * Represents details for a specific guild.
 * @class
 */
class GuildDetail {
	/**
	 * A record of special roles.
	 * @type {Record<string, SpecialRoleDetail>}
	 */
	specialRoles;

	/**
	 * An array of role mappings.
	 * @type {RoleMapping[]}
	 */
	roles;

	/**
	 * Tags for the guild.
	 * @type {Tags}
	 */
	tags;

	/**
	 * Creates an instance of GuildDetail.
	 * @param {object} guildData - The raw guild data from JSON.
	 * @param {Record<string, {name: string, id: string, rename: boolean, priorityRename: boolean}>} guildData.specialRoles - Special roles.
	 * @param {Array<[string[], {name: string, id: ?string}]>} guildData.roles - Role mappings.
	 * @param {object} guildData.tags - Tags data.
	 */
	constructor({ specialRoles, roles, tags, divisions }) {
		this.specialRoles = {};
		for (const key in specialRoles) {
			const sr = specialRoles[key];
			this.specialRoles[key] = new SpecialRoleDetail(
				sr.name,
				sr.id,
				sr.rename,
				sr.priorityRename
			);
		}
		this.roles = roles.map((r) => new RoleMapping(r[0], new RoleInfo(r[1].name, r[1].id)));
		this.tags = new Tags(tags);
		this.divisions = divisions.map((d) => new Division(d));
	}
}

/**
 * Represents roles for a specific competition.
 * @class
 */
class CompetitionRoles {
	/**
	 * Role IDs for 'club' category, keyed by division name or 'ALL'.
	 * @type {Record<string, string>}
	 */
	club;

	/**
	 * Role IDs for 'coach' category, keyed by division name.
	 * @type {Record<string, string>}
	 */
	coach;

	/**
	 * Role IDs for 'player' category, keyed by division name.
	 * @type {Record<string, string>}
	 */
	player;

	/**
	 * Role IDs for 'manager' category, keyed by division name.
	 * @type {Record<string, string>}
	 */
	manager;

	/**
	 * Creates an instance of CompetitionRoles.
	 * @param {object} competitionData - The raw competition roles data from JSON.
	 * @param {Record<string, string>} competitionData.club - Club roles.
	 * @param {Record<string, string>} competitionData.coach - Coach roles.
	 * @param {Record<string, string>} competitionData.player - Player roles.
	 * @param {Record<string, string>} competitionData.manager - Manager roles.
	 */
	constructor({ club, coach, player, manager }) {
		this.club = club;
		this.coach = coach;
		this.player = player;
		this.manager = manager;
	}
}

/**
 * Represents the structure for role IDs, including general and competition-specific roles.
 * @class
 */
class RoleIds {
	/**
	 * Default role ID for 'ALL'.
	 * @type {string}
	 */
	ALL;

	/**
	 * Role ID for 'captain'.
	 * @type {string}
	 */
	captain;

	/**
	 * A record of competition-specific roles, keyed by competition ID.
	 * @type {Record<string, CompetitionRoles>}
	 */
	competitions;

	/**
	 * Creates an instance of RoleIds.
	 * @param {object} roleIdsData - The raw role IDs data from JSON.
	 * @param {string} roleIdsData.ALL - 'ALL' role ID.
	 * @param {string} roleIdsData.captain - 'captain' role ID.
	 * @param {Record<string, object>} roleIdsData.competitions - Competition roles data.
	 */
	constructor({ ALL, captain, competitions }) {
		this.ALL = ALL;
		this.captain = captain;
		this.competitions = {};
		for (const compId in competitions) {
			this.competitions[compId] = new CompetitionRoles(competitions[compId]);
		}
	}
}

/**
 * Represents Olympe authentication details.
 * @class
 */
class OlympeAuth {
	/**
	 * The authentication value.
	 * @type {string}
	 */
	value;

	/**
	 * Creates an instance of OlympeAuth.
	 * @param {string} value - The authentication value.
	 */
	constructor(value) {
		this.value = value;
	}
}

/**
 * Main class for the AutoRole configuration. 🤖
 * @class
 */
class AutoRoleConfig {
	/**
	 * An array of parameters.
	 * @type {Param[]}
	 */
	params;

	/**
	 * A record of guild details, keyed by guild ID.
	 * @type {Record<string, GuildDetail>}
	 */
	guilds;

	/**
	 * An array of organization role IDs.
	 * @type {string[]}
	 */
	orgaRoleIds;

	/**
	 * The structure for role IDs.
	 * @type {RoleIds}
	 */
	roleIds;

	/**
	 * Olympe authentication details.
	 * @type {OlympeAuth}
	 */
	olympeAuth;

	/**
	 * Interval in hours for a recurring task.
	 * @type {number}
	 */
	everyXhours;

	/**
	 * The Olympe domain.
	 * @type {string}
	 */
	olympeDomain;

	/**
	 * The organization identifier.
	 * @type {string}
	 */
	organization;

	/**
	 * The organization identifier.
	 * @type {Bot}
	 */
	bot;

	/**
	 * Creates an instance of AutoRoleConfig.
	 * @param {object} jsonData - The raw JSON data for AutoRole configuration.
	 * @param {Array<object>} jsonData.params - Parameters data.
	 * @param {Record<string, object>} jsonData.guilds - Guilds data.
	 * @param {string[]} jsonData.orgaRoleIds - Organization role IDs.
	 * @param {object} jsonData.roleIds - Role IDs data.
	 * @param {{value: string}} jsonData.olympeAuth - Olympe authentication data.
	 * @param {number} jsonData.everyXhours - Interval in hours.
	 * @param {string} jsonData.olympeDomain - Olympe domain.
	 * @param {string} jsonData.organization - Organization identifier.
	 * @param {Bot} bot - bot discord
	 */
	constructor(
		{
			params,
			guilds,
			orgaRoleIds,
			roleIds,
			olympeAuth,
			everyXhours,
			olympeDomain,
			organization,
		},
		bot
	) {
		this.params = params.map((p) => new Param(p));
		this.guilds = {};
		for (const guildId in guilds) {
			if (!params.find((p) => p.guildIds.find((g) => g.id == guildId)))
				bot.error('Pas de params pour la guild ' + guildId, 'autorole - config');
			else if (!bot.guilds.cache.get(guildId))
				bot.error('Pas acces à la guild ' + guildId, 'autorole - config');
			else this.guilds[guildId] = new GuildDetail(guilds[guildId]);
		}
		this.orgaRoleIds = orgaRoleIds;
		this.roleIds = new RoleIds(roleIds);
		this.olympeAuth = new OlympeAuth(olympeAuth.value);
		this.everyXhours = everyXhours;
		this.olympeDomain = olympeDomain;
		this.organization = organization;
		this.bot = bot;
	}

	/**
	 * Retrieves all unique role identifiers (ID or name) from the configuration.
	 * C'est comme une chasse au trésor pour les identifiants de rôles (ID ou nom) ! 🗺️💎🏷️
	 * @returns {Array<({id: string} | {name: string})>} An array of unique role identifier objects.
	 */
	getAllRoleIdentifiersFromGuildId(guildId) {
		const idIdentifiers = new Set();
		const nameIdentifiers = new Set();
		const finalIdentifiers = [];

		// Fonction d'aide pour ajouter un identifiant
		const addIdentifier = (item) => {
			if (item.id) idIdentifiers.add(item.id);
			else if (item.name) nameIdentifiers.add(item.name);
		};

		const guild = this.bot.guilds.cache.get(guildId);
		if (!guild) return [];

		for (const roleKey in this.guilds[guildId].specialRoles) {
			const specialRole = this.guilds[guildId].specialRoles[roleKey]; // Les SpecialRoleDetail ont toujours un ID et un nom selon la structure
			addIdentifier(specialRole);
		}

		this.guilds[guildId].roles?.forEach((roleMapping) => addIdentifier(roleMapping.targetRole));
		this.guilds[guildId].tags?.gameRoles?.forEach((gameRoleMapping) =>
			addIdentifier(gameRoleMapping.targetRole)
		);
		this.guilds[guildId].divisions?.forEach((division) => addIdentifier(division));

		idIdentifiers.forEach((value) => finalIdentifiers.push({ id: value }));
		nameIdentifiers.forEach((value) => finalIdentifiers.push({ name: value }));

		return finalIdentifiers;
	}

	/**
	 * Supprime les paramètres de configuration liés à un ID de guilde spécifique.
	 * @param {string} guildId - L'ID de la guilde à supprimer de la configuration.
	 */
	deleteGuildParam(guildId) {
		delete this.guilds[guildId];

		// Doit supprimer tous et pas un seul params.guildIds

		const paramsToDelete = this.params.filter((par) =>
			par.guildIds.find((p) => p.id == guildId)
		);

		if (!paramsToDelete || !paramsToDelete.length) return;
		paramsToDelete.forEach((param) => {
			const guildIdIndexToSplice = param.guildIds.findIndex((g) => g.id == guildId);
			if (guildIdIndexToSplice === -1) return;
			param.guildIds.splice(guildIdIndexToSplice, 1);
			if (!param.guildIds.length) {
				const paramIndexToSplice = this.params.findIndex((par) => !par.guildIds.length);
				if (paramIndexToSplice === -1) return;
				this.params.splice(paramIndexToSplice, 1);
			}
		});
	}

	/**
	 * Vérifie l'accessibilité de toutes les guildes configurées.
	 * Si une guilde n'est pas accessible, elle est retirée de la configuration.
	 * @returns {Array<import('discord.js').Guild>} La liste des objets Guild accessibles.
	 */
	checkAllGuild() {
		const guilds = [];
		const guildIds = Object.keys(this.guilds);

		guildIds.forEach((guildId) => {
			const guild = this.bot.guilds.cache.get(guildId);
			if (!guild) {
				this.bot.error(`La guild ${guildId} n'est pas accessible`, 'Autorole - config');
				this.deleteGuildParam(guildId);
			} else guilds.push(guild);
		});
		return guilds;
	}

	/**
	 * Itère sur toutes les guildes configurées et lance le processus de récupération ou de création des rôles
	 * pour chacune d'entre elles.
	 */
	fetchOrCreateRolesFromIdentifiersForAllGuild() {
		for (const guildId in this.guilds) {
			const identifiers = this.getAllRoleIdentifiersFromGuildId(guildId);
			const guild = this.bot.guilds.cache.get(guildId);
			this.fetchOrCreateRolesFromIdentifiers(identifiers, guild);
		}
	}

	/**
	 * Fetches or creates Discord roles based on the provided identifiers.
	 * C'est notre majordome Discord, il trouve ou crée les rôles pour nous ! 🤵‍♂️✨
	 * @param {Array<({id: string} | {name: string})>} identifiers - An array of role identifiers from getAllRoleIdentifiers().
	 * @param {import('discord.js').Guild} guild - The discord.js Guild object.
	 * @param {object} [options={}] - Options for role creation.
	 * @param {string} [options.creationReason='Auto-created by AutoRole system'] - Reason for role creation.
	 * @returns {Promise<Array<import('discord.js').Role|null>>} A promise that resolves to an array of Role objects or null if a role couldn't be fetched/created.
	 */
	async fetchOrCreateRolesFromIdentifiers(identifiers, guild, options = {}) {
		if (!guild || !guild.roles) {
			console.error('Guild object is invalid or missing roles manager.');
			return identifiers.map(() => null); // Return null for all if guild is invalid
		}

		const { creationReason = 'AUTOROLE : create role for competition' } = options;
		const resolvedRoles = [];

		for (const identifier of identifiers) {
			let role = null;
			try {
				if (identifier.id) {
					// Fetch by ID
					role = await guild.roles.cache.get(identifier.id);
					if (!role) {
						console.warn(
							`Role with ID "${identifier.id}" not found in guild "${guild.name}".`
						);
					}
				} else if (identifier.name) {
					// Find by name (case-sensitive by default with d.js v13+)
					role = guild.roles.cache.find((r) => r.name === identifier.name);

					if (!role) {
						// If not found by name, try to create it
						console.log(
							`Role with name "${identifier.name}" not found in guild "${guild.name}". Attempting to create...`
						);
						try {
							role = await guild.roles.create({
								name: identifier.name,
								reason: creationReason,
								// You can add default permissions, color, etc. here if needed
								// permissions: [],
								// color: '#000000',
							});
							console.log(
								`Role "${role.name}" (ID: ${role.id}) created successfully in guild "${guild.name}".`
							);
						} catch (creationError) {
							console.error(
								`Failed to create role "${identifier.name}" in guild "${guild.name}":`,
								creationError
							);
							role = null; // Ensure role is null if creation failed
						}
					}
				} else {
					console.warn('Invalid identifier provided (missing id and name):', identifier);
				}
			} catch (error) {
				console.error(
					`Error processing identifier ${JSON.stringify(identifier)} in guild "${
						guild.name
					}":`,
					error
				);
				role = null; // Ensure role is null on any other unexpected error
			}
			resolvedRoles.push(role);
		}
		return resolvedRoles;
	}
}

module.exports = {
	Auth,
	GuildIdChallenge,
	Param,
	SpecialRoleDetail,
	RoleInfo,
	RoleMapping,
	Division,
	Tags,
	GuildDetail,
	CompetitionRoles,
	RoleIds,
	OlympeAuth,
	AutoRoleConfig,
};
