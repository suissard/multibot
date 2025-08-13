const Discord = require('discord.js');

/**
 * Une classe utilitaire pour trouver ou créer des rôles dans une guilde.
 * @class
 */
class findRoleFromName {
    /**
     * Trouve un rôle par son nom dans une guilde. S'il n'existe pas, le crée.
     * @param {string} roleName - Le nom du rôle à trouver ou à créer.
     * @param {import('discord.js').Guild} guild - La guilde où chercher le rôle.
     * @returns {Promise<import('discord.js').Role>} Le rôle trouvé ou nouvellement créé.
     */
    async findRole(roleName, guild) {
        let role = guild.roles.cache.find((r) => {
            if (r.name == roleName) return r;
        });
        if (!role) {
            role = await this.createRole(roleName, guild);
        } else {
            return role;
        }
    }

    /**
     * Crée un nouveau rôle dans une guilde.
     * @param {string} name - Le nom du rôle à créer.
     * @param {import('discord.js').Guild} guild - La guilde où créer le rôle.
     * @returns {Promise<import('discord.js').Role>} Le rôle qui a été créé.
     * @throws {Error} Si la création du rôle échoue.
     */
    async createRole(name, guild) {
        try {
            let role = await guild.roles.create({
                name: name,
                position: guild.roles.cache.size + 1,
                mentionable: true,
            });
            return role;
        } catch (e) {
            throw new Error(`La création du role : ${name}, a rencontré une erreur\n${e.stack}`);
        }
    }
}

const findFromName = new findRoleFromName;

module.exports = findFromName;