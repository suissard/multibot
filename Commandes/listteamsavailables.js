const Command = require('../Class/Command.js');
const { getAllTeamsFromChallenge } = require('../Modules/AutoRole/utils/utils2.js');

module.exports = class ListTeamsAvailables extends Command {
	static id = 'listteamsavailables';
	static description = 'Renvoie la liste des teams disponibles pour un challenge donné';
	static userPermissions = [];
	static botPermissions = ['SEND_MESSAGES'];
	static devBoss = false;
	static home = false;
	static arguments = [
		{
			type: 'INTEGER',
			name: 'challengeid',
			description: 'ID du challenge pour lequel lister les équipes',
			required: false,
		},
	];

	static narrative = `
- Cette commande a deux modes de fonctionnement en fonction de si un 'challengeid' est fourni.

- **Mode 1 : 'challengeid' non fourni**
    - La commande interroge une API externe (via \`this.bot.olympe.api\`) pour obtenir la liste de tous les challenges disponibles.
    - Elle construit et renvoie un message listant chaque challenge avec son nom et son ID, invitant l'utilisateur à relancer la commande avec un ID spécifique.
    - En cas d'erreur ou si aucun challenge n'est trouvé, un message approprié est renvoyé.

- **Mode 2 : 'challengeid' fourni**
    - La commande utilise la fonction \`getAllTeamsFromChallenge\` pour récupérer toutes les équipes participant au challenge spécifié.
    - Elle prépare une réponse contenant la liste des noms de toutes les équipes trouvées.
    - Pour éviter de dépasser la limite de caractères de Discord (2000), elle envoie la liste en plusieurs messages si nécessaire.
    - Un message final confirme que la liste a été envoyée avec succès.
    - En cas d'erreur ou si aucune équipe n'est trouvée pour le challenge, un message d'erreur est renvoyé.
`;

	async methode(args) {
		const challengeId = args.challengeid;

		if (!this.bot.olympe || !this.bot.olympe.api) {
			return "Le module Olympe n'est pas correctement initialisé. Veuillez contacter un administrateur.";
		}

		if (!challengeId) {
			try {
				const challenges = await this.bot.olympe.api.get('challenges');
				if (!challenges || challenges.length === 0) {
					return "Aucun challenge n'a été trouvé.";
				}

				let response =
					'Veuillez spécifier un ID de challenge. Voici les challenges disponibles :\n';
				// The API returns an object with a 'challenges' property which is the array
				const challengesArray = challenges.challenges || challenges;
				for (const challenge of challengesArray) {
					response += `\n**${challenge.id}** : ${challenge.name}`;
				}
				return response;
			} catch (error) {
				console.error(error);
				return 'Une erreur est survenue en récupérant la liste des challenges.';
			}
		}

		try {
			const teams = await getAllTeamsFromChallenge(this.bot, String(challengeId));
			if (!teams || teams.length === 0) {
				return `Aucune équipe disponible trouvée pour le challenge ID ${challengeId}.`;
			}

			const teamNames = teams.map((team) => team.name);

			let response = `--- Équipes disponibles pour le challenge n°${challengeId} ---\n`;
			while (teamNames.length > 0) {
				const nextTeam = teamNames.shift();
				// Check if adding the next team exceeds the Discord message limit
				if (response.length + nextTeam.length + 1 > 2000) {
					await this.answerToUser(response);
					response = '';
				}
				response += nextTeam + '\n';
			}

			if (response) {
				await this.answerToUser(response + `\n--- Fin de la liste ---`);
			}

			return '✅ La liste des équipes a été envoyée.'; // Final confirmation message
		} catch (error) {
			console.error(error);
			return `Une erreur est survenue lors de la récupération des équipes pour le challenge ID ${challengeId}.`;
		}
	}
};
