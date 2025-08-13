const Commande = require('../Class/Command.js');
const { EmbedBuilder } = require('discord.js');
const getRandom = require('../Tools/getRandom.js');

module.exports = class Message extends Commande {
    static id = 'invite';
    static devBoss = false;
    static home = false;
    static userPermissions = [];
    static botPermissions = [];
    static description =
        'Récupérer un lien d\'invitation pour faire venir le Getibot dans ton discord';
    static help = true;
    static arguments = [];
    static test = [];

    /**
     * Exécute la commande d'invitation.
     * Génère un lien d'invitation pour le bot, accompagné d'un message amusant aléatoire.
     * @param {object} args - Les arguments de la commande (non utilisés ici).
     * @returns {string} Une chaîne contenant un message et le lien d'invitation du bot.
     */
    async methode(args = {}) {
        //Réponses ludiques pour inciter a l'utilisation de la commande
        const answers = [
            `Tu es sûr de vouloir cette invitation ?`,
            `Voici une invitation rien que pour toi ;)`,
            `Ouais !!! ${this.bot.user.username} partout !!`,
            `Avec toi, ça fera ${this.bot.guilds.cache.size + 1} serveurs !`,
            `Je veux bien te révéler l'invitation, mais je serais obligé de te tuer après 🔫🤵`,
            `A toi je peux bien te la donner ;)`,
            `Super, pleins de nouveaux potes à découvrir chez toi`,
            `Grand fou, on se connaît à peine ^^`,
            `C'est pour moi un grand honneur de te partager cette invitation ${this.user} :)`,
            `Plus on sera de fou, plus on rira : n'hésite pas à parler de moi !!`,
            `Je sais pas quoi te dire, je crois que je suis ému d'une telle demande ...`,
            `Je savais qu'on était fait pour s'entendre, invite moi grand fou !!!`,
            `Vous n'avez pas les droits pour cette commande ... mais comme vous êtes trop BG, je vous offre le lien quand même :)`,
            `Non j'parlerai pas, jamais je te donnerai l'inv ... 👊💥\n\n🦷\n`,
            // ``,
            // ``,
        ];
        answers.push(`Tu savais que le développeur a imaginé ${answers.length + 1} pour te donner cette invit ?`);
        const answer = answers[getRandom(answers.length - 1)];
        return `${answer}\nhttps://discord.com/api/oauth2/authorize?client_id=${this.bot.user.id}&permissions=8&scope=bot`;
    }
};
