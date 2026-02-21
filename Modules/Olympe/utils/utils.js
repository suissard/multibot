const { OlympeApi } = require('olympe-client-api');

/**
 * Initialise la connexion à l'API Olympe et la stocke dans l'objet bot.
 * @param {import('../../Class/Bot')} bot - L'instance du bot.
 * @param {Object} challengesRolesId - L'objet contenant les IDs des rôles de la compétition (optionnel pour l'init pur, mais utilisé dans AutoRole).
 * NOTE: challengesRolesId est spécifique à AutoRole. On va juste initier l'API ici.
 */
const initOlympe = async (bot) => {
    // Token d'utilisateur random (aucun droits nécessaires)
    const olympeToken = bot.modules.Olympe.olympeAuth.value;
    const olympeDomain = bot.modules.Olympe.olympeDomain; //Domain ou est hebergé l'api olympe
    const olympeOrganization = bot.modules.Olympe.organization; //Organization associé au call
    const olympeApi = new OlympeApi(olympeToken, olympeDomain, olympeOrganization);

    if (!bot.olympe) bot.olympe = {};
    bot.olympe.api = olympeApi;

    // ============================================ DEV ============================================
    // ... Dev logic if needed
    // ============================================ DEV ============================================

    // Initialize cache structures
    if (!bot.olympe.users) bot.olympe.users = {};
    if (!bot.olympe.segments) bot.olympe.segments = [];
    if (!bot.olympe.teams) bot.olympe.teams = [];
};

/**
 * Remettre a zero le cache de données olympe
 */
const wipeOlympeData = (bot) => {
    bot.olympe.url = `https://${bot.modules.Olympe.olympeDomain}`;
    bot.olympe.users = {};
    bot.olympe.segments = [];
    bot.olympe.teams = [];
};

/**
 * Récupère les données de toutes les équipes disponibles pour un challenge de compétition spécifique.
 * @param {import('../../Class/Bot')} bot - L'instance du bot.
 * @param {string} idChallenge - L'ID du challenge.
 * @returns {Promise<Array<object>>} Une promesse qui se résout avec un tableau d'objets d'équipe.
 * @todo La méthode actuelle pour sélectionner la poule (la dernière de la liste) n'est pas fiable.
 */
const getAllTeamsFromChallenge = async (bot, idChallenge) => {
    if (!idChallenge.match(/[0-9]/)) return [];
    let pools = await bot.olympe.api.get(`challenges/${idChallenge}/pools`);
    if (!pools) return [];
    return await bot.olympe.api.get(
        `challenges/${idChallenge}/pools/${pools.pools[pools.pools.length - 1].id}/teams/available` // TODO gere cela via des données plus fiable => derniere pool n'est pas forcement la bonne pool
    );
};

module.exports = {
    initOlympe,
    wipeOlympeData,
    getAllTeamsFromChallenge
};
