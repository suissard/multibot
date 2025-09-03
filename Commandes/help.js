const Commande = require('../Class/Command.js');
const Discord = require('discord.js');
const BOTS = require('../Class/BOTS.js');

module.exports =
    class Help extends Commande {

        static id = 'help';
        static devBoss = false;
        static home = true;
        static userPermissions = [];
        static botPermissions = [];
        static description = 'Permet d\'obtenir le détail des commandes';
        static help = false;
        static howTo = 'Va renvoyer la liste des commandes avec leur définition. Cette liste peut etre filtré avec des mot clef :\n▫ invisible : pour voir les commandes n\'apparaissant pas traditionnellement\n▫ devboss : pour voir les commandes réservés aux developpeurs';
        static test = [];


        /**
         * Construit et retourne une liste de noms de commandes à afficher.
         * Filtre les commandes qui ne sont pas censées être affichées dans l'aide, sauf pour les développeurs.
         * @returns {Array<string>} Un tableau trié des noms de commandes.
         */
        helpArray() {
            var arrayHelp = [];
            console.log('All commands in BOTS.Commands:');
            console.log(BOTS.Commands.getAll());
            for (let i of BOTS.Commands.getAll()) {
                // if (i[1].help == false && !this.bot.dev.includes(this.message.author.id)) continue;
                arrayHelp.push(i[0]);
            }
            return arrayHelp.sort();
        }

        /**
         * Crée un ou plusieurs `EmbedBuilder` à partir d'une liste de noms de commandes.
         * Sépare les commandes en plusieurs embeds si la liste dépasse 20 champs.
		 * @TODO La méthode `addField` est dépréciée et devrait être remplacée par `addFields`. Le code actuel est probablement cassé.
         * @param {Array<string>} arrayHelp - Un tableau contenant les noms des commandes à afficher.
         * @returns {Array<Discord.EmbedBuilder>} Un tableau d'objets EmbedBuilder prêts à être envoyés.
         */
        helpEmbed(arrayHelp) {
            // decoupe les commandes en groupe de 25
            var embed = new Discord.EmbedBuilder(), fullHelp = [], max = arrayHelp.length, returnEmbed = [];
            for (let x = 0; x < max; x++) if (x % 25 == 0) fullHelp.push(arrayHelp.splice(0, 25));
            fullHelp.push(arrayHelp);

            for (var x in fullHelp) {
                for (var y in fullHelp[x]) {
                    let cmd = BOTS.Commands.get(fullHelp[x][y]);

                    embed.addFields({name: `${cmd.id.toUpperCase()} ${!cmd.help ? '*' : ''}`, value: cmd.description});
                    if (embed.data.fields.length == 20) {
                        returnEmbed.push(embed);
                        embed = new Discord.EmbedBuilder();
                    }
                }
            }
            if (embed.data.fields && embed.data.fields.length > 0) returnEmbed.push(embed);

            return returnEmbed;
        }

        /**
         * Crée un `EmbedBuilder` pour afficher l'aide détaillée d'une commande spécifique.
         * @param {string} command - Le nom de la commande pour laquelle afficher les détails.
         * @returns {Discord.EmbedBuilder} Un objet EmbedBuilder avec les détails de la commande.
         */
        detailHelpEmbed(command) {
            let cmd = BOTS.Commands.get(command);
            return new Discord.EmbedBuilder()
                .setTitle('Commande : ' + command.toUpperCase())
                .setDescription(cmd.description + '\n' + cmd.howTo.replace('PREFIX', this.bot.prefix).replace('CMD', command));
        }

        /**
         * Exécute la commande d'aide.
         * Affiche l'aide détaillée si un nom de commande est fourni, sinon affiche la liste de toutes les commandes.
		 * @param {object} options - Les options de l'interaction (non utilisé ici, semble basé sur un ancien système d'args).
         */
        methode(options) {
            if (BOTS.Commands.get(options.interaction.options.getString('command'))) return this.answerToUser(this.detailHelpEmbed(options.interaction.options.getString('command')));

            let allEmbed = this.helpEmbed(this.helpArray());
            for (let i in allEmbed) this.answerToUser(allEmbed[i].setTitle(`Liste des commandes`));
        }
    };