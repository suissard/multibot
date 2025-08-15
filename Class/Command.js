const Discord = require('discord.js');
const {
	SlashCommandBuilder,
	SlashCommandStringOption,
	SlashCommandIntegerOption,
	SlashCommandNumberOption,
	SlashCommandBooleanOption,
	SlashCommandUserOption,
	SlashCommandChannelOption,
	SlashCommandRoleOption,
	SlashCommandMentionableOption,
	SlashCommandAttachmentOption,
} = require('@discordjs/builders');
const BOTS = require('../Class/BOTS.js');
const Bot = require('./Bot.js');

const simultaneousRequest = require('../Tools/simultaneousRequest.js');

module.exports = class Commande {
	/**
	 * @property {string} id - L'identifiant unique de la commande.
	 * @property {boolean} [devBoss=false] - Si `true`, la commande ne peut être utilisée que par le développeur du bot.
	 * @property {boolean} [home=false] - Si `true`, la commande ne peut être utilisée que sur le serveur "home" du bot.
	 * @property {Array<import('discord.js').PermissionResolvable>} [userPermissions=[]] - Permissions requises pour l'utilisateur.
	 * @property {Array<import('discord.js').PermissionResolvable>} [botPermissions=[]] - Permissions requises pour le bot.
	 * @property {string} description - Une courte description de ce que fait la commande.
	 * @property {boolean} [help=true] - Si `true`, la commande est affichée dans la commande d'aide. Déprécié.
	 * @property {string} [howTo] - Instructions sur la façon d'utiliser la commande.
	 * @property {Array<object>} [test] - Configurations de test pour la commande.
	 * @property {Array<object>} [arguments] - Les arguments que la commande accepte.
	 */
	static id = undefined;
	static devBoss = undefined;
	static home = undefined;
	static userPermissions = undefined; // https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
	static botPermissions = undefined;
	static description = undefined;
	static help = undefined;
	static howTo = undefined;
	static test = undefined;
	static arguments = undefined;

	constructor(bot /*, message, args*/) {
		/**
		 * Instance du bot Discord qui initie la commande.
		 * @type {Bot}
		 */
		this.bot = bot;

		/**
		 * Serveur (guild) où la commande est exécutée.
		 * Défini lors de l'exécution, peut être `undefined` si la commande est utilisée en message privé.
		 * @type {Discord.Guild}
		 */
		this.guild = undefined;

		/**
		 * Canal où la commande est exécutée.
		 * Défini lors de l'exécution, contient le canal texte de la commande.
		 * @type {Discord.TextChannel}
		 */
		this.channel = undefined;

		/**
		 * Utilisateur discord qui a exécuté la commande.
		 * Défini lors de l'exécution, contient les informations de l'utilisateur émetteur.
		 * @type {Discord.User}
		 */
		this.user = undefined;

		/**
		 * Utilisateur au format GuildMember, en fonction du serveur ayant exécuté la commande.
		 * Défini si la commande est utilisée dans un serveur, peut être `undefined` en message privé.
		 * @type {Discord.GuildMember}
		 */
		this.member = undefined;

		/**
		 * Indique si la commande est en phase de test.
		 * Utilisé pour activer certaines conditions spécifiques de test.
		 * @type {boolean}
		 * @default false
		 */
		this.isAtest = false;

		// Récupération des propriétés statiques définies pour cette commande en tant que propriétés d'instance.

		/**
		 * Identifiant unique de la commande.
		 * @type {string}
		 */
		this.id = this.constructor.id;

		/**
		 * Indique si la commande est réservée à l'administrateur principal (devBoss).
		 * @type {boolean}
		 */
		this.devBoss = this.constructor.devBoss;

		/**
		 * Identifiant du serveur de base (home) pour la commande.
		 * Utilisé pour limiter l'exécution de la commande à un serveur spécifique.
		 * @type {string}
		 */
		this.home = this.constructor.home;

		/**
		 * Permissions nécessaires pour que l'utilisateur puisse exécuter la commande.
		 * Tableau des permissions Discord requises.
		 * @type {Array<String>}
		 */
		this.userPermissions = this.constructor.userPermissions;

		/**
		 * Permissions nécessaires pour que le bot puisse exécuter la commande.
		 * Tableau des permissions Discord requises.
		 * @type {Array<String>}
		 */
		this.botPermissions = this.constructor.botPermissions;

		/**
		 * Description de la commande, utilisée pour afficher des informations aux utilisateurs.
		 * @type {String}
		 */
		this.description = this.constructor.description;

		/**
		 * ! Variable deprécié avec l'instauration des interactions
		 * Est ce qeu la commande apparait dans la commande help.
		 * Contient des instructions ou des conseils.
		 * @type {Boolean}
		 */
		this.help = this.constructor.help;

		/**
		 * Instructions sur la façon d'utiliser la commande.
		 * Donne des exemples d'utilisation ou des arguments acceptés.
		 * @type {string}
		 */
		this.howTo = this.constructor.howTo;

		/**
		 * Quel element pour tester cette commande via la fonction "testProcess"
		 * @type {Array<Object>}
		 */
		this.test = this.constructor.test;

		/**
		 * Liste des arguments pour exécuter la commande.
		 * @type {Array<Object>}
		 */
		this.arguments = this.constructor.arguments;
	}

	/**
	 * Renvoie un object compactible avec la base de donnée strapi
	 * @returns {Object}
	 */
	static databasify() {
		return {
			_id: this.id,
			devBoss: this.devBoss,
			home: this.home,
			userPermissions: this.userPermissions,
			botPermissions: this.botPermissions,
			description: this.description,
			help: this.help,
			howTo: this.howTo,
			arguments: this.arguments,
		};
	}

	/**
	 * Methode de lancement de la commande via un message
	 * @param {Discord.Message} message
	 */
	async handleMessage(message) {
		this.setCommunicationData(message.guild, message.channel, message.user, message.member);
		try {
			this.log(message);
			this.checkPermission(message.member, message.guild); //Renvoie une erreur en cas de permission inssufisante

			//Lancement de la commande
			message.channel.sendTyping();
			let result = await this.methode();

			message.react('✅');
			return result;
		} catch (e) {
			this.handleError(e);
		}
	}

	/**
	 * Methode de lancement de la commande via une interaction
	 * @param {Discord.Interaction} interaction
	 */
	async handleInteraction(interaction) {
		this.setCommunicationData(
			interaction.guild,
			interaction.channel,
			interaction.user,
			interaction.member
		);
		try {
			this.log(interaction);
			this.checkPermission(interaction.member, interaction.guild); //Renvoie une erreur en cas de permission inssufisante

			//Treanspose els option sous forme d'objet
			let options = {
				interaction: interaction,
			};
			for (let i in interaction.options.data)
				options[interaction.options.data[i].name] = interaction.options.data[i].value;

			let response = await this.methode(options);
			if (!interaction.isRepliable()) return this.answerToUser(response);
			if (response?.data) {
				interaction
					.reply({ embeds: [response], ephemeral: false })
					.catch((e) => this.handleError(e));
			} else {
				interaction
					.reply({ content: response ? response : '✅ Done', ephemeral: false })
					.catch((e) => this.handleError(e));
			}
			return response;
		} catch (e) {
			this.handleError(e);
		}
	}

	/**
	 * Methode de lancement de la commande via l'api
	 * @param {*} req
	 * @param {*} res
	 * @param {Object} user
	 * @returns
	 */
	async handleApiRequest(req, res, user, app) {
		const guild = this.bot.guilds.cache.get(this.bot.home);
		const member = guild.members.cache.get(user.id);
		this.setCommunicationData(
			guild,
			user, // envoie directement les réponses de commande en mp
			user,
			member
		);
		try {
			this.log({ user, guild, channel: user, id: 'api' });
			this.checkPermission(member, guild); //Renvoie une erreur en cas de permission inssufisante

			//Lancement de la commande
			const args = await app.convertApiBadyToDiscordObject(req, this);
			let result = await this.methode(args);

			// res.status(200).json({result});
			return result;
		} catch (e) {
			this.handleError(e);
		}
	}

	/**
	 * Function lancé par handleMessage, handleApiRequest et handleInteraction
	 * @param {Object} args Argument de la méthode au format objet {name:value}
	 */
	methode(args) {
		throw new Error("La methode n'est pas implementée/surchargée");
	}

	/**
	 * Définit les elements pour communiquer avec l'utilisateur
	 * @param {Discord.Guild} guild
	 * @param {Discord.Channel} channel
	 * @param {Discord.User} user
	 * @param {Discord.GuildMember} member
	 */
	setCommunicationData(guild, channel, user, member) {
		this.guild = guild;
		this.channel = channel;
		this.user = user;
		this.member = member;
	}

	/**
	 * Verification des permissions pour l'usage de la commande
	 * @param {Discord.GuildMember} member
	 * @param {Discord.Guild} guild
	 * @returns
	 */
	checkPermission(member, guild) {
		if (!member) throw Error('Impossible de trouver le membre');
		if (member.user.discriminator == '0000') return true; //Acceptent les webhooks, qui ont un discriminator a 0000

		// Si l'auteur du message est le devboss, pas besoin de plus d'autorisation
		if (this.bot.ownerId == member.user.id) return true;

		// dev autorisation
		if (this.devBoss) throw Error(`Permissions insuffisantes :\nIl faut être le developpeur`);

		// Home autorisation
		if (this.home && guild.id != this.bot.home)
			throw Error(
				`Permissions insuffisantes :\nCette commande est réservé au serveur **${
					this.bot.guilds.cache.get(this.bot.home).name
				}**`
			);

		// Est ce que l'utilisateur à les permissions requises
		if (!member.permissions.has(this.userPermissions))
			throw Error(
				`Permissions insuffisantes :\nIl faut :\`\`\`${this.userPermissions.join(
					'\n'
				)}\`\`\``
			);

		return true;
	}

	/**
	 * Enregistre les données de log
	 * TODO adapter pour une provenance depuis l'api
	 * @param {Discord.Message} message
	 * @returns
	 */
	log(message) {
		if (this.isAtest) return console.log(`Test de la commande ${this.id.toUpperCase()}`);
		else if (!message.guild) return console.log(`Commande executé dans un channel privé`);
		else
			console.log(
				`[${this.bot.name}] Commande ${this.id.toUpperCase()} : ${
					message.user ? message.user.username : message.author.username
				} dans https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${
					message.id
				}`
			);
	}

	/**
	 * Fonction de retour à l'utilisateur ayant instancié la commande
	 * @param {String} data Donnée a envoyer a l'utilisateur
	 * @returns {Discord.Message} renvoie la promesse d'un message discord
	 */
	answerToUser(data) {
		if (!this.channel) return console.error("Impossible de répondre a l'utilisateur");
		return this.channel.send(data).catch((err) => {
			console.error(`[${this.bot.name}] Erreur d'envoie ${err}`, err);
		});
	}

	/**
	 * Affiche un message se mettant a jour en fonction de l'avancée de la commande
	 * @param {Array} liste
	 * @param {function} mapFunction Fonction a utiliser sur chaque entrée du Array fournit
	 * @param {function} errorFunc Fonction a utiliser sur les erreurs
	 */
	async loading(liste, mapFunction, errorFunc = console.error) {
		return new Promise(async (res) => {
			//N'accepte que les map
			if (!liste.length) throw this.handleError({ message: `"liste" Doit etre un array` });
			let copy = [];

			await liste.forEach((value) => copy.push(value));

			let progressSize = 30,
				updateInterval = 5000,
				emptyProgress = `**[**-${' '.repeat(progressSize)}-**]**`, //20 espaces
				msgUpdate = await this.answerToUser(
					`⏳ **Commande ${this.id.toUpperCase()} en court**\n${emptyProgress}`
				),
				numError = 0,
				num = 0,
				barreNbr = 0,
				numUpdate = progressSize / copy.length;

			if (!msgUpdate) msgUpdate = { edit: console.log };

			let requestFunction = (simultaneaous) => {
				return new Promise(async (res) => {
					let request = async () => {
						barreNbr = Math.floor(num++ * numUpdate);
						if (copy.length <= 0) return res();
						try {
							await mapFunction(copy.shift());
						} catch (e) {
							errorFunc(e);
							numError++;
						}
						return await request();
					};
					for (let i; simultaneaous > 0; simultaneaous--) request();
				});
			};

			//mettre a jour le message d'update de maniere réguliere
			let interval = setInterval(() => {
				msgUpdate.edit(
					msgUpdate.content.replace(
						/\[\*\*\-.+\-\*\*\]/,
						`[**-${'I'.repeat(barreNbr) + ' '.repeat(progressSize - barreNbr)}-**]`
					)
				);
			}, updateInterval);

			//Lancement de la boucle
			await requestFunction(5);
			clearInterval(interval);
			await msgUpdate.edit(
				`✅ **Commande ${this.id.toUpperCase()} terminée (${liste.length - numError}/${
					liste.length
				})**\n` +
					emptyProgress.replace(/ /g, 'I') +
					` et **${numError}** erreur${numError > 1 ? 's' : ''}`
			);

			res(msgUpdate);
		});
	}

	/**
	 * receptionne les erreurs issue de la commande
	 * @param {Error} error
	 * @param {boolean} [noSend=false] Envoie ou pas l'erreur a l'utilisateur
	 */
	handleError(error, noSend = false) {
		console.log(error);
		if (noSend) return;
		if (this.isAtest) return this.answerToUser(error.stack);
		//TODO Essayer de recuperer quel permissions sont requises
		if (error.message == 'Missing Permissions')
			return this.answerToUser("❌ Je n'ai pas les permissions requises");

		this.answerToUser(`❌ Une erreur a interrompue la commande :\n${error.message}`);
	}

	/**
	 * Demande confirmation par une emote, de continuer la commande
	 *TODO ! Possibilité d'uiliser le systeme de bouton discord
	 * @param {Discord.Message} message
	 * @param {String} texte
	 */
	async askConfirm(texte = '') {
		try {
			if (this.isAtest) return true; //si le message est en mode test on valide automatiquement
			let msg = await this.answerToUser(
				`Etes vous sur de vouloir continuer la commande ${this.id} ?\n*(15 secondes pour confirmer)*\n${texte}`
			);
			await msg.react('✅');
			await msg.react('❌');

			// Create a reaction collector
			let filter = (reaction, user) => user.id == this.user.id;

			await msg.awaitReactions(filter, { time: 15000 }).then(async (collected) => {
				if (collected.get('❌')) {
					await msg.edit('❌ On arrete là').then(() => msg.delete({ timeout: 10000 }));
					throw new UserError('❌ Annulation de la commande');
				} else if (collected.get('✅')) {
					await msg.edit(`✅ Commande **${this.id}** confirmé par <@${this.user.id}>`);
					return true;
				} else {
					throw new UserError('❌ Pas de confirmation, on arrete là');
				}
			});
		} catch (e) {
			throw e;
		}
	}

	/**
	 * Protocole de test de la commande afin de s'assurer de son bon fonctionnement
	 * @param {String} botID
	 * @param {String} userID
	 * @param {String} channelID
	 * @returns
	 */
	async testProcess(botID, userID, channelID) {
		if (!this.test) return 'Pas de protocole de test pour cette command';

		for (let i in this.test) {
			let test = this.test[i];

			// configs par defaut
			if (test.configs) {
				botID = botID ? botID : test.configs.botID;
				userID = userID ? userID : test.configs.userID;
				channelID = channelID ? channelID : test.configs.channelID;
			}

			// botID ? BOTS.get(botID) : this.bot,
			let bot = this.bot,
				user = userID ? await bot.users.fetch(userID).catch((_) => null) : this.user,
				channel = channelID
					? await bot.channels.fetch(channelID).catch((_) => null)
					: this.channel,
				guild = channel.guild,
				member = userID
					? await guild.members.fetch(userID).catch((_) => null)
					: this.member;

			// TODO ajuster els message pour les different type d(options)
			let interacMessage = {
				guild,
				channel,
				options: {
					data: [...test.options],
				},
				user,
				author: user,
				member,
				reply: (x) => channel.send(x.content),
				react: console.log,
			};

			let Command = BOTS.Commands.__commands.get(this.id);
			let cmd = new Command(bot);

			await cmd.createSlashCommand();
			return await cmd.handleInteraction(interacMessage);
		}
	}

	/**
	 * Permet l'integration d'une commande au format interaction (aide a l'utilisateur , definition, arguments, préremplissage et...)
	 * @returns {Discord.SlashCommandBuilder}
	 */
	async createSlashCommand() {
		let slashCommand = new SlashCommandBuilder()
			.setName(this.id)
			.setDescription(this.description);

		for (let i in this.arguments) {
			await this.setOption(slashCommand, this.arguments[i]);
		}

		let oldCmd = await this.bot.application.commands.cache.find((cmd) => cmd.name === this.id); // Suprression de l'ancienne commande
		if (oldCmd) await oldCmd.delete();

		// // Doit etre creer pour chaque guild
		// for (let guild of this.bot.guilds.cache.values()) {
		// 	await this.bot.application.commands.create(slashCommand, guild.id);
		// }
		await this.bot.application.commands.create(slashCommand);
		console.log(`[${this.bot.name}] : slashCommand "${slashCommand.name}" créée`);

		return slashCommand;
	}

	/**
	 * Enrichi une slash command avec les options de la commande
	 * @param {SlashCommandBuilder} slashCommand
	 * @param {Object} option
	 * @param {String} option.type: SUB_COMMAND, SUB_COMMAND_GROUP, STRING, INTEGER, NUMBER, BOOLEAN, USER, CHANNEL, ROLE, MENTIONABLE
	 * @param {String} option.name: Nom de l'option
	 * @param {String} option.description: Description de l'option
	 * @param {Boolean} option.required: Si l'option est requise ou non
	 * @param {Array} option.choices: Choix possible pour l'option => {name: "", value: ""}
	 * @param {Boolean} option.autocomplete: Si l'option peut être complétée automatiquement
	 * @param {Array} option.channelTypes: Types de channel autorisés pour l'option
	 ** GUILD_TEXT - a guild text channel
	 ** DM - a DM channel
	 ** GUILD_VOICE - a guild voice channel
	 ** GROUP_DM - a group DM channel
	 ** GUILD_CATEGORY - a guild category channel
	 ** GUILD_NEWS - a guild news channel
	 ** GUILD_STORE - a guild store channel
	 ** Store channels are deprecated and will be removed from Discord in March 2022. See Self-serve Game Selling Deprecation  for more information.
	 ** GUILD_NEWS_THREAD - a guild news channel's public thread channel
	 ** GUILD_PUBLIC_THREAD - a guild text channel's public thread channel
	 ** GUILD_PRIVATE_THREAD - a guild text channel's private thread channel
	 ** GUILD_STAGE_VOICE - a guild stage voice channel
	 ** UNKNOWN - a generic channel of unknown type, could be Channel or GuildChannel
	 * @param {Number} option.minValue: Valeur minimum autorisée pour l'option
	 * @param {Number} option.maxValue: Valeur maximum autorisée pour l'option
	 */
	async setOption(slashCommand, optionData) {
		// https://discord.js.org/#/docs/builders/stable/class/SlashCommandBuilder

		switch (optionData.type) {
			// SUB_COMMAND sets the option to be a subcommand
			case 'SUB_COMMAND': {
				throw new Error('SUB_COMMAND is not implemented yet');
				// slashCommand.addSubCommand(this.arguments[i].id);
			}
			// SUB_COMMAND_GROUP sets the option to be a subcommand group

			case 'SUB_COMMAND_GROUP': {
				throw new Error('SUB_COMMAND_GROUP is not implemented yet');
				// slashCommand.addSubCommandGroup(this.arguments[i].id);
			}
			// STRING sets the option to require a string value https://discord.js.org/#/docs/builders/stable/class/SlashCommandBuilder?scrollTo=addStringOption
			case 'STRING': {
				await slashCommand.addStringOption(
					this.setOptionData(new SlashCommandStringOption(), optionData)
				);
				break;
			}
			// INTEGER sets the option to require an integer value
			case 'INTEGER': {
				await slashCommand.addIntegerOption(
					this.setOptionData(new SlashCommandIntegerOption(), optionData)
				);
				break;
			}
			// NUMBER sets the option to require a decimal (also known as a floating point) value
			// case "NUMBER": {
			// 	await slashCommand.addNumberOption(
			// 		this.setOptionData(new SlashCommandIntegerOption(), optionData)
			// 	);
			// 	break;
			// }
			// BOOLEAN sets the option to require a boolean value
			case 'BOOLEAN': {
				await slashCommand.addBooleanOption(
					this.setOptionData(new SlashCommandBooleanOption(), optionData)
				);
				break;
			}
			// USER sets the option to require a user or snowflake as value
			case 'USER': {
				await slashCommand.addUserOption(
					this.setOptionData(new SlashCommandUserOption(), optionData)
				);
				break;
			}
			// CHANNEL sets the option to require a channel or snowflake as value
			case 'CHANNEL': {
				await slashCommand.addChannelOption(
					this.setOptionData(new SlashCommandChannelOption(), optionData)
				);
				break;
			}
			// ROLE sets the option to require a role or snowflake as value
			case 'ROLE': {
				await slashCommand.addRoleOption(
					this.setOptionData(new SlashCommandRoleOption(), optionData)
				);
				break;
			}
			// MENTIONABLE sets the option to require a user, role or snowflake as value
			case 'MENTIONABLE': {
				await slashCommand.addMentionableOption(
					this.setOptionData(new SlashCommandMentionableOption(), optionData)
				);
				break;
			}
			//SlashCommandAttachmentOption
			case 'ATTACHMENT': {
				await slashCommand.addAttachmentOption(
					this.setOptionData(new SlashCommandAttachmentOption(), optionData)
				);
				break;
			}
		}

		return slashCommand;
	}

	/**
	 * Ajout les données d'une option
	 * @param {*} option
	 * @param {*} optionData
	 * @returns
	 */
	setOptionData(option, optionData) {
		option.setName(optionData.name);
		option.setDescription(optionData.description);
		if (optionData.required) option.setRequired(optionData.required);
		if (optionData.choices) option.setChoices(optionData.choices);
		if (optionData.autocomplete) option.setAutocomplete(optionData.autocomplete);

		return option;
	}

	/**
	 * Permet l'enregistrement d'une commande slash (création ou mise à jour).
	 * Cette méthode vérifie si la commande existe déjà. Si c'est le cas, elle la met à jour.
	 * Sinon, elle la crée.
	 * @returns {Promise<Discord.ApplicationCommand>} La commande créée ou mise à jour.
	 */
	async editSlashCommand() {
		const slashCommand = new SlashCommandBuilder()
			.setName(this.id)
			.setDescription(this.description);

		if (this.arguments.length > 0) {
			for (const argument of this.arguments) {
				await this.setOption(slashCommand, argument);
			}
		}

		try {
			for (let guild of this.bot.guilds.cache.values()) {
				// On fetch les commandes pour être sûr d'avoir la liste à jour
				const commands = await this.bot.application.commands.fetch({ guildId: guild.id });
				const existingCommand = commands.find(
					(cmd) => cmd.name === this.id && cmd.guildId === guild.id
				);

				// La commande existe, on la met à jour (edit)
				await this.bot.application.commands.edit(
					existingCommand.id,
					slashCommand,
					guild.id
				);
			}
			this.bot.log(`La commande slash "${this.id}" a été mise à jour.`, 'slashCommand');
			return;
		} catch (error) {
			console.error(
				`[${this.bot.name}] : Erreur lors de l'enregistrement de la commande slash "${this.id}" :`,
				error
			);
			this.handleError(error);
			throw error; // Propager l'erreur
		}
	}
};
