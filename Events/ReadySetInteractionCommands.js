const Event = require('../Class/Event.js');
const BOTS = require('../Class/BOTS.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const _ = require('lodash');
const Command = require('../Class/Command.js');

function areOptionsEqual(options1, options2) {
	if (!options1 && !options2) return true;
	if (!options1 || !options2) return false;
	if (options1.length !== options2.length) return false;

	for (let i = 0; i < options1.length; i++) {
		const opt1 = options1[i];
		const opt2 = options2[i];

		if (
			opt1.name !== opt2.name ||
			opt1.description !== opt2.description ||
			opt1.type !== opt2.type ||
			opt1.required !== opt2.required
		) {
			return false;
		}
	}
	return true;
}

module.exports = class ReadySetInteractionCommands extends Event {
	static id = 'setInteractionCommands';
	static listener = 'ready';
	static description = 'Enregistre les commandes slash en développement au démarrage du bot.';
	static narrative = "Cet événement écoute l'événement `ready` et synchronise les commandes slash avec Discord.";

	async handleEvent() {
		try {
			const bot = this.bot;
			await bot.application.commands.fetch();
			const discordCommands = bot.application.commands.cache;
			const localCommands = BOTS.Commands.getAll();

			const localCommandsData = new Map();

			for (const [commandId, LocalCommand] of localCommands) {
				if (!(LocalCommand.prototype instanceof Command)) continue;

				const commandInstance = new LocalCommand(bot);
				const slashCommand = new SlashCommandBuilder()
					.setName(commandInstance.id)
					.setDescription(commandInstance.description);

				if (commandInstance.arguments) {
					for (const argument of commandInstance.arguments) {
						await commandInstance.setOption(slashCommand, argument);
					}
				}
				localCommandsData.set(commandInstance.id, slashCommand.toJSON());
			}

			const discordCommandsFormatted = new Map();
			for (const [id, cmd] of discordCommands) {
				discordCommandsFormatted.set(cmd.name, {
					id: cmd.id,
					name: cmd.name,
					description: cmd.description,
					options: cmd.options,
				});
			}

			// Sync commands
			for (const [name, localCommandData] of localCommandsData) {
				const discordCommand = discordCommandsFormatted.get(name);

				if (discordCommand) {
					// Command exists, check for updates
					const optionsEqual = areOptionsEqual(
						discordCommand.options,
						localCommandData.options
					);
					if (
						discordCommand.description !== localCommandData.description ||
						!optionsEqual
					) {
						console.log(`[${bot.name}] Updating slash command "${name}"`);
						await bot.application.commands.edit(discordCommand.id, localCommandData);
					}
					discordCommandsFormatted.delete(name); // Remove from map to track remaining commands
				} else {
					// Command doesn't exist, create it
					console.log(`[${bot.name}] Creating slash command "${name}"`);
					await bot.application.commands.create(localCommandData);
				}
			}

			// Delete old commands
			for (const [name, discordCommand] of discordCommandsFormatted) {
				console.log(`[${bot.name}] Deleting slash command "${name}"`);
				await bot.application.commands.delete(discordCommand.id);
			}

			console.log(`[${bot.name}] Slash commands synchronized.`);
		} catch (err) {
			this.handleError(err);
		}
	}
};
