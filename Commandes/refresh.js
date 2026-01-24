const Commande = require('../Class/Command.js');
const DATAS = require('../Class/DataBase');

module.exports = class Refresh extends Commande {

    static id = 'refresh';
    static devBoss = true;
    static home = true;
    static userPermissions = ['Administrator'];
    static botPermissions = [];
    static description = 'Rafraichit les configurations depuis la base de données et redémarre les bots';
    static help = false;
    static howTo = 'PREFIXCMD';
    static test = [];
    static arguments = [];

    static narrative = `
- Cette commande force le rechargement des données depuis Strapi (base de données).
- Elle met à jour le cache des configurations (botsdatas, teams, etc.).
- Elle redémarre ensuite les bots pour qu'ils prennent en compte les nouvelles configurations.
- **Sécurité :** Réservé au développeur/propriétaire.
`;

    /**
     * Exécute la commande pour rafraichir les données et redémarrer les bots.
     * @param {object} args - Les arguments de la commande.
     * @returns {string} null car les bots sont redémarrés.
     */
    async methode(args = {}) {

        let msg = "🔄 Rafraichissement des données et redémarrage des bots en cours...";

        try {
            // 1. Rafraichir les données depuis Strapi
            await DATAS.getAllData();
            const botsData = DATAS.collections.botsdatas.cache;
            const botManager = this.bot.BOTS;
            // Tentative de réponse avant que le bot ne meurt
        if (this.interaction) {
            await this.interaction.reply(msg).catch(() => { });
        } else if (this.channel) {
            await this.channel.send(msg).catch(() => { });
        }



            // 2. Redémarrer les bots avec les nouvelles données
            // On itère sur les bots actuellement lancés
            for (let [id, bot] of botManager) {
                if (botsData.has(id)) {
                    const newData = botsData.get(id);
                    // On recrée le bot avec les nouvelles données
                    botManager.stop(id);
                    botManager.createBot(newData, botManager);
                }
            }

            // Note: Comme le bot qui exécute cette commande est redémarré, 
            // il ne pourra pas confirmer la fin de l'opération via discord.
            console.log("✅ Rafraichissement global terminé.");

        } catch (e) {
            console.error("❌ Erreur lors du rafraichissement :", e);
        }

        return null; // On ne renvoie rien car le bot est probablement éteint/redémarré
    }
};
