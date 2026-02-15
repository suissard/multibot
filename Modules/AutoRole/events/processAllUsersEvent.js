const Event = require('../../../Class/Event.js');

module.exports = class OlympeUserCacheReadyEvent extends Event {
    static id = 'processAllUsersEvent';
    static listener = 'olympeUserCacheReady';
    static description = "Déclenche le traitement des utilisateurs une fois le cache Olympe prêt.";
    static narrative = `Cet événement écoute l'événement \`olympeUserCacheReady\` émis lorsque les données des équipes sont chargées. Il déclenche ensuite \`processAllUsers\` pour mettre à jour les utilisateurs.`;

    /**
     * Gère l'événement olympeUserCacheReady.
     */
    async handleEvent() {
        const { processAllUsers } = require('../utils/utils2.js');
        try {
            // On récupère la guilde principale si nécessaire pour processAllUsers
            const guild = await this.bot.guilds.fetch(this.bot.home).catch((_) => null);
            if (!guild) {
                this.bot.log(`Guild ${this.bot.home} not found in olympeUserCacheReady handler.`, "autorole");
                return;
            }

            this.bot.log(`check pseudo & roles`, 'autorole');

            const users = Object.entries(this.bot.olympe.users);

            let userWithDiscordId = users.length;
            let userOnServer = users.filter((u) => u[1].userData?.discordUser).length;

            this.bot.log(
                `${userWithDiscordId} users with Discord ID, ${userOnServer} users present on server`,
                'autorole'
            );

            await processAllUsers(users, guild, this.bot);

            // Log de fin qui était dans utils2.js, on peut le garder ici ou dans utils2
            // Pour l'instant on réplique la logique de fin de process
            const teamsCount = Object.keys(this.bot.olympe.teams || {}).length; // Teams count might need better access if not in bot.olympe.teams directly as array
            // In utils2 it used specific 'teams' array context. Here we might just log users count.
            this.bot.log(`done : ${users.length} users processed`, 'autorole');

        } catch (err) {
            this.handleError(err);
        }
    }
};
