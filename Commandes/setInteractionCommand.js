const Command = require('../Class/Command.js');
const BOTS = require('../Class/BOTS.js');

module.exports = class Done extends Command {
	static id = 'createslashcommands';
	static devBoss = false;
	static home = false;
	static userPermissions = [];
	static botPermissions = [];
	static description = 'Donne le nombre de channel du serveur';
	static help = true;
	static howTo = 'PREFIXCMD';
	static test = [];
	static arguments = [
		{
			type: 'STRING',
			name: 'commandename',
			description: 'Nom de la commande a créer',
			required: true,
		},
	];

	static narrative = `
- Cette commande permet de forcer la création ou la mise à jour d'une commande slash (commande d'interaction) spécifique auprès de l'API de Discord.
- C'est un outil de développement/administration utile si une commande ne s'est pas enregistrée correctement au démarrage du bot.
- L'utilisateur doit fournir le nom de la commande à créer en argument.

- **Fonctionnement :**
    1.  La commande récupère la liste de toutes les commandes chargées par le bot.
    2.  Elle parcourt cette liste pour trouver la commande dont le nom (ID) correspond à celui fourni en argument.
    3.  Une fois la commande trouvée, elle instancie cette commande et appelle sa méthode interne \`createSlashCommand()\`. Cette méthode est responsable de l'envoi de la requête à l'API de Discord pour enregistrer la structure de la commande (nom, description, arguments).
    4.  Si la commande est créée avec succès, un message de confirmation est renvoyé.
    5.  Si aucune commande correspondant au nom fourni n'est trouvée, un message d'erreur est renvoyé.
`;

	/**
	 * Exécute la commande pour (re)créer manuellement une commande slash.
	 * Cherche une commande par son nom dans le CommandManager et appelle sa méthode `createSlashCommand`
	 * pour l'enregistrer ou la mettre à jour auprès de l'API Discord.
	 * @param {object} args - Les arguments de la commande.
	 * @param {string} args.commandename - Le nom de la commande slash à créer.
	 * @returns {Promise<string>} Un message de confirmation ou d'erreur.
	 */
	async methode(args = {}) {
		try {
			let bot = this.bot;
			let commandName;
			await bot.application.commands.fetch();
			let i = 0;
			for (let y in args) i++;
			if (i == 0) commandName = 'createslashcommands';
			else commandName = args.commandename;
			for (let [commandId, Command] of BOTS.Commands.getAll()) {
				try {
					if (commandId == args.commandename) {
						await new Command(bot).createSlashCommand();
						return `La commande ${args.commandename} a bien été créée`;
					}
				} catch (e) {
					console.error(e);
				}
			}
			return `La commande ${args.commandename} n'existe pas`;
		} catch (err) {
			this.handleError(err);
		}
	}
};
