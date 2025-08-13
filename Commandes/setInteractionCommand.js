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
