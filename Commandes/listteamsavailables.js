const Command = require('../Class/Command.js');

module.exports = class Ping extends Command {
    static id = 'listteamsavailables';
    static devBoss = false;
    static home = false;
    static userPermissions = [];
    static botPermissions = [];
    static description = 'Répond pong';
    static help = true;
    static howTo = 'PREFIXCMD';
    static test = [{ options: [{ name: 'texte', value: 'test de Ping' }] }];
    static arguments = [
        {
            type: 'STRING',
            name: 'texte',
            description: 'Texte à envoyer',
            required: false,
        },
        {
            type: 'USER',
            name: 'user',
            description: 'Mentionner un user à ping',
            required: false,
        },
    ];

    /**
     * Exécute la commande.
     * @todo Le contenu de cette commande semble être une copie de la commande 'ping' et ne correspond pas au nom du fichier 'listteamsavailables'. Le code correct est probablement dans le bloc commenté en dessous.
     * @param {object} args - Les arguments de la commande.
     * @param {string} [args.user] - L'ID de l'utilisateur à mentionner.
     * @param {string} [args.texte] - Le texte à inclure dans la réponse.
     * @returns {string} La réponse de la commande.
     */
    methode(args = {}) {
        let result = 'Pong : ';
        if (Object.keys(args).length == 0) {
            result = 'Pong';
        }
        if (args.user) result += '<@' + args.user + '> ';
        if (args.texte) result += args.texte;

        return result;
    }
};


// const Command = require("../Class/Command.js");

// //Token d'utilisateur random (aucun droits nécessaires)
// // const config = require("../../Data/config.json");
// // const olympeToken = config.autoRole.olympeToken;
// // const olympeDomain = config.autoRole.olympeDomain; //Domain ou est hebergé l'api olympe

// // const OlympeLink = require("../../Fonctions/autoRole.js");


// module.exports = class Ping extends Command {
// 	static id = "listteamavailables";
// 	static devBoss = false;
// 	static home = false;
// 	static userPermissions = [];
// 	static botPermissions = [];
// 	static description = "Renvoie la liste des teams disponibles pour un challenge donnée";
// 	static help = true;
// 	static howTo = "PREFIXCMD";
// 	static test = [{ options: [{ name: "challengeID", value: 26 }] }];
// 	static arguments = [
// 		{
// 			type: "INTEGER",
// 			name: "challengeID",
// 			description: "Id de challenge",
// 			required: false,
// 		}
// 	];

// 	methode(args = {}) {
// 		let challengeID = args.challengeID;
// 		let olympe = new OlympeLink(olympeDomain, olympeToken);
// 		if (!challengeID) {
// 			let challenges = await olympe.loadChallenges(),
// 				msgChallengeID = "";
// 			for (let [id, challenge] of challenges) {
// 				msgChallengeID += `\n**${challenge.id}** : ${challenge.name}`;
// 			}
// 			return message.channel.send(
// 				"Veuillez entrer un id de challenge :" + msgChallengeID
// 			);
// 		}
// 		let listTeam = await olympe.getListTeamNameAvailable(challengeID);

// 		let response = ` --- START challenge n°${challengeID} ---\n`;
// 		while (listTeam.length > 0) {
// 			if (String(response + listTeam[0] + "\n --- END --- ").length >= 2000) {
// 				await message.channel.send(response);
// 				response = "";
// 			}

// 			response += listTeam.shift() + "\n";
// 		}

// 		message.channel.send(response + "\n --- END --- ");
// 	}
// };