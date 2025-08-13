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

        /**
         * Exécute la commande serverinfo.
         * Génère et retourne un embed contenant les informations du serveur actuel.
         * @param {object} args - Les arguments de la commande (non utilisés ici).
         * @returns {Promise<Discord.EmbedBuilder>} L'embed avec les informations du serveur.
         */
        async methode(args = {}) {
            let embed = await this.serverInfoEmbed(this.guild);
            return embed;
        }

        /**
         * Crée et retourne un `EmbedBuilder` avec les informations d'un serveur.
         * @param {Discord.Guild} guild - L'objet Guild du serveur dont il faut extraire les informations.
         * @returns {Promise<Discord.EmbedBuilder>} Un EmbedBuilder contenant les informations formatées du serveur.
         */
        async serverInfoEmbed(guild) {
            let owner = await guild.fetchOwner();
            return new Discord.EmbedBuilder()
                .setTitle(`INFO DU SERVEUR : ${guild.name}` + ` (${guild.memberCount}membres)`)
                .setThumbnail(guild.iconURL())
                .setDescription(`**Dirigé par :** <@${guild.ownerId}> *(${owner.user.tag})*\n**Créer le :** ${guild.createdAt}\n**Nombres de channels :** ${guild.channels.cache.size}\n**Nombres de roles :** ${guild.roles.cache.size}`);

        }
    };