module.exports = {
	method: 'GET',
	path: '/bots',
	handler: async (req, res, bot, user, app) => {
		const bots = [];
		for (const [id, botInstance] of app.BOTS) {
			// botInstance.data likely holds config. botInstance.user likely holds Discord user if ready
			const name = botInstance.user ? botInstance.user.username : (botInstance.data && botInstance.data.name ? botInstance.data.name : 'Unknown');
			bots.push({
				id: id,
				name: name,
				avatar: botInstance.user ? botInstance.user.displayAvatarURL() : null
			});
		}
		return bots;
	},
};
