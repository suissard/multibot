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

	static narrative = `
- Cette commande a pour but de générer et d'envoyer un lien vers un formulaire pré-rempli pour que les casters (diffuseurs) puissent soumettre leurs statistiques après un match.
- Elle nécessite l'ID du match concerné.

- **Fonctionnement :**
    1.  La commande prend en argument l'ID d'un match (\`matchid\`). Elle peut aussi prendre en option un utilisateur cible et un numéro de caster (1 ou 2).
    2.  Elle interroge l'API Olympe pour récupérer toutes les informations du match correspondant à l'ID fourni.
    3.  Si le match est trouvé, elle utilise une URL de base de formulaire (probablement Google Forms) et la personnalise en pré-remplissant plusieurs champs avec les données du match :
        - ID du match, date, nom des équipes, nom de la division, lien de la chaîne Twitch, etc.
    4.  Elle identifie l'utilisateur à qui envoyer le formulaire (l'utilisateur mentionné ou l'auteur de la commande).
    5.  Elle crée un message "embed" contenant le lien vers le formulaire pré-rempli.
    6.  Elle envoie cet embed en message privé (DM) à l'utilisateur cible.
    7.  Si le match n'est pas trouvé, elle renvoie un message d'erreur.
`;

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
