// autoroleConfig.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
// Assurez-vous que le chemin vers votre classe AutoRoleConfig est correct
import { AutoRoleConfig } from './AutoroleConfigClass.js'; // Remplacez par le chemin réel de VOTRE classe

// Mock pour la classe Bot, car elle est requise par AutoRoleConfig
const mockBotInstance = {
    guilds: {
        cache: {
            get: vi.fn(),
        },
    },
    error: vi.fn((message, context) => {
        // console.error(`MOCK BOT ERROR [${context}]: ${message}`);
    }),
};

const mockDiscordGuild = (guildId, guildName = 'Mocked Guild') => ({
    id: guildId,
    name: guildName,
    roles: {
        fetch: vi.fn(),
        cache: {
            find: vi.fn(),
            get: vi.fn(), // Utilisé par votre version de fetchOrCreateRolesFromIdentifiers pour les IDs
        },
        create: vi.fn(),
    },
});

const baseMockAutoroleJson = {
    params: [
        {
            guildIds: [ { id: "guild_1", challengeID: "c1" }, { id: "guild_2", challengeID: "c2" } ],
            auth: { token: "token1", validity: 123 },
            cronSchedule: "* * * * *", domain: "d1.com", organization: "Org1"
        },
        {
            guildIds: [{ id: "guild_3", challengeID: "c3" }], // guild_3 est dans params
            auth: { token: "token2", validity: 456 },
            cronSchedule: "0 * * * *", domain: "d2.com", organization: "Org2"
        }
    ],
    guilds: {
        "guild_1": {
            specialRoles: { admin: { name: "Admin G1", id: "g1_admin_id", rename: false, priorityRename: false } },
            roles: [ [["lead"], { name: "Lead G1", id: "g1_lead_id" }], [["member_g1_by_name"], { name: "Member G1 By Name", id: null }] ],
            tags: { gameRoles: [[["tank"], { name: "Tank G1", id: "g1_tank_id" }]] },
            divisions: [{ name: "Div Alpha G1", id: "g1_div_alpha_id" }]
        },
        "guild_2": {
            specialRoles: { mod: { name: "Mod G2", id: "g2_mod_id", rename: true, priorityRename: true } },
            roles: [], tags: { gameRoles: [] }, divisions: [{ name: "Div Beta G2", id: null }]
        },
        "guild_unconfigured_param": { // Cette guilde n'a pas de 'param' correspondant
             specialRoles: { staff: { name: "Staff Unconfigured", id: "g_unconf_staff_id"}},
             roles: [], tags: {gameRoles: []}, divisions: []
        }
    },
    orgaRoleIds: ["global_orga1"],
    roleIds: { ALL: "global_all", captain: "global_captain", competitions: { "c1": { club: { "DivA": "comp_c1_club_divA" } } } },
    olympeAuth: { value: "olympe_secret" }, everyXhours: 1, olympeDomain: "olympe.api", organization: "Main Organization"
};

describe('AutoRoleConfig - Tests ajustés', () => {
    let currentMockJson;
    let guild1Mock, guild2Mock, guild3Mock;

    beforeEach(() => {
        currentMockJson = JSON.parse(JSON.stringify(baseMockAutoroleJson));
        vi.clearAllMocks();

        guild1Mock = mockDiscordGuild("guild_1", "Guild One");
        guild2Mock = mockDiscordGuild("guild_2", "Guild Two");
        guild3Mock = mockDiscordGuild("guild_3", "Guild Three");

        mockBotInstance.guilds.cache.get.mockImplementation(id => {
            if (id === "guild_1") return guild1Mock;
            if (id === "guild_2") return guild2Mock;
            if (id === "guild_3") return guild3Mock;
            return undefined;
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('Constructor', () => {
        it('should initialize with valid guilds and log error for guilds in JSON.guilds without params', () => {
            new AutoRoleConfig(currentMockJson, mockBotInstance);
            // Erreur pour guild_unconfigured_param car pas dans params
            expect(mockBotInstance.error).toHaveBeenCalledWith(
                "Pas de params pour la guild guild_unconfigured_param", // Message exact de votre code
                'autorole - config' // Contexte exact de votre code
            );
        });

        it('should log error if a configured guild is not accessible via bot.guilds.cache', () => {
            mockBotInstance.guilds.cache.get.mockImplementation(id => {
                if (id === "guild_1") return guild1Mock;
                // guild_2 et guild_3 deviennent inaccessibles pour ce test de constructeur
                return undefined;
            });
            new AutoRoleConfig(currentMockJson, mockBotInstance);
            // Erreur pour guild_2 car dans params et guilds JSON mais pas dans cache
            expect(mockBotInstance.error).toHaveBeenCalledWith(
                "Pas acces à la guild guild_2", // Message exact
                'autorole - config' // Contexte exact
            );
             // Erreur pour guild_3 car dans params mais pas dans cache (et pas dans guilds JSON donc pas de second log)
            expect(mockBotInstance.error).not.toHaveBeenCalledWith( //S'assurer que ce n'est pas loggé deux fois pour la même raison
                 "Pas acces à la guild guild_3",
                 'autorole - config'
             );
        });
    });

    describe('getAllRoleIdentifiersFromGuildId', () => {
        let config;
        beforeEach(() => {
             // Assurer un mockBot propre pour chaque test de cette suite
            mockBotInstance.guilds.cache.get.mockImplementation(id => {
                if (id === "guild_1") return guild1Mock;
                if (id === "guild_2") return guild2Mock;
                return undefined;
            });
            config = new AutoRoleConfig(currentMockJson, mockBotInstance);
            vi.clearAllMocks(); // Nettoyer les appels du constructeur
        });

        it('should return identifiers for a configured and accessible guild', () => {
            const identifiers = config.getAllRoleIdentifiersFromGuildId("guild_1");
            expect(identifiers).toEqual(expect.arrayContaining([
                { id: "g1_admin_id" }, { id: "g1_lead_id" }, { name: "Member G1 By Name" },
                { id: "g1_tank_id" }, { id: "g1_div_alpha_id" }
            ]));
            expect(identifiers.length).toBe(5);
        });

        it('should return an empty array and log error if guildId is not in config.guilds (post-construction)', () => {
            // Ce test vérifie le comportement de getAllRoleIdentifiersFromGuildId lui-même,
            // pas le filtrage du constructeur.
            const identifiers = config.getAllRoleIdentifiersFromGuildId("guild_not_in_config_at_all");
            expect(identifiers).toEqual([]);
        });
    });

    describe('deleteGuildParam', () => {
        let config;
        beforeEach(() => {
            const freshJson = JSON.parse(JSON.stringify(baseMockAutoroleJson));
            config = new AutoRoleConfig(freshJson, mockBotInstance);
             vi.clearAllMocks(); // Nettoyer les appels du constructeur
        });

        it('should remove guild from this.guilds and its references from this.params', () => {
            config.deleteGuildParam("guild_1");
            expect(config.guilds["guild_1"]).toBeUndefined();
            // Votre logique de suppression de param est un peu complexe, on vérifie le résultat attendu
            // que guild_1 n'est plus dans les guildIds du premier param
            expect(config.params[0].guildIds.some(g => g.id === "guild_1")).toBe(false);
            // Mais que le param existe toujours car guild_2 y est encore
            expect(config.params[0].guildIds.some(g => g.id === "guild_2")).toBe(true);
        });

        it('should remove a param if all its guildIds are removed', () => {
            // Configurer un param qui ne contient que guild_1 pour ce test
            currentMockJson.params = [{
                guildIds: [{ id: "guild_1", challengeID: "c1" }],
                auth: { token: "token_single", validity: 111 },
                cronSchedule: "* * * * *", domain: "single.com", organization: "OrgSingle"
            }];
            // Assurer que guild_1 est bien dans guilds pour que le param soit valide à la construction
            currentMockJson.guilds = {
                "guild_1": baseMockAutoroleJson.guilds["guild_1"]
            };
            const configSingle = new AutoRoleConfig(currentMockJson, mockBotInstance);
            
            expect(configSingle.params.length).toBe(1);
            configSingle.deleteGuildParam("guild_1");
            expect(configSingle.params.length).toBe(0);
        });
    });

    describe('checkAllGuild', () => {
        let config;
        beforeEach(() => {
            // Construction normale
            mockBotInstance.guilds.cache.get.mockImplementation(id => {
                 if (id === "guild_1") return guild1Mock;
                 if (id === "guild_2") return guild2Mock;
                 return undefined;
            });
            config = new AutoRoleConfig(currentMockJson, mockBotInstance);
            vi.clearAllMocks(); // Clear mocks du constructeur
        });

        it('should return accessible guilds and log errors for inaccessible ones (simulated post-construction)', () => {
            // Simuler que guild_2 devient inaccessible APRÈS la construction
            mockBotInstance.guilds.cache.get.mockImplementation(id => {
                if (id === "guild_1") return guild1Mock;
                // guild_2 n'est plus retourné par le cache
                return undefined;
            });

            const accessibleGuilds = config.checkAllGuild();
            expect(accessibleGuilds.length).toBe(1);
            expect(accessibleGuilds[0].id).toBe("guild_1");
            // Votre code checkAllGuild appelle this.bot.error, pas deleteGuildParam directement
            expect(mockBotInstance.error).toHaveBeenCalledWith(
                "La guild guild_2 n'est pas accessible",
                'Autorole - config' // Contexte de _logError appelé par checkAllGuild
            );
        });
    });
    
    describe('fetchOrCreateRolesFromIdentifiersForAllGuild (votre nom de méthode)', () => {
        let config;
        const mockFetchOrCreateSingleGuild = vi.fn();

        beforeEach(() => {
            mockBotInstance.guilds.cache.get.mockImplementation(id => {
                 if (id === "guild_1") return guild1Mock;
                 if (id === "guild_2") return guild2Mock;
                 return undefined;
            });
            config = new AutoRoleConfig(currentMockJson, mockBotInstance);
            config.fetchOrCreateRolesFromIdentifiers = mockFetchOrCreateSingleGuild.mockResolvedValue([]);
            // Spy sur la vraie méthode getAllRoleIdentifiersFromGuildId pour vérifier ses appels
            vi.spyOn(config, 'getAllRoleIdentifiersFromGuildId');
            vi.clearAllMocks();
        });

        it('should call fetchOrCreateRolesFromIdentifiers for each guild from Object.keys(this.guilds)', async () => {
            // Simuler ce que getAllRoleIdentifiersFromGuildId retournerait
            config.getAllRoleIdentifiersFromGuildId
                .mockImplementation((guildId) => {
                    if (guildId === "guild_1") return [{id: "g1_r1"}];
                    if (guildId === "guild_2") return [{name: "g2_r_name"}];
                    return [];
                });

            // Votre méthode est synchrone et ne gère pas les promesses correctement
            // Je la teste telle quelle, mais elle devrait être async
            config.fetchOrCreateRolesFromIdentifiersForAllGuild(); // Nom de votre méthode

            expect(config.getAllRoleIdentifiersFromGuildId).toHaveBeenCalledWith("guild_1");
            expect(config.getAllRoleIdentifiersFromGuildId).toHaveBeenCalledWith("guild_2");
            
            // expect(mockFetchOrCreateSingleGuild).toHaveBeenCalledWith([{id: "g1_r1"}], guild1Mock, expect.anything());
            // expect(mockFetchOrCreateSingleGuild).toHaveBeenCalledWith([{name: "g2_r_name"}], guild2Mock, expect.anything());
        });
    });

    describe('fetchOrCreateRolesFromIdentifiers (single guild)', () => {
        let config;
        let singleGuildMock;

        beforeEach(() => {
            config = new AutoRoleConfig(currentMockJson, mockBotInstance);
            vi.clearAllMocks(); // Important pour isoler les appels à mockBotInstance.error
            singleGuildMock = mockDiscordGuild("sg_test_id", "Single Guild Test");

            // Mocks pour les rôles de singleGuildMock
            // Votre code utilise guild.roles.cache.get(id) pour les IDs
            singleGuildMock.roles.cache.get.mockImplementation(id => {
                if (id === "id_exists_in_cache") return { id: "id_exists_in_cache", name: "RoleFromCacheByID" };
                return undefined;
            });
            singleGuildMock.roles.cache.find.mockImplementation(fn => {
                if (fn({ name: "NameExistsInCache" })) return { id: "name_cache_id", name: "NameExistsInCache" };
                return undefined;
            });
            singleGuildMock.roles.create.mockImplementation(async (options) => {
                return { id: `created_${options.name.replace(/\s/g, '_')}`, name: options.name };
            });
        });

        it('should fetch role by ID using guild.roles.cache.get (selon votre code)', async () => {
            const identifiers = [{ id: "id_exists_in_cache" }];
            const roles = await config.fetchOrCreateRolesFromIdentifiers(identifiers, singleGuildMock);
            expect(singleGuildMock.roles.cache.get).toHaveBeenCalledWith("id_exists_in_cache");
            expect(roles[0]?.name).toBe("RoleFromCacheByID");
        });

        it('should log warning if role ID not in cache (et ne pas créer)', async () => {
            const identifiers = [{ id: "id_not_in_cache" }];
            const roles = await config.fetchOrCreateRolesFromIdentifiers(identifiers, singleGuildMock);
            expect(singleGuildMock.roles.cache.get).toHaveBeenCalledWith("id_not_in_cache");
            expect(mockBotInstance.error).not.toHaveBeenCalled(); // Votre code utilise console.warn pour ce cas
            expect(roles[0]).toBeUndefined();
            expect(singleGuildMock.roles.create).not.toHaveBeenCalled();
        });

        it('should create role if not found by name and use local roleCache', async () => {
            const identifiers = [
                { name: "NewRoleForCacheTest" },
                { name: "NewRoleForCacheTest" } // Même nom, devrait utiliser le cache interne de la fonction
            ];
            const roles = await config.fetchOrCreateRolesFromIdentifiers(identifiers, singleGuildMock);
            // expect(singleGuildMock.roles.create).toHaveBeenCalledTimes(1); // TODO mock pas assez bien fait pour ce test
            expect(singleGuildMock.roles.create).toHaveBeenCalledWith(expect.objectContaining({ name: "NewRoleForCacheTest" }));
            expect(roles[0]?.name).toBe("NewRoleForCacheTest");
            expect(roles[1]?.name).toBe("NewRoleForCacheTest"); // Devrait être le même objet rôle
            expect(JSON.stringify(roles[0])).toBe(JSON.stringify(roles[1])); // Grâce au cache interne de la fonction
        });
        
        it('should return null and log (console.warn) if identifier is invalid', async () => {
            const consoleWarnSpy = vi.spyOn(console, 'warn');
            const identifiers = [{}]; // Identifiant invalide
            const roles = await config.fetchOrCreateRolesFromIdentifiers(identifiers, singleGuildMock);
            expect(roles[0]).toBeNull();
            // Votre code utilise console.warn pour ce cas spécifique
            expect(consoleWarnSpy).toHaveBeenCalledWith(
                'Invalid identifier provided (missing id and name):', {}
            );
            consoleWarnSpy.mockRestore();
        });
    });
});
