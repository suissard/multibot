const Commande = require('../../../Class/Command');
const { removeUserFromChannel } = require('../../../services/discordService');

class RemoveUserFromChannel extends Commande {
	static id = 'removeuserfromchannel';
	static devBoss = false;
	static home = false;
	static userPermissions = ['ManageChannels'];
	static botPermissions = [];
	static description = 'Remove a user from a channel';
	static howTo = 'PREFIXCMD';
	static test = [];
	static arguments = [
		{
			type: 'CHANNEL',
			name: 'channel',
			description: 'The channel to remove the users from',
			required: true,
		},
		{
			type: 'USER',
			name: 'user1',
			description: 'The user to remove',
			required: true,
		},
		{
			type: 'USER',
			name: 'user2',
			description: 'The user to remove',
			required: false,
		},
		{
			type: 'USER',
			name: 'user3',
			description: 'The user to remove',
			required: false,
		},
	];

	static narrative = `
- **ATTENTION : Cette commande est actuellement désactivée (le \`module.exports\` est en commentaire).**
- L'objectif de cette commande est de retirer l'accès à un salon spécifique pour un à trois utilisateurs.
- Elle nécessite la permission "Gérer les salons" (\`ManageChannels\`).

- **Fonctionnement :**
    1.  La commande prend en argument un nom de salon (\`channel\`) et au moins un utilisateur (\`user1\`).
    2.  Elle recherche le salon sur le serveur en se basant sur son **nom**, ce qui peut être source d'erreurs si plusieurs salons ont le même nom.
    3.  Elle parcourt la liste des utilisateurs fournis en argument.
    4.  Pour chaque utilisateur, elle appelle la fonction \`removeUserFromChannel\` du service Discord, qui supprime les permissions spécifiques de l'utilisateur sur ce salon, lui en retirant de fait l'accès.
    5.  Une fois tous les utilisateurs traités, elle renvoie un message de confirmation.
`;

	/**
	 * Exécute la commande pour retirer un ou plusieurs utilisateurs d'un salon.
	 * @param {object} args - Les arguments de la commande.
	 * @param {string} args.channel - Le nom du salon.
	 * @param {string} args.user1 - L'ID du premier utilisateur à retirer.
	 * @param {string} [args.user2] - L'ID du deuxième utilisateur à retirer.
	 * @param {string} [args.user3] - L'ID du troisième utilisateur à retirer.
	 * @returns {string} Un message de confirmation ou d'erreur.
	 * @todo Le `module.exports` est commenté, rendant cette commande inactive. La recherche de salon se fait par nom (`channel.name`) et non par ID, ce qui peut être ambigu.
	 */
	methode(args) {
		const channelName = args.channel;
		const channel = this.guild.channels.cache.find(
			(channel) => channel.name === channelName,
		);
		const users = ['user1', 'user2', 'user3']
			.map((option) => args[option])
			.filter((user) => user !== null);

		try {
			for (const user of users) {
				removeUserFromChannel(channel, user);
			}
			return `Users have been removed from the channel ${channel.name}.`;
		} catch (error) {
			console.error('Error removing users from channel:', error);
			return 'There was an error while removing the users from the channel.';
		}
	}
}

//module.exports = RemoveUserFromChannel;
