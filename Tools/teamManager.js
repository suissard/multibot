const { StrapiCollections } = require('suissard-strapi-client');
const Discord = require('discord.js');
const { ChannelType } = require('discord.js');
const findRole = require('./findRoleFromName.js');
const DATAS = require('../Class/DataBase');

const catEventName = '━━━ Event : Général ━━━';

class TeamManager {
    /**
     * @param {import('suissard-strapi-client').StrapiCollection} collection - La collection Strapi pour les équipes.
     */
    constructor(collection) {
        this.collection = collection;
    }

    /**
     * Sauvegarde ou met à jour les données d'une équipe dans la base de données Strapi.
     * @param {string} name - Le nom de l'équipe.
     * @param {string} userID - L'ID Discord du capitaine.
     * @param {string} elo - Le classement de l'équipe.
     * @param {string} battleTag - Le BattleTag du capitaine.
     * @returns {Promise<import('suissard-strapi-client').StrapiObject>} L'objet équipe sauvegardé ou mis à jour.
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
     * Retrouve une équipe dans le cache par son nom.
     * @param {string} name - Le nom de l'équipe.
     * @returns {import('suissard-strapi-client').StrapiObject|undefined} L'objet équipe trouvé, ou undefined.
     */
    getTeamByName(name) {
        return this.collection.cache.find((team) => team.name == name);
    }

    /**
     * Crée le rôle spécifique pour une équipe, s'il n'existe pas déjà.
     * @param {string} teamname - Le nom de l'équipe.
     * @param {import('discord.js').Guild} guild - La guilde.
     * @returns {Promise<import('discord.js').Role>} Le rôle de l'équipe.
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
     * Crée la catégorie de salons pour les événements.
     * @param {import('discord.js').Guild} guild - La guilde.
     * @returns {Promise<import('discord.js').CategoryChannel>} La catégorie créée.
     */
    createCatEvent(guild) {
        return guild.channels.create({ name: catEventName, type: ChannelType.GuildCategory });
    }

    /**
     * Crée le salon vocal pour une équipe, s'il n'existe pas déjà.
     * Configure les permissions pour le staff, le capitaine et les membres de l'équipe.
     * @param {string} teamname - Le nom de l'équipe.
     * @param {import('discord.js').Guild} guild - La guilde.
     * @returns {Promise<import('discord.js').VoiceChannel>} Le salon vocal de l'équipe.
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
     * Ajoute les rôles d'équipe et de capitaine à un membre.
     * @param {import('discord.js').GuildMember} member - Le membre à qui ajouter les rôles.
     * @param {import('discord.js').Role} rolecap - Le rôle de capitaine.
     * @param {import('discord.js').Role} roleteam - Le rôle de l'équipe.
     * @returns {Promise<import('discord.js').GuildMember>} Le membre mis à jour.
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
     * Vérifie si un membre a les rôles d'équipe et de capitaine, et les ajoute si nécessaire.
     * @param {import('discord.js').GuildMember} member - Le membre à vérifier.
     * @param {import('discord.js').Role} rolecap - Le rôle de capitaine.
     * @param {import('discord.js').Role} roleteam - Le rôle de l'équipe.
     * @returns {Promise<import('discord.js').GuildMember>} Le membre vérifié.
     */
    async checkRole(member, rolecap, roleteam) {
        await member.fetch(true);
        if (!member.roles.cache.has(roleteam.id) || !member.roles.cache.has(rolecap.id)) {
            this.addRoleTeam(member, rolecap, roleteam);
        }
        return member;
    }

    /**
     * Met à jour le nom d'un rôle d'équipe.
     * @param {import('discord.js').Role} role - Le rôle à modifier.
     * @param {string} newTeamName - Le nouveau nom de l'équipe.
     * @returns {Promise<import('discord.js').Role>} Le rôle mis à jour.
     */
    async updateRoleTeam(role, newTeamName) {
        role.edit({ name: `Team [${newTeamName}]` });
        return role;
    }

    /**
     * Met à jour le nom d'un salon d'équipe.
     * @param {import('discord.js').VoiceChannel} channel - Le salon à modifier.
     * @param {string} newTeamName - Le nouveau nom de l'équipe.
     * @returns {Promise<import('discord.js').VoiceChannel>} Le salon mis à jour.
     */
    async updateChannelTeam(channel, newTeamName) {
        channel.edit({ name: `Team [${newTeamName}]` });
        return channel;
    }

    /**
     * Transfère les rôles de capitaine et d'équipe d'un ancien capitaine à un nouveau.
     * @param {import('discord.js').GuildMember} cap - L'ancien capitaine.
     * @param {import('discord.js').GuildMember} newCap - Le nouveau capitaine.
     * @param {import('discord.js').Role} capRole - Le rôle de capitaine.
     * @param {import('discord.js').Role} teamRole - Le rôle de l'équipe.
     * @returns {Promise<import('discord.js').GuildMember>} Le nouveau capitaine mis à jour.
     */
    async updateTeamCap(cap, newCap, capRole, teamRole) {
        cap.roles.remove([capRole, teamRole]);
        newCap.roles.add([capRole, teamRole]);
        return newCap;
    }

    /**
     * Met à jour le BattleTag du capitaine.
     * @todo Cette fonction n'est pas implémentée.
     * @param {object} teamInfo - Les informations de l'équipe.
     * @param {string} newBtag - Le nouveau BattleTag.
     */
    async updateCapBtag(teamInfo, newBtag) {
    }

    /**
     * Met à jour le classement (elo) de l'équipe.
     * @todo Cette fonction n'est pas implémentée.
     * @param {object} teamInfo - Les informations de l'équipe.
     * @param {number} newRank - Le nouveau classement.
     */
    async updateTeamRank(teamInfo, newRank) {
    }
}

const teamManager = new TeamManager(DATAS.collections.teams);

module.exports = teamManager;
