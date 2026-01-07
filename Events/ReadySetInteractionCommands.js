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
			let localCommands = [];

			// 1. Récupérer toutes les commandes locales "valides"
			for (let [commandId, Command] of BOTS.Commands.getAll()) {
				try {
					if (bot.unauthorizedCommands.includes(commandId)) continue;
					let cmdInstance = new Command(bot);
					let slashCommand = await cmdInstance.getSlashCommandBuilder();
					localCommands.push(slashCommand.toJSON());
				} catch (e) {
					console.error(`Erreur lors de la préparation de la commande ${commandId} :`, e);
				}
			}

			// 2. Fetcher les commandes distantes
			const remoteCommands = await bot.application.commands.fetch();

			// 3. Comparer et agir
			let created = 0, updated = 0, deleted = 0;

			// a. Création et Mise à jour
			for (const localCmd of localCommands) {
				const remoteCmd = remoteCommands.find(cmd => cmd.name === localCmd.name);

				if (!remoteCmd) {
					// Créer
					await bot.application.commands.create(localCmd);
					created++;
				} else {
					// Comparer
					if (this.isCommandDifferent(localCmd, remoteCmd)) {
						await bot.application.commands.edit(remoteCmd.id, localCmd);
						updated++;
					}
				}
			}

			// b. Suppression (Commandes distantes qui ne sont pas dans les locales)
			for (const [id, remoteCmd] of remoteCommands) {
				if (!localCommands.find(cmd => cmd.name === remoteCmd.name)) {
					await remoteCmd.delete();
					deleted++;
				}
			}

			if (created + updated + deleted > 0) {
				bot.log(
					`Synchronisation terminée : ${created} créées, ${updated} mises à jour, ${deleted} supprimées.`,
					"SlashCommand"
				);
			} else {
				bot.log("Aucune modification de commande nécessaire.", "SlashCommand");
			}

		} catch (err) {
			this.handleError(err);
		}
	}

	/**
	 * Compare une commande locale (JSON builder) avec une commande distante (API Discord).
	 * Retourne true si elles sont différentes.
	 */
	isCommandDifferent(local, remote) {
		if (local.description !== remote.description) return true;
		
		// Comparaison des options (simplifiée mais robuste pour la plupart des cas)
		const localopts = local.options || [];
		const remoteopts = remote.options || [];

		if (localopts.length !== remoteopts.length) return true;

		for (let i = 0; i < localopts.length; i++) {
			const lOpt = localopts[i];
			const rOpt = remoteopts.find(opt => opt.name === lOpt.name);

			if (!rOpt) return true; // Option manquante
			if (lOpt.description !== rOpt.description) return true;
			if (!!lOpt.required !== !!rOpt.required) return true; // Comparaison boolean safe
			
			// Le type peut être différent selon la version (int vs string), discord.js v14 utilise des entiers
			// On suppose que si le nom et la description sont pareils, c'est bon, sinon on peut affiner
		}

		return false;
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
