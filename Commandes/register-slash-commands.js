const Command = require('../Class/Command.js');
const BOTS = require('../Class/BOTS.js');

module.exports = class RegisterSlashCommands extends Command {
	static id = 'register-slash-commands';
	static devBoss = true;
	static home = false;
	static userPermissions = [];
	static botPermissions = [];
	static description = 'Registers slash commands with Discord.';
	static help = true;
	static howTo = 'PREFIXCMD [command_name]';
	static test = [];
	static arguments = [
		{
			type: 'STRING',
			name: 'command_name',
			description: 'The name of the command to register. If not provided, all commands will be registered.',
			required: false,
		},
	];

	static narrative = `
- This command forces the creation or update of a specific slash command (interaction command) with the Discord API.
- It is a useful development/administration tool if a command did not register correctly at bot startup.
- The user can provide the name of the command to create as an argument. If no command is specified, all commands will be registered.

- **How it works:**
    1. The command retrieves the list of all commands loaded by the bot.
    2. If a command name is provided, it searches for that command and calls its internal \`createSlashCommand()\` method.
    3. If no command name is provided, it iterates through all available commands and registers them.
    4. A confirmation message is returned upon success.
    5. An error message is returned if the specified command is not found.
`;

	/**
	 * Executes the command to manually (re)create one or all slash commands.
	 * Searches for a command by its name in the CommandManager and calls its \`createSlashCommand\` method
	 * to register or update it with the Discord API. If no command name is specified, it registers all commands.
	 * @param {object} args - The arguments for the command.
	 * @param {string} [args.command_name] - The name of the slash command to create.
	 * @returns {Promise<string>} A confirmation or error message.
	 */
	async methode(args = {}) {
		try {
			const bot = this.bot;
			const commandName = args.command_name;

			await bot.application.commands.fetch();

			if (commandName) {
				const CommandToRegister = BOTS.Commands.get(commandName);
				if (CommandToRegister) {
					await new CommandToRegister(bot).createSlashCommand();
					return `The command ${commandName} has been successfully created.`;
				} else {
					return `The command ${commandName} does not exist.`;
				}
			} else {
				let count = 0;
				for (const [commandId, CommandToRegister] of BOTS.Commands.getAll()) {
					try {
						await new CommandToRegister(bot).createSlashCommand();
						count++;
					} catch (e) {
						console.error(`Failed to register command ${commandId}:`, e);
					}
				}
				return `Successfully registered ${count} commands.`;
			}
		} catch (err) {
			this.handleError(err);
		}
	}
};