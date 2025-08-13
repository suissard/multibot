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
         * Renvoie toute les nom de commandes désirées dans un array
         * @param {Boolean} devBoss Veut ton voir les help devBoss true = oui
         * @param {Boolean} help Veut on voir les help normalement dissimulé true = oui
         * @param {String} category Quel catégorie de commande souhaite-on voir
         */
        helpArray() {
            var arrayHelp = [];
            for (let i of BOTS.Commands.getAll()) {
                if (i[1].help == false && !this.bot.dev.includes(this.message.author.id)) continue;
                arrayHelp.push(i[0]);
            }
            return arrayHelp.sort();
        }

        /**
         *Renvoie un array contenant des messageEmbeds par paquet de 25 fields
         * @param {array} arrayHelp Array contenant tout les noms de commande a transposer au format Message.RichEmbed
         */
        helpEmbed(arrayHelp) {
            // decoupe les commandes en groupe de 25
            var embed = new Discord.EmbedBuilder(), fullHelp = [], max = arrayHelp.length, returnEmbed = [];
            for (let x = 0; x < max; x++) if (x % 25 == 0) fullHelp.push(arrayHelp.splice(0, 25));
            fullHelp.push(arrayHelp);

            for (var x in fullHelp) {
                for (var y in fullHelp[x]) {
                    let cmd = BOTS.Commands.get(fullHelp[x][y]);

                    embed.addField(`${cmd.id.toUpperCase()} ${!cmd.help ? '*' : ''}`, cmd.description);
                    if (embed.fields.length == 20) {
                        returnEmbed.push(embed);
                        embed = new Discord.EmbedBuilder();
                    }
                }
            }
            if (embed.fields.length > 0) returnEmbed.push(embed);

            return returnEmbed;
        }

        detailHelpEmbed(command) {
            let cmd = BOTS.Commands.get(command);
            return new Discord.EmbedBuilder()
                .setTitle('Commande : ' + command.toUpperCase())
                .setDescription(cmd.description + '\n' + cmd.howTo.replace('PREFIX', this.bot.prefix).replace('CMD', command));
        }

        methode() {
            if (Commands.get(this.args[0])) return this.answerToUser(this.detailHelpEmbed(this.args[0]));

            let allEmbed = this.helpEmbed(this.helpArray());
            for (let i in allEmbed) this.answerToUser(allEmbed[i].setTitle(`Liste des commandes`));
        }
    };