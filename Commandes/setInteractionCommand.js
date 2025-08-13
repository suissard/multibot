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
