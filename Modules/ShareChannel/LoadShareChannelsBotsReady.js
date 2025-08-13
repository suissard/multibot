const Event = require('../../Class/Event.js');
const ShareChannels = require('./ShareChannels.js');
const DATAS = require('../../Class/DataBase');
const BOTS = require('../../Class/BOTS.js');

const { defaultGameCategory } = require('./shareChannelsConfig.js');

module.exports = class LoadShareChannels extends Event {
    static id = 'loadShareChannels';
    static listener = 'ready';

    handleEvent() {
        if (!BOTS.ShareChannels) {
            BOTS.ShareChannels = new Map();
            BOTS.ShareChannels.set('all', new Map());
        }
        for (let game in defaultGameCategory) {
            for (let categorie in defaultGameCategory[game]) {
                let data = { pattern: defaultGameCategory[game][categorie], game, categorie };
                data.id = `${game}-${categorie}`;

                data.channels = Array.from(DATAS.collections.sharechannels.cache.values())
                    .filter((chan) => chan.game == game && chan.categorie == categorie)
                    .map((chan) =>
                        chan.channel.Channel);

                new ShareChannels(data);
            }
        }
    }
};
