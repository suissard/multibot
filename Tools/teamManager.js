const { StrapiCollections } = require('suissard-strapi-client');
const Discord = require('discord.js');
const { ChannelType } = require('discord.js');
const findRole = require('./findRoleFromName.js');
const DATAS = require('../Class/DataBase');

const catEventName = '━━━ Event : Général ━━━';

class TeamManager {
    /**
     * regroupement de méthodes pour gerer les teams
     * @param {StrapiCollection} collection collection issu de la base de donnée Strapi
     */
    constructor(collection) {
        this.collection = collection;
    }

    /**
     * Sauvegarder les teams ou met les donnée a jour dans la base de donnée Strapi
     * @param {String} name
     * @param {String} userID
     * @param {String} elo
     * @param {String} battleTag
     * @returns {StrapiObject} team
     */
    async saveTeamData(name, userID, elo, battleTag) {
        let oldData = this.getTeamByName(name);
        elo = new String(elo);
        let data = {
            capitaine: userID ? { User: userID } : undefined,
            name,
            elo,
            battleTag,
        };

        if (oldData) return await this.collection.update(oldData.getID(), data);
        else return await this.collection.create(data);
    }

    /**
     * Retrouver une team dans le cache grace a son nom
     * @param {String} name
     * @returns {StrapiObject} team
     */
    getTeamByName(name) {
        return this.collection.cache.find((team) => team.name == name);
    }

    /**
     *
     * @param {String} teamname
     * @param {Discord.Guild} guild
     * @returns {Discord.Role} roleteam
     */
    async createRoleTeam(teamname, guild) {
        try {
            let role = await findRole.findRole(`Team [${teamname}]`, guild);
            if (!role) {
                role = await findRole.findRole(`Team [${teamname}]`, guild);
            }
            return role;
        } catch (e) {
            throw new Error(`La création de role de team a rencontré une erreur\n${e.stack}`);
        }
    }

    /**
     * Creer la catégorie de channel d'event
     * @param {Discord.Guild} guild
     * @returns {Discord.Channel} category
     */
    createCatEvent(guild) {
        return guild.channels.create({ name: catEventName, type: ChannelType.GuildCategory });
    }

    /**
     * Creer un channel de team pour une équipe
     * @param {String} teamname
     * @param {Discord.Guild} guild
     * @returns {Discord.Channel} channel
     */
    async createChannelTeam(teamname, guild) {
        try {
            let roleCap = await findRole.findRole('🎉 Capitaine', guild);
            if (!roleCap) {
                roleCap = await findRole.findRole('🎉 Capitaine', guild);
            }
            let roleTeam = await findRole.findRole(`Team [${teamname}]`, guild);
            if (!roleTeam) {
                await findRole.findRole(`Team [${teamname}]`, guild);
            }
            let rolestaff = await findRole.findRole(`━━━━━━ Staff ━━━━━━`, guild);
            if (!rolestaff) {
                await findRole.findRole(`━━━━━━ Staff ━━━━━━`, guild);
            }
            let channel = guild.channels.cache.find((chan) => {
                if (chan.name == `Team [${teamname}]`) return chan;
            });
            let cat = guild.channels.cache.find((chan) => {
                if (chan.name == catEventName) return chan;
            });
            if (!cat) {
                cat = await this.createCatEvent(guild);
            }

            if (!channel) {
                channel = await guild.channels.create({
                    name: `Team [${teamname}]`,
                    type: ChannelType.GuildVoice,
                    permissionOverwrites: [
                        {
                            id: rolestaff.id,
                            allow: ['Connect', 'ViewChannel', 'MoveMembers'],
                        },
                        {
                            id: guild.id,
                            deny: ['Connect', 'ViewChannel'],
                        },
                        {
                            id: roleCap.id,
                            allow: ['MoveMembers', 'ViewChannel'],
                        },
                        {
                            id: roleTeam.id,
                            allow: ['Connect', 'ViewChannel'],
                        },
                    ],
                    reason: 'Inscription de l\'équipe : ' + teamname,
                    mentionable: true,
                });
                await channel.setParent(cat.id, { lockPermissions: false });
            }
            return channel;
        } catch (e) {
            throw new Error(
                `La création de channel de team a rencontré une erreur\n${e.stack}`,
            );
        }
    }

    /**
     * Ajouter el role de team a un membre
     * @param {Discord.GuildMember} member
     * @param {Discord.Role} rolecap
     * @param {Discord.Role} roleteam
     * @returns {Discord.GuildMember} member
     */
    async addRoleTeam(member, rolecap, roleteam) {
        if (!member.roles.cache.has(roleteam.id)) {
            await member.roles.add(roleteam);
        } else if (!member.roles.cache.has(rolecap.id)) {
            await member.roles.add(rolecap);
        }
        return this.checkRole(member, rolecap, roleteam);
    }

    /**
     * Verifier si un membre a le role de team
     * @param {Discord.GuildMember} member
     * @param {Discord.Role} rolecap
     * @param {Discord.Role} roleteam
     * @returns {Discord.GuildMember} member
     */
    async checkRole(member, rolecap, roleteam) {
        await member.fetch(true);
        if (!member.roles.cache.has(roleteam.id) || !member.roles.cache.has(rolecap.id)) {
            this.addRoleTeam(member, rolecap, roleteam);
        }
        return member;
    }

    /**
     * Met a jour le role de team d'un membre
     * @param {Discord.Role} role
     * @param {String} newTeamName
     * @returns {Discord.Role} role
     */
    async updateRoleTeam(role, newTeamName) {
        role.edit({ name: `Team [${newTeamName}]` });
        return role;
    }

    /**
     * Met a jour le channel de team
     * @param {Discord.Channel} channel
     * @param {String} newTeamName
     * @returns {Discord.Channel} channel
     */
    async updateChannelTeam(channel, newTeamName) {
        channel.edit({ name: `Team [${newTeamName}]` });
        return channel;
    }

    /**
     * Remplace le capiaitne actuel par un nouveau capitaine (retrait puis ajoutr de role)
     * @param {Discord.GuildMember} cap
     * @param {Discord.GuildMember} newCap
     * @param {Discord.Role} capRole
     * @param {Discord.Role} teamRole
     * @returns {Discord.GuildMember} newCap
     */
    async updateTeamCap(cap, newCap, capRole, teamRole) {
        cap.roles.remove([capRole, teamRole]);
        newCap.roles.add([capRole, teamRole]);
        return newCap;
    }

    /**
     *
     * @param {*} teamInfo
     * @param {*} newBtag
     */
    async updateCapBtag(teamInfo, newBtag) {
    }

    /**
     *
     * @param {*} teamInfo
     * @param {*} newRank
     */
    async updateTeamRank(teamInfo, newRank) {
    }
}

const teamManager = new TeamManager(DATAS.collections.teams);

module.exports = teamManager;
