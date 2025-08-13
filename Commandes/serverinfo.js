const Commande = require('../Class/Command.js');
const Discord = require('discord.js');

module.exports =
    class Serverinfo extends Commande {

        static id = 'serverinfo';
        static devBoss = false;
        static home = true;
        static userPermissions = [];
        static botPermissions = [];
        static description = 'Donne des infos sur le serveur';
        static help = true;
        static howTo = '';
        static test = [];
        static arguments = [];

        async methode(args = {}) {
            let embed = await this.serverInfoEmbed(this.guild);
            return embed;
        }

        /**
         * Retourne un embed avec els info du serveur discord
         */
        async serverInfoEmbed(guild) {
            let owner = await guild.fetchOwner();
            return new Discord.EmbedBuilder()
                .setTitle(`INFO DU SERVEUR : ${guild.name}` + ` (${guild.memberCount}membres)`)
                .setThumbnail(guild.iconURL())
                .setDescription(`**Dirigé par :** <@${guild.ownerId}> *(${owner.user.tag})*\n**Créer le :** ${guild.createdAt}\n**Nombres de channels :** ${guild.channels.cache.size}\n**Nombres de roles :** ${guild.roles.cache.size}`);

        }
    };