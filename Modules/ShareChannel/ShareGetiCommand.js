const Command = require('../../Class/Command.js');
const BOTS = require('../../Class/BOTS.js');

module.exports = class Done extends Command {
    static id = 'sharegeti';
    static devBoss = false;
    static home = false;
    static userPermissions = [];
    static botPermissions = [];
    static description = 'Définit ce salon pour partager les annonces Geti';
    static help = true;
    static howTo = 'PREFIXCMD';
    static test = [];
    static arguments = [];

    async methode(args = {}) {
        let shareChannel = BOTS.ShareChannels.get(`overwatch-geti`);
        await shareChannel.addChannel(this.channel, 'overwatch', 'geti');
        return 'Les annonces de GeekingTime seront dorénavant publiés ici';
    }
};
