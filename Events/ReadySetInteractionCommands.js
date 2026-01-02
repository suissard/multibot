const simultaneousRequest = require('../Tools/simultaneousRequest.js');
const Event = require('../Class/Event.js');
const BOTS = require('../Class/BOTS.js');

module.exports = class ReadySetInteractionCommands extends Event {
	static id = 'setInteractionCommands';
	static listener = 'clientReady';
	static description = 'Enregistre les commandes slash en développement au démarrage du bot.';
	static narrative = "Cet événement écoute l'événement `clientReady` et parcourt les commandes configurées comme étant en développement. Pour chaque commande, il crée ou met à jour la commande slash correspondante auprès de l'API de Discord. Cela permet de tester les commandes slash sans les déployer globalement.";

	/**
	 * Gère l'événement 'clientReady' pour enregistrer les commandes slash "en développement".
	 * Pour chaque commande marquée comme étant en développement dans la configuration du bot,
	 * cette fonction appelle la méthode pour créer ou mettre à jour la commande slash
	 * auprès de l'API Discord.
	 * @todo Le système pourrait être amélioré pour gérer automatiquement toutes les commandes requises.
	 */
	async handleEvent() {
		try {
			let bot = this.bot;
			await bot.application.commands.fetch();

			for (let [commandId, Command] of BOTS.Commands.getAll()) {
				try {
					if (bot.commandInDev.includes(commandId) || bot.commandInDev[0] == 'all')
						await new Command(bot).createSlashCommand(); // ! creation de command limité a 200 par jours
					//TODO generer automatiquement les slashCommands requise
				} catch (e) {
					console.error(e);
				}
			}

			// console.log(
			// 	`🤖 ${bot.name} slashCommands : ${
			// 		bot.application.commands.cache.size
			// 			? bot.application.commands.cache.map((cmd) => cmd.name).join(", ")
			// 			: "aucunes"
			// 	}`
			// );
		} catch (err) {
			this.handleError(err);
		}
	}
};

// //EVITER PLUSIEURS COMMANDES ou obsolotes
// bot.on("ready", async () => {
// 	let listeSlashCommand = []
// 	for (let [commandId, Command] of BOTS.Commands.getAll()){
// 		listeSlashCommand.append(Command)
// 	}
// 	console.log(listeSlashCommand)
// 	console.log("rdy");
// 	await bot.guilds.cache.get("595557812051116052").commands.fetch();
// 	bot.guilds.cache.get("595557812051116052").commands.cache.map((command) => {
// 		command.delete();
// 	});
// 	for (let i of listeSlashCommand) {
// 		bot.guilds.cache.get("595557812051116052").commands.create(i);
// 	}
// });
