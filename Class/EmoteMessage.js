const { StrapiObject } = require('suissard-strapi-client');
const Discord = require('discord.js');

module.exports =
	/**
	 * Object de team
	 */
	class EmoteMessage extends StrapiObject {
		constructor(id, type, data, collection, bots) {
			super(id, type, data, collection);
			this.bots = bots;
		}

		/**
		 * XEKKO cette fonction est crucial et devrait etre déclenché par le manager au niveau de .add. Il va egalement falloir la réécrire et la tester car je n'y ai rien fait depuis un moment
		 * Fonction qui verifie qu'un bot a acces a la guild/channel/message & roles qui sont renseigné, dans le cas contraire, renvoie une erreur
		 * Va egalement charger els emote au format emote et en emettre une sur le message
		 * @returns
		 */
		async set() {
			try {
				// Verifier l'acces a la guild, channel et message en fonciton des bots
				// déterminer le bot qui va gerer cette emoteMessage
				let dataFromBot = await this.bots.checkBotsAccess(
					this.guild.Guild,
					this.channel.Channel,
					this.message.Message
				);

				// Priorité au bot home
				let data =
					dataFromBot.find((d) => d.bot.home == d.message.guild.id) || dataFromBot[0];

				if (!data?.message)
					throw new Error(`No access to emoteMessage ${this.message.Message}`);

				// Verifier les roles
				this.checkRolesAccess(data.bot, data.message);

				//Poser des reactions
				this.putAllReactions(data.message);

				this.message = data.message;
				this.channel = data.channel;
				this.guild = data.guild;

				console.log(
					`✅ EmoteMessages ${this.getID()} ${
						data.message.guild.name
					} : EmoteMessages chargés`
				);
				return true;
			} catch (e) {
				console.error(e.message);
				return false;
			}
		}

		checkRolesAccess(bot, message) {
			// Verifier les roles
			for (let emote in this.emotes) {
				let roleId = this.emotes[emote].startsWith('ROLE:')
					? this.emotes[emote].replace('ROLE:', '')
					: false;
				if (!roleId) continue;
				let role = message.guild.roles.cache.get(roleId);
				if (!role)
					console.error(
						`Bot "${message.client.name}" don't find role ${roleId} in guild "${message.guild.name}"`
					);
			}
		}

		/**
		 * Reagit avec toutes les emotes sur le message fournit
		 * @param {Discord.Message} message
		 */
		async putAllReactions(message) {
			for (let emote in this.emotes) {
				let emoteObjet;
				if (emote.length >= 5) {
					//est ce qeu l'emote est définit par un id ou une emote (ex :🌶)
					emoteObjet = message.guild.emojis.cache.get(emote);
				} else {
					emoteObjet = emote;
				}
				await message.react(emoteObjet); // Mettre des emoji sur le message
			}
		}

		/**
		 * Verifie que le message correspond a l'objet
		 */
		check(message) {
			if (message.channel.id == this.channel.id && message.guild.id == this.guild.id)
				return this;
			return false;
		}

		/**
		 * L'ajout d'une emote ajoute un role qui lui correspondant
		 */
		async handleMessageReactionAdd(reaction, user) {
			let message = reaction.message;
			let emoteObjet;

			// Est ce le bot en charge
			if (this.channel.client.user.id !== reaction.client.user.id) return;

			let member = message.guild.members.cache.get(user.id);
			if (!member) member = await message.guild.members.fetch(user.id).catch((_) => null);

			//définir l'emote
			if (reaction.emoji.id) {
				emoteObjet = message.guild.emojis.cache.get(reaction.emoji.id).id;
			} else {
				emoteObjet = reaction.emoji.name;
			}

			//si pas d'entrée dans le dictionnaire de role, on arrrete
			if (!this.emotes[emoteObjet]) return;
			let roles = this.emotes[emoteObjet].replace('ROLE:', '');

			if (member.roles.cache.get(roles)) {
				user.send(
					'❔ Tu as déjà le role **' + message.guild.roles.cache.get(roles).name + '**'
				);
				return true;
			} else {
				//TODO Bug envoie du message d'attribution de rôle même si il y a une erreur
				if (
					!message.guild.members.cache
						.get(user.id)
						.roles.add(roles)
						.catch((e) => {
							user.send(
								`❌ Je n'ai pas reussi a t'attribuer ce role, previent un modérateur`
							);
							console.log(new Error(`handleMessageReactionAdd \n${e.stack}`));
						})
				) {
					return false;
				} else {
					user.send(
						'✅ Le role **' +
							message.guild.roles.cache.get(roles)?.name +
							"** t'as été attribué"
					);
					return true;
				}
			}
		}

		/**
		 * donner le role correspondant a une emote
		 */
		async handleMessageReactionRemove(reaction, user) {
			let message = reaction.message;
			let emoteObjet;

			// Est ce le bot en charge
			if (this.channel.client.user.id !== reaction.client.user.id) return;

			let member = message.guild.members.cache.get(user.id);
			if (!member) member = await message.guild.members.fetch(user.id).catch((_) => null);

			//définir l'emote
			if (reaction.emoji.id) {
				emoteObjet = message.guild.emojis.cache.get(reaction.emoji.id).id;
			} else {
				emoteObjet = reaction.emoji.name;
			}

			//si pas d'entrée dans le dictionnaire de role, on arrrete
			if (!this.emotes[emoteObjet]) return;
			let roles = this.emotes[emoteObjet].replace('ROLE:', '');

			if (!member.roles.cache.get(roles)) {
				user.send(
					"❔ Tu n'as pas le role **" + message.guild.roles.cache.get(roles).name + '**'
				);
				return true;
			} else {
				//TODO Bug envoie du message d'attribution de rôle même si il y a une erreur
				if (
					!message.guild.members.cache
						.get(user.id)
						.roles.remove(roles)
						.catch((e) => {
							bot.bigError(`handleMessageReactionAdd`, `${e.stack}`);
							user.send(
								`❌ Je n'ai pas reussi a te retirer le role ${
									message.guild.roles.cache.get(roles).name
								}, prévient un modérateur`
							);
							return false;
						})
				)
					return false;

				user.send(
					'✅ Le role **' +
						message.guild.roles.cache.get(roles).name +
						"** t'as été retiré"
				);
				return true;
			}
		}

		changeFromDB(value) {
			let decodeURIObject = function (obj, target = {}) {
				for (let i in obj) {
					let indexTarget = typeof i == 'string' ? decodeURIComponent(i) : i;
					if (obj[i] instanceof Object) target[indexTarget] = decodeURIObject(obj[i]);
					else if (typeof obj[i] == 'string')
						target[indexTarget] = decodeURIComponent(obj[i]);
					else target[indexTarget] = obj[i];
				}
				return target;
			};

			return decodeURIObject(value || this);
		}

		changeToDB(value) {
			let encodeURIObject = function (obj, target = {}) {
				for (let i in obj) {
					let indexTarget = typeof i == 'string' ? encodeURIComponent(i) : i;
					if (obj[i] instanceof Object) target[indexTarget] = encodeURIObject(obj[i]);
					else if (typeof obj[i] == 'string')
						target[indexTarget] = encodeURIComponent(obj[i]);
					else target[indexTarget] = obj[i];
				}
				return target;
			};

			return encodeURIObject(value || this);
		}
	};
