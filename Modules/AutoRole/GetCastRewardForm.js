const { EmbedBuilder, Colors } = require('discord.js');
const Command = require('../../Class/Command.js');
const { OlympeApi } = require('olympe-client-api');

// const olympeUser = {
// 	id: "bb8109b0-b851-4f87-8a32-6a16fdf0ec19-2bcb9e4d-0656-4f05-97bb-9fd9709a608c",
// 	username: "Suissard#56036",
// 	nationality: "FR",
// 	battlenetBtag: "Suissard#1200",
// 	thirdparties: {
// 		discord: {
// 			publicDiscordTag: 1,
// 			discordTag: "suissard#0",
// 			discordID: "306395745693597697",
// 		},
// 	},
// 	teams: [
// 		{
// 			id: "b858cb4c-44bc-4917-937e-52dd2233a68b-20da75c7-4bab-4059-82d1-5e60449b1d5c",
// 			name: "Compte Organisateur - Transfert de Joueur Professionnel",
// 		},
// 	],
// };

class GetCastRewardFormCommand extends Command {
    static id = 'castreward';
    static devBoss = false;
    static home = false;
    static userPermissions = [];
    static botPermissions = [];
    static description = 'Renvoit un url personnalisé pour réclamer une récompense de cast OAFO';
    static help = true;
    static howTo = '``PREFIXCMD``';
    static test = [];
    static arguments = [
        {
            type: 'USER',
            name: 'user',
            description: 'Utilisateur a qui faire parvenir le formulaire de récompense',
            required: false,
        },
    ];

    /**
     * Génère une URL personnalisée pour le formulaire de récompense de cast.
     * @param {import('discord.js').User} discordUser - L'utilisateur Discord pour lequel générer l'URL.
     * @returns {string} L'URL personnalisée du formulaire Google.
     */
    getCastRewardUrlForm(discordUser) {
        //Personnaliser l'url
        const baseUrl =
            'https://docs.google.com/forms/d/e/1FAIpQLSdZPvukVFYExCCkZAlv2ggIzmXqwE2biK7bZDVYeyPsmypP9A/viewform';
        return `${baseUrl}?usp=pp_url&entry.728176607=${encodeURIComponent(discordUser.id)}`;
    }

    /**
     * Exécute la commande pour envoyer un formulaire de récompense de cast.
     * Cible l'utilisateur mentionné ou l'auteur de la commande, génère une URL de formulaire
     * personnalisée et l'envoie en message privé.
     * @param {object} args - Les arguments de la commande.
     * @param {string} [args.user] - L'ID de l'utilisateur à qui envoyer le formulaire.
     * @returns {Promise<string>} Un message de confirmation.
     */
    async methode(args = {}) {
        const discordUser = this.bot.users.cache.get(args.user) || this.user;


        const formUrl = this.getCastRewardUrlForm(discordUser);

        //envoyer par mp
        var msgEmbed = new EmbedBuilder()
            .setTitle("Formulaire castReward")
            .setColor(Colors.Purple)
            .setDescription(`[**LIEN**](${formUrl})`);

        discordUser.send({ embeds: [msgEmbed] });

        return 'Un formulaire personnalisé a été envoyer par mp';
    }
}

module.exports = GetCastRewardFormCommand;

