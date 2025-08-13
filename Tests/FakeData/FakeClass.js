const crypto = require('crypto');

//! pourquoi pas inserer une seed ici pour maitriser l'aléatoire
const randNumber = (max = 1, min = 0) =>
	Math.floor(Math.random() * (max - min + 1)) + min;
const randDiscordId = () => Math.round((Math.random() + 0.1) * 1000000000000000000);
const randOlympeId = () => crypto.randomUUID();
const randElement = (arg) => arg[Math.ceil(Math.random() * arg.length - 1)];

const randDiscordTag = ()=> `discordTag#${randNumber(9999)}`

const generateRandomArrayFromArray = (array, max) => {
	const result = [];
	let maxCount = randNumber(max);
	for (let i = 0; i < maxCount; i++) {
		result.push(randElement(array));
	}
	return result;
};
const generateRandomArrayFromClass = (classArg, max, min = 0) => {
	const result = [];
	let maxCount = randNumber(max-min)+min;
	for (let i = 0; i < maxCount; i++) {
		result.push(new classArg());
	}
	return result;
};

const roles = [
    'owner',
    'president',
    'vice president',
    'staff',
    'communication',
    'esport director',
    'video analyst',
    'joueur',
    'manager',
    'manager',
    'assistant manager',
    'head coach',
    'mental coach',
];
const segments = [
    { name: 'Saison 8', id: '3' },
    { name: 'Saison 7', id: '2' },
];
const gameRoleTags = [
    'dps hitscan',
    'dps projectile',
    'off tank',
    'main tank',
    'flex heal',
    'main heal',
];

/**
 * Classe représentant les informations de Discord associées à un utilisateur.
 */
class DiscordInfo {
	/**
	 * Constructeur de la classe DiscordInfo.
	 * @param {Object} discordData - Données Discord de l'utilisateur.
	 */
	constructor() {
		this.publicDiscordTag = randNumber();
		this.discordTag = randDiscordTag();
		this.discordID = randDiscordId();
	}
}

/**
 * Classe représentant les informations tierces associées à un utilisateur.
 */
class ThirdParties {
    /**
     * Constructeur de la classe ThirdParties.
     */
    constructor() {
        this.discord = new DiscordInfo();
    }
}

/**
 * Classe représentant les informations de suivi (followers) d'un utilisateur.
 */
class Followers {
	/**
	 * Constructeur de la classe Followers.
	 */
	constructor() {
		this.number = randNumber(999);
		this.followed = randNumber(999);
	}
}

/**
 * Classe représentant les abonnements d'un utilisateur.
 */
class Subscriptions {
	/**
	 * Constructeur de la classe Subscriptions.
	 */
	constructor() {
		this.number = randNumber(999);
	}
}

/**
 * Classe représentant les tags associés au profil utilisateur, y compris les rôles de jeu.
 */
class Tags {
    /**
     * Constructeur de la classe Tags.
     */
    constructor() {
        /**
         * @type {String[]}
         */
        this.gameRoles = generateRandomArrayFromArray(gameRoleTags, 2);
    }
}

/**
 * Classe principale représentant le profil utilisateur complet.
 * Inclut les informations d'utilisateur, les tags, les rôles, les tickets achetés, et les objets prêtés.
 */
class OlympeMember {
	/**
	 * Constructeur de la classe OlympeMember.
	 */
	constructor(seed) {
		this.user = new OlympeUser(seed); // Informations utilisateur
		this.tags = new Tags(seed); // Tags de l'utilisateur
		this.roles = generateRandomArrayFromArray(roles, 3); // Rôles de l'utilisateur
		/**
		 * @type {Ticket[]}
		 */
		this.ticketsPurchased = generateRandomArrayFromClass(Ticket, 3);
	}
}

/**
 * Classe représentant les liens externes associés.
 */
class ExternalLinks {
    /**
     * Constructeur de la classe ExternalLinks.
     */
    constructor() {
        this.discord = 'linksData.discord';
        this.facebook = 'linksData.facebook';
        this.twitter = 'linksData.twitter';
        this.instagram = 'linksData.instagram';
        this.youtube = 'linksData.youtube';
        this.twitch = 'linksData.twitch';
        this.website = 'linksData.website';
    }
}

/**
 * Classe représentant un segment spécifique dans lequel l'organisation participe.
 */
class Segment {
	/**
	 * Constructeur de la classe Segment.
	 * @param {Object} segmentData - Données du segment.
	 */
	constructor() {
		let segment = randElement(segments);
		this.id = segment.id;
		this.challengeID = randNumber(99);
		this.position = randNumber(99);
		this.name = segment.name;
	}
}

class OlympeTeamSmall {
	constructor(){
		this.id = randOlympeId(); // Identifiant unique de l'organisation
		this.name = `TeamName${randNumber(99999)}`; // Nom de l'organisation
		this.nationality = "FR"; // Nationalité de l'organisation
		this.recruitment = randElement([0, 1]); // Indicateur de recrutement
		this.registerDate = randNumber(9999999); // Date d'inscription (timestamp UNIX)
		this.externalLinks = new ExternalLinks(); // Liens externes
	}
}
/**
 * Classe principale représentant le profil de Team.
 * Inclut des informations générales, des liens externes, les membres, les segments, et les followers.
 */
class OlympeTeam extends OlympeTeamSmall{
	/**
	 * Constructeur de la classe OrganizationProfile.
	 */
	constructor() {
		super()

		/**
		 * Liste des membres de la team.
		 * @type {OlympeMember[]}
		 */
		this.members = generateRandomArrayFromClass(OlympeMember, 6, 1); // Liste des membres actifs
		/**
		 * Liste des membres prété.
		 * @type {OlympeMember[]}
		 */
		this.membersLent = generateRandomArrayFromClass(OlympeMember, 3); // Liste des membres prêtés

        /**
         * @type {Segment[]}
         */
        this.segments = generateRandomArrayFromClass(Segment, 2); // Liste des segments
        this.followers = new Followers(); // Informations de suivi
    }
}

/**
 * Classe représentant une équipe associée à un utilisateur.
 */
class TeamLowInfo {
	/**
	 * Constructeur de la classe Team.
	 */
	constructor() {
		this.id = randOlympeId();
		this.name = `TeamName${randNumber(99999)}`;
		this.nationality = "FR";
		this.recruitment = randElement([0, 1]);
		this.registerDate = randNumber(9999999);
		this.externalLinks = new ExternalLinks();
	}
}

/**
 * Classe principale représentant le profil d'un utilisateur.
 * Inclut des informations personnelles, de tiers, de suivi, et les équipes associées.
 */
class OlympeUser {
	/**
	 * Constructeur de la classe UserProfile.
	 */
	constructor() {
		this.id = randOlympeId(); // Identifiant unique de l'utilisateur
		this.username = `UserName${randNumber(99999)}`; // Nom d'utilisateur
		this.publicEmail = randElement([0, 1]); // Visibilité de l'email
		this.publicBattlenetBtag = randElement([0, 1]); // Visibilité du tag Battle.net
		this.nationality = "FR"; // Nationalité
		this.marketplaceTransfer = randElement([0, 1]); // Transferts en marketplace
		this.marketplaceLent = randElement([0, 1]); // Prêts en marketplace
		this.thirdparties = randElement([new ThirdParties(), null]) 
		this.followers = randElement([new Followers(), null])
		this.subscriptions = randElement([new Subscriptions(), null])
		this.registerDate = randNumber(9999999); // Date d'inscription (timestamp UNIX)
		this.emailValidated = null; // Email validé (null si non défini)
		this.emailAllowCommercialUsage = null; // Permission d'usage commercial de l'email
		this.organizationRoles = []; // Rôles organisationnels
		this.previousTeams = { teams: [] } /* { joinDate: 1645536662, leftDate: 1697370364, team: new OlympeTeamSmall()} */
		
		/**
		 * Liste des équipes de l'utilisateur.
		 * @type {TeamLowInfo[]}
		 */
		this.teams = generateRandomArrayFromClass(TeamLowInfo, 3,1); // Équipes associées

        /**
         * Liste des équipes auxquelles l'utilisateur est prêté.
         * @type {TeamLowInfo[]}
         */
        this.teamsLent = generateRandomArrayFromClass(TeamLowInfo, 1); // Équipes prêtées
    }
}

/**
 * Classe représentant un utilisateur simple (sans informations de détails).
 */
class OlympeUserId {
    constructor() {
        this.id = randOlympeId();
    }
}

/**
 * Classe représentant une équipe de base.
 */
class OlympeTeamId {
    constructor() {
        this.id = randOlympeId();
    }
}

/**
 * Classe détaillant les informations d'un ticket spécifique.
 */
class TicketDetails {
	constructor() {
		this.id = randNumber(99999);
		this.challengeID = randNumber(99);
		this.stepsID = randNumber(99);

		/**
		 * @type {Step[]}
		 */
		this.steps = generateRandomArrayFromClass(Step, 3);
		this.name = "TicketName";
		this.price = randNumber(999);
		this.expirationDateTeamValidated = randNumber(9999999);
		this.expirationDateTeamNotValidated = randNumber(9999999);
		this.multiplePurchaseLimit = 1;
	}
}

/**
 * Classe représentant un ticket acheté par un utilisateur.
 */
class Ticket {
	constructor() {
		this.id = randNumber(9999);
		this.teamID = randOlympeId();
		this.userID = randOlympeId();
		this.user = new OlympeUserId();
		this.team = new OlympeTeamId();
		this.type = randElement(["break", "play"]);
		this.registerDate = randNumber(9999999);
		this.ticket = new TicketDetails();
	}
}

/**
 * Classe représentant une carte (map) d'un match, avec son nom et son type.
 */
class MatchMap {
    constructor() {
        this.name = 'MapName';
        this.type = 'MapType';
    }
}

/**
 * Classe représentant le score d'un match entre deux équipes pour une carte spécifique.
 */
class Score {
	constructor(scoreData) {
		this.score1 = randNumber(5);
		this.score2 = randNumber(5);
		this.teamID_winner = randOlympeId();
		/**
		 * @type {MatchMap[]}
		 */
		this.map = new MatchMap();
	}
}

/**
 * Classe représentant un commentateur du match.
 */
class Caster {
	constructor() {
		this.castID = randNumber(9999);
		this.id = randOlympeId();
		this.username = "UserName";
		this.castUrl = "CaterURL";
	}
}

/**
 * Classe représentant une étape (step) dans un tournoi.
 */
class Step {
	constructor() {
		this.id = randNumber(99);
		this.challengeID = randNumber(99);
		this.name = "stepData.name";
		this.type = "stepData.type";
		this.startDate = randNumber(9999999);
		this.endDate = randNumber(9999999);
	}
}

/**
 * Classe représentant les configurations d'un pool dans un tournoi.
 */
class PoolConfig {
	constructor() {
		this.id = randNumber(9999);
		this.name = "PoolName";
		this.challengeID = randNumber(99);
		this.format = "PoolFormat";
	}
}

/**
 * Classe représentant un pool de tournoi.
 */
class Pool {
	constructor(poolData) {
		this.id = randNumber(9999);
		this.name = "PoolName";
		this.challengeID = randNumber(99);
		this.segmentID = randNumber(99);
		this.stepsID = randNumber(99);
		this.minScoresPerMatch = 5;
		this.poolConfigs = new PoolConfig();
	}
}

/**
 * Classe représentant une équipe dans un match.
 */
class TeamInMatch {
	constructor() {
		this.id = randOlympeId();
		this.name = `TeamName${randNumber(99999)}`;
		this.nationality = "FR";
		this.recruitment = randElement([0, 1]);
		this.registerDate = randNumber(9999999);
		this.externalLinks = new ExternalLinks();
		this.score = randNumber(5);
		this.lineup = randElement([new Lineup(), null]);
	}
}

/**
 * Classe représentant une composition d'équipe.
 */
class Lineup {
	constructor(lineupData) {
		this.id = randNumber(99999);
		this.name = `LineupName${randNumber(99999)}`;
		this.team = new OlympeTeamId();
		/**
		 * Liste des scores pour chaque carte du match.
		 * @type {OlympeMember[]}
		 */
		this.members = generateRandomArrayFromClass(OlympeMember, 9, 1);
		/**
		 * Liste des scores pour chaque carte du match.
		 * @type {OlympeMember[]}
		 */
		this.substitutes = generateRandomArrayFromClass(OlympeMember, 4);
		this.registerDate = randNumber(9999999);
	}
}

/**
 * Classe représentant le groupe d'un tournoi.
 */
class Group {
	constructor(groupData) {
		this.id = randNumber(999);
		this.name = "GroupName";
	}
}

/**
 * Classe représentant le défi (challenge) dans le cadre d'un tournoi.
 */
class Challenge {
	constructor() {
		this.id = randNumber(999);
		this.name = "ChallengeName";
		this.language = "FR";
		this.group = new Group();
	}
}

/**
 * Classe principale représentant un match.
 */
class OlympeMatch {
	constructor() {
		this.id = randOlympeId();
		this.challenge = new Challenge();
		this.segment = new Segment();
		this.matchDate = randNumber(9999999);
		this.team1 = new TeamInMatch();
		this.team2 = new TeamInMatch();
		this.teamID_winner = randOlympeId();
		this.team1forfeit = randElement([0, 1]);
		this.team2forfeit = randElement([0, 1]);

        /**
         * Liste des scores pour chaque carte du match.
         * @type {Score[]}
         */
        this.scores = [new Score(), new Score(), new Score(), new Score(), new Score()];

        /**
         * Liste des commentateurs du match.
         * @type {Caster[]}
         */
        this.casters = randElement([new Caster(), null]);

		/**
		 * Liste des propositions de dates pour le match.
		 * @type {Date[]}
		 */
		this.matchDateProposals = randNumber(9999999);

        this.pool = new Pool();

        /**
         * Liste des étapes associées au match.
         * @type {Step[]}
         */
        this.steps = generateRandomArrayFromClass(Step, 3);
    }
}

module.exports = { OlympeMember, OlympeTeamSmall, OlympeTeam, OlympeUser, OlympeMatch };
