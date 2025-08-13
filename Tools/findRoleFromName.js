const Discord = require('discord.js');

class findRoleFromName {
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