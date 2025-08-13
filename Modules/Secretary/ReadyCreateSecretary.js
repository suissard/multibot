const Event = require('../../Class/Event.js');

module.exports = class CreateSecretary extends Event {
    static id = 'createSecretary';
    static listener = 'ready';

    /**
     * Gère l'événement 'ready' pour initialiser la configuration du secrétariat.
     * Pour chaque ID de catégorie de secrétariat dans la configuration,
     * cet événement récupère les objets nécessaires (catégorie, rôles) et les
     * stocke dans `bot.modules.Secretary.secretary` pour une utilisation ultérieure.
     */
    handleEvent() {
        try {
            this.bot.modules.Secretary.secretary = [];
            for (let i in this.bot.modules.Secretary.secretaryCategorieId) {
                let secretaryCategorieId = this.bot.modules.Secretary.secretaryCategorieId[i];
                let secretaryCategorie = this.bot.channels.cache.get(secretaryCategorieId);
                if (!secretaryCategorie || !this.bot.modules.Secretary.secretaryRoleId[i])
                    return (this.bot.modules.Secretary.secretary = false);
                this.bot.modules.Secretary.secretary.push({
                    category: secretaryCategorie,
                    idRole: this.bot.modules.Secretary.secretaryRoleId[i],
                    idRoleAdmin: this.bot.modules.Secretary.suppRole ? this.bot.modules.Secretary.suppRole[i] : false,
                    name: secretaryCategorie.name,
                    guild: secretaryCategorie.guild,
                });
                // console.log(`✉️ ${this.bot.name} : Secrétariat ${secretaryCategorie.guild.name} crée`)
            }
            return this.bot.modules.Secretary.secretary;
        } catch (err) {
            this.handleError(err);
        }
    }
};