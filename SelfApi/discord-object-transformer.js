/**
 * Transpose les arguments d'une requête API en objets Discord.
 * @param {object} args - Les arguments de la requête.
 * @param {import('../Class/Command.js')} command - La commande à exécuter.
 * @param {import('../Class/Bot.js')} bot - L'instance du bot.
 * @returns {Promise<object>} Les arguments transposés.
 */
async function transformApiArgsToDiscordObjects(args, command, bot) {
	const transformedArgs = {};

	if (!command.arguments) return args;

	for (const argDef of command.arguments) {
		const argValue = args[argDef.name];
		if (argValue === undefined || argValue === null || argValue === '') continue;

		let transformedValue;
		switch (argDef.type) {
			case 'USER':
				transformedValue = await bot.users.fetch(argValue);
				break;
			case 'ROLE':
				const guild = await bot.guilds.fetch(bot.home);
				transformedValue = await guild.roles.fetch(argValue);
				break;
			case 'CHANNEL':
				transformedValue = await bot.channels.fetch(argValue);
				break;
			default:
				transformedValue = argValue;
				break;
		}
		transformedArgs[argDef.name] = transformedValue;
	}

	return transformedArgs;
}

module.exports = {
	transformApiArgsToDiscordObjects,
};
