const Event = require('../../../Class/Event.js');
const { addOlympeUserData } = require('../utils/utils.js');

module.exports = class OlympeMemberEvent extends Event {
    static id = 'addOlympeDataEvent';
    static listener = 'olympeMember';
    static description = "Gère l'événement olympeMember pour enrichir le cache du bot.";
    static narrative = `Cet événement est déclenché lorsqu'un utilisateur Discord est associé à un membre Olympe. Il met à jour le cache local du bot avec les informations de l'utilisateur et de son équipe.`;

    /**
     * Gère l'événement olympeMember.
     * @param {object} payload - Les données de l'événement.
     * @param {import('discord.js').User} payload.discordUser - L'utilisateur Discord.
     * @param {object} payload.olympeMember - Les informations du membre Olympe.
     * @param {object} payload.team - Les informations de l'équipe.
     */
    async handleEvent({ discordUser, olympeMember, team }) {
        try {
            addOlympeUserData(olympeMember, team, this.bot);

            let userData = this.bot.olympe.users[discordUser.id]?.userData;

            if (!userData) {
                userData = { discordUser };
            }

            userData.olympeMember = olympeMember;

            if (!userData.teams) {
                userData.teams = [];
            }

            if (!userData.teams.find((t) => t.id === team.id)) {
                userData.teams.push(team);
            }

            this.bot.olympe.users[discordUser.id].userData = userData;
        } catch (err) {
            this.handleError(err);
        }
    }
};
