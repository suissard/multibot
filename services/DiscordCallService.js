const ApiCallQueue = require('../Class/ApiCallQueue');
const { discordQueueConfig } = require('../Modules/AutoRole/utils/constants');

const queue = new ApiCallQueue(discordQueueConfig.delay, discordQueueConfig.concurrency);

/**
 * Service pour gérer les appels à l'API Discord via une file d'attente
 * pour éviter les Rate Limits (429).
 */
const DiscordCallService = {
    /**
     * Ajoute un appel API Discord à la file d'attente.
     * @param {Function} callFn - Fonction asynchrone qui exécute l'appel Discord.
     * @returns {Promise<any>} Promesse résolue avec le résultat de l'appel.
     */
    add: (callFn) => {
        return queue.add(callFn);
    },

    /**
     * Helper pour ajouter un rôle à un membre.
     * @param {Discord.GuildMember} member 
     * @param {string|Discord.Role} roleOrId 
     * @param {string} [reason] 
     */
    addRole: (member, roleOrId, reason) => {
        return queue.add(() => member.roles.add(roleOrId, reason));
    },

    /**
     * Helper pour retirer un rôle à un membre.
     * @param {Discord.GuildMember} member 
     * @param {string|Discord.Role} roleOrId 
     * @param {string} [reason] 
     */
    removeRole: (member, roleOrId, reason) => {
        return queue.add(() => member.roles.remove(roleOrId, reason));
    },

    /**
     * Helper pour changer le pseudo.
     * @param {Discord.GuildMember} member 
     * @param {string} nickname 
     * @param {string} [reason] 
     */
    setNickname: (member, nickname, reason) => {
        return queue.add(() => member.setNickname(nickname, reason));
    },

    /**
     * Helper pour fetch un membre.
     * @param {Discord.Guild} guild 
     * @param {string} userId 
     */
    fetchMember: (guild, userId) => {
        if (!userId) return Promise.reject(new Error("fetchMember: userId is required"));
        return queue.add(() => guild.members.fetch(userId).catch(e => { }));
        // return queue.add(() => guild.members.fetch(userId).catch(e => console.warn("fetchMember " + userId + " : " + e.message)));
    }
};

module.exports = DiscordCallService;
