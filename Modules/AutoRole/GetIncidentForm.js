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

class GetIncidentFormCommand extends Command {
	static id = 'incident';
	static devBoss = false;
	static home = false;
	static userPermissions = [];
	static botPermissions = [];
	static description =
		'Renvoit un url personnalisé pour déclarer un incident lors de la compétition OAFO';
	static help = true;
	static howTo = '``PREFIXCMD``';
	static test = [];
	static arguments = [
		{
			type: 'USER',
			name: 'user',
			description: "Utilisateur a qui faire parvenir le formulaire d'incident",
			required: false,
		},
	];

	static narrative = `
- Cette commande a pour but de fournir à un utilisateur un lien personnalisé pour déclarer un incident survenu lors de la compétition OAFO.
- Elle peut cibler l'auteur de la commande ou un autre utilisateur si celui-ci est mentionné.

- **Fonctionnement :**
    1.  La commande identifie l'utilisateur Discord cible.
    2.  Elle recherche l'ID Olympe de cet utilisateur dans sa base de données locale.
    3.  Elle tente d'utiliser cet ID pour récupérer des informations supplémentaires sur l'utilisateur depuis l'API Olympe (BattleTag, équipes, etc.).
    4.  Elle utilise une URL de base de formulaire Google et la personnalise en pré-remplissant plusieurs champs avec les informations récupérées :
        - Langue (basée sur la nationalité), BattleTag, Tag Discord, nom de l'équipe, etc.
    5.  Si les informations Olympe ne sont pas trouvées, elle utilise des valeurs par défaut.
    6.  Elle crée un message "embed" contenant le lien vers le formulaire pré-rempli.
    7.  Elle envoie cet embed en message privé (DM) à l'utilisateur cible.
    8.  Elle renvoie un message de confirmation, qui précise si les informations Olympe de l'utilisateur ont été trouvées ou non.
`;

	/**
	 * Génère une URL personnalisée pour le formulaire de déclaration d'incident.
	 * @param {object} [olympeUserInfo] - Les informations de l'utilisateur provenant de l'API Olympe.
	 * @param {string} olympeUserInfo.nationality - La nationalité de l'utilisateur.
	 * @param {string} olympeUserInfo.battlenetBtag - Le BattleTag de l'utilisateur.
	 * @param {Array<{name: string}>} olympeUserInfo.teams - Les équipes de l'utilisateur.
	 * @param {import('discord.js').User} discordUser - L'objet utilisateur Discord.
	 * @returns {string} L'URL personnalisée et pré-remplie du formulaire Google.
	 */
	getIncidentUrlForm(
		olympeUserInfo = { nationality: 'FR', battlenetBtag: '', teams: [] },
		discordUser
	) {
		const lang = olympeUserInfo.nationality == 'FR' ? 'Français' : 'English';
		const BTag = olympeUserInfo.battlenetBtag;
		const DTag = `${discordUser.tag} (${discordUser.id})`;
		const teamName = olympeUserInfo.teams.length
			? olympeUserInfo.teams.map((t) => t.name).join(', ')
			: '';

		//Personnaliser l'url
		const baseUrl =
			'https://docs.google.com/forms/d/e/1FAIpQLSf2zxdhxHjMe3ZTmAVnP5t5xyKgMrulyHRZxKdQZ5TZ_1CPOg/viewform';
		return `${baseUrl}?usp=pp_url&entry.2097190482=${encodeURIComponent(
			lang
		)}&entry.786009289=${encodeURIComponent(BTag)}&entry.179773228=${encodeURIComponent(
			DTag
		)}&entry.1386247695=${encodeURIComponent(teamName)}&entry.1144352831=${encodeURIComponent(
			BTag
		)}&entry.1678441394=${encodeURIComponent(DTag)}&entry.12174275=${encodeURIComponent(
			teamName
		)}`;
	}

	/**
	 * Exécute la commande pour envoyer un formulaire de déclaration d'incident.
	 * Récupère les informations Olympe de l'utilisateur, génère une URL de formulaire
	 * personnalisée et l'envoie en message privé.
	 * @param {object} args - Les arguments de la commande.
	 * @param {string} [args.user] - L'ID de l'utilisateur à qui envoyer le formulaire.
	 * @returns {Promise<string>} Un message de confirmation.
	 */
	async methode(args = {}) {
		const discordUser = this.bot.users.cache.get(args.user) || this.user;

		//Recuperer les info de l'utilisateur discord qui a fait la commande
		const olympeId = this.bot.olympe.users[discordUser.id]?.id;

		var oAfoInfo = { nationality: 'FR', battlenetBtag: '', teams: [] };
		try {
			oAfoInfo = await this.bot.olympe.api.get(
				`users/${olympeId}?fields=battlenetBtag%2CthirdpartiesDiscord`
			);
		} catch (e) {}

		const formUrl = this.getIncidentUrlForm(oAfoInfo, discordUser);

		//envoyer par mp
		var msgEmbed = new EmbedBuilder()
			.setTitle("Formulaire d'incident")
			.setColor(Colors.Red)
			.setDescription(`[**LIEN**](${formUrl})`);

		discordUser.send({ embeds: [msgEmbed] });
		if (!olympeId)
			return "Un formulaire a été envoyé par mp, mais je n'ai pas trouvé d'info OAFO lié a ton discord";
		return 'Un formulaire personnalisé a été envoyer par mp';
	}
}

module.exports = GetIncidentFormCommand;
