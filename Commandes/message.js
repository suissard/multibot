const Commande = require('../Class/Command.js');
const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = class Message extends Commande {
    static id = 'message';
    static devBoss = false;
    static home = true;
    static userPermissions = ['BanMembers'];
    static botPermissions = [];
    static description =
        'Envoie un direct message aux membres mentionnés ou ayant un role mentionné';
    static help = true;
    static howTo =
        'Apres CMDPREFIX, indique les roles ou membres à contacter en les mentionnant, puis place un ":", Tout ce qui seras écrit apres seras le message envoyé, avec Ton nom en entete et "serveur geekinting" en signature';
    static arguments = [
        {
            type: 'STRING',
            name: 'texte',
            description: 'Message à envoyer',
            required: true,
        },
        {
            type: 'BOOLEAN',
            name: 'sendsecretary',
            description: 'Est ce que les messages envoyé doivent être envoyé au secrétariat',
            required: true,
        },
        {
            type: 'STRING',
            name: 'usersandroles',
            description: 'mention d\'utilisateurs et de roles en masse',
            required: false,
        },
        {
            type: 'USER',
            name: 'user',
            description: 'User à qui envoyer le message',
            required: false,
        },
        {
            //TODO Image marche pas
            type: 'STRING',
            name: 'imageurl',
            description: 'Ajouter une URL d\'image au message',
            required: false,
        },
        {
            type: 'ROLE',
            name: 'role',
            description: 'Envoyer un message à un role',
            required: false,
        },
    ];

    static narrative = `
- Cette commande permet d'envoyer un message privé (DM) à un ou plusieurs utilisateurs.
- Elle nécessite la permission "Bannir des membres" (\`BanMembers\`) pour être utilisée.

- **Ciblage des utilisateurs :**
    - La commande peut cibler les utilisateurs de plusieurs manières :
        1.  En mentionnant un utilisateur unique (\`user\`).
        2.  En mentionnant un rôle (\`role\`), ce qui ciblera tous les membres ayant ce rôle.
        3.  En fournissant une chaîne de texte (\`usersandroles\`) contenant plusieurs mentions d'utilisateurs et/ou de rôles.

- **Contenu du message :**
    - Le message à envoyer est fourni via l'argument \`texte\`. Les séquences spéciales comme \`\\n\` sont converties en sauts de ligne.
    - Une image peut être jointe au message en fournissant une URL via l'argument \`imageurl\`.
    - Le message est envoyé sous forme d'"embed" Discord.

- **Fonctionnement :**
    1. La commande identifie tous les utilisateurs uniques à contacter en fonction des arguments fournis.
    2. Elle construit l'embed avec le texte et l'image éventuelle.
    3. Elle parcourt la liste des utilisateurs ciblés et envoie le message privé à chacun d'eux.
    4. Une barre de chargement visuelle est affichée pendant le processus d'envoi.

- **Option Secrétariat :**
    - Si l'argument \`sendsecretary\` est défini sur \`true\`, une copie de chaque message envoyé est également transmise au module "Secretary" du bot, probablement pour archivage ou suivi.
`;

    static test = [
        {
            config: {
                botID: '1',
                guildID: '595557812051116052',
                userID: '244419544825856000',
                channelID: '668412501301657620',
            },
            options: [
                { name: 'user', value: '244419544825856000' },
                { name: 'texte', value: 'Ceci est un test' },
            ],
        },
    ];

    /**
     * Exécute la commande pour envoyer un message privé à des utilisateurs.
     * Cible les utilisateurs via une mention directe, un rôle, ou une chaîne de mentions multiples.
     * Peut également transférer le message au "secrétariat" pour archivage.
     * @param {object} args - Les arguments de la commande.
     * @param {string} args.texte - Le contenu du message à envoyer.
     * @param {boolean} args.sendsecretary - Si `true`, le message est aussi envoyé au secrétariat.
     * @param {string} [args.usersandroles] - Une chaîne de mentions d'utilisateurs et de rôles.
     * @param {string} [args.user] - L'ID d'un utilisateur unique à qui envoyer le message.
     * @param {string} [args.imageurl] - L'URL d'une image à joindre au message.
     * @param {string} [args.role] - L'ID d'un rôle dont les membres recevront le message.
     * @returns {Promise<string>} Un message de confirmation ou d'erreur.
     */
    async methode(args = {}) {
        let botAvatar = await this.bot.user.avatarURL();

        await this.guild.members.fetch();
        let listeUser = {};
        if (args.user) {
            let user = this.bot.users.cache.get(args.user);
            if (!user) {
                user = await this.bot.users.fetch(args.user).catch(_ => null);
            }
            listeUser[args.user] = user;
        } else if (args.role) {
            let role = this.guild.roles.cache.get(args.role);
            for (let [id, member] of role.members) {
                if (!listeUser[member.user.id]) {
                    listeUser[id] = member.user;
                }
            }
        } else if (args.usersandroles) {
            listeUser = await this.getUsersFromUsersAndRolesString(args.usersandroles);
        } else
            return '❌ Tu dois mentionner un rôle ou un utilisateur à qui envoyer le message';
        let texte = args.texte.replace(/(%%)|(\\n)/g, '\n'); //pour repérer les souhaits de sauts de ligne
        let embed = new EmbedBuilder()
            .setThumbnail(botAvatar)
            .setDescription(texte)
        // .setFooter("Vous avez été contacté car vous possédez le role j'aime les events"); // TODO manque pk le message a été envoyé dinamyquement: mention spécial ou a travers un role

        if (args.imageurl) {
            embed.setImage(args.imageurl);
        }

        listeUser = Object.values(listeUser);
        //Envoie des messages

        await this.loading(listeUser, async (user) => {
            let message = await user.send({ embeds: [embed] });
            if (args.sendsecretary == true) {
                message.author.bot = false; //déclenche un eevenement secretary et modifie els varialb pour alimenter les channels de secretariat
                message.botAvatar = botAvatar;
                message.author.id = user.id;
                message.author.username = user.username;
                message.content = texte;
                message.fromCommandMessage = true;
                this.bot.emit('secretaryReceived', message);
            }
        });
        return 'les messages ont été envoyé';
    }

    /**
     * Extrait et retourne une liste d'objets User à partir d'une chaîne contenant des mentions d'utilisateurs et de rôles.
     * @param {string} string - La chaîne de caractères à analyser.
     * @returns {Promise<Array<import('discord.js').User>>} Une liste d'objets User uniques.
     */
    async getUsersFromUsersAndRolesString(string) {
        let listeUsers = [];

        //Récupérer les users et roles
        let usersID = string.match(/<@!*[0-9]{18}>/g);
        if (usersID) {
            usersID = usersID.map((x) => x.replace(/(<@!*)|>/g, ''));
            for (let i in usersID) {
                let user = this.bot.users.cache.get(usersID[i]);
                if (!user) user = await this.bot.users.fetch(usersID[i]).catch(_ => null);
                listeUsers.push(user);
            }
        }

        let rolesID = string.match(/<@&[0-9]{18}>/g);
        if (rolesID) {
            rolesID = rolesID.map((x) => x.replace(/(<@&)|>/g, ''));
            for (let i in rolesID) {
                let role = this.guild.roles.cache.get(rolesID[i]);
                for (let [id, member] of role.members) {
                    if (!listeUsers.find((x) => x.id == member.id)) listeUsers.push(member.user);
                }
            }
        }
        return listeUsers;
    }
};