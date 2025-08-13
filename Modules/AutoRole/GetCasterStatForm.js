const { EmbedBuilder, Colors } = require('discord.js');
const Command = require('../../Class/Command.js');

class GetCasterStatFormCommand extends Command {
	static id = 'casterstat';
	static devBoss = false;
	static home = false;
	static userPermissions = [];
	static botPermissions = [];
	static description = "Renvoit un url personnalisé pour déclarer les statistiques d'un match";
	static help = true;
	static howTo = '``PREFIXCMD``';
	static test = [];
	static arguments = [
		{
			type: 'STRING',
			name: 'matchid',
			description: 'Identifiant de match de la compétition',
			required: true,
		},
		{
			type: 'USER',
			name: 'user',
			description: 'Utilisateur a qui faire parvenir le formulaire',
			required: false,
		},
		{
			type: 'STRING',
			name: 'castnbr',
			description: 'Caster était en position 1 ou 2',
			required: false,
		},
	];

	/**
	 * Génère une URL pré-remplie pour le formulaire de statistiques de caster.
	 * @param {object} match - L'objet contenant les données du match, provenant de l'API Olympe.
	 * @param {number} [castNbr=1] - Le numéro du caster (1 ou 2) pour lequel générer le formulaire.
	 * @returns {string} L'URL personnalisée et pré-remplie du formulaire.
	 */
	getCasterStatUrlForm(match, castNbr = 1) {
		//Personnaliser l'url
		let formURL = this.bot.modules.MatchNotifier.casterStatFormUrl;
		const matchDate = `${new Date(match.matchDate * 1000).toISOString().split('T')[0]}`;
		
		const twitchName = match.casters[castNbr].castUrl.split('/').pop();

		const formPatternURL = {
			matchID: match.id,
			'1970-01-01': matchDate,
			team1: match.team1.name,
			team2: match.team2.name,
			divisionName: match.segment.name,
			'lienTwitch.com': match.casters[0].castUrl,
			autolink: 'https://dashboard.twitch.tv/u/' + twitchName + '/analytics/stream-summary',
		};

		for (let entrieNumber in formPatternURL) {
			let oldValue = entrieNumber;
			let newValue = encodeURIComponent(formPatternURL[entrieNumber]);
			formURL = formURL.replace(oldValue, newValue);
		}

		return formURL;
	}

	/**
	 * Exécute la commande pour envoyer un formulaire de statistiques de caster.
	 * Récupère les données du match, génère une URL de formulaire pré-remplie et l'envoie
	 * en message privé à l'utilisateur concerné.
	 * @param {object} args - Les arguments de la commande.
	 * @param {string} args.matchid - L'ID du match pour lequel déclarer les statistiques.
	 * @param {string} [args.user] - L'ID de l'utilisateur à qui envoyer le formulaire.
	 * @param {string} [args.castnbr] - Le numéro du caster (1 ou 2).
	 * @returns {Promise<string>} Un message de confirmation ou d'erreur.
	 */
	async methode(args = {}) {
		const discordUser = this.bot.users.cache.get(args.user) || this.user;
		const match = await this.bot.olympe.api.matchs.get(args.matchid).catch();
		if (!match) return 'Match non trouvé';

		const formUrl = this.getCasterStatUrlForm(match, Number(args.castnbr||"1")-1);

		//envoyer par mp
		var msgEmbed = new EmbedBuilder()
			.setTitle('Formulaire casterStat')
			.setColor(Colors.Purple)
			.setDescription(`[**LIEN**](${formUrl})`);

		discordUser.send({ embeds: [msgEmbed] });

		return 'Un formulaire personnalisé a été envoyé par MP';
	}
}

module.exports = GetCasterStatFormCommand;
