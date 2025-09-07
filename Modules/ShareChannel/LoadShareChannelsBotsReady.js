const Event = require('../../Class/Event.js');
const ShareChannels = require('./ShareChannels.js');
const DATAS = require('../../Class/DataBase');
const BOTS = require('../../Class/BOTS.js');

const { defaultGameCategory } = require('./shareChannelsConfig.js');

module.exports = class LoadShareChannels extends Event {
    static id = 'loadShareChannels';
    static listener = 'ready';
    static description = 'Charge et initialise la configuration des salons partagés au démarrage.';
    static narrative = "Cet événement écoute l'événement `ready` et charge la configuration des salons partagés depuis la base de données. Il instancie ensuite les objets `ShareChannels` nécessaires pour chaque groupe de partage.";

    /**
     * Gère l'événement 'ready' pour charger et initialiser la configuration des salons partagés.
     * Itère sur la configuration par défaut, filtre les salons correspondants depuis la base de données,
     * et instancie un objet `ShareChannels` pour chaque groupe, les rendant disponibles pour le module.
     */
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
