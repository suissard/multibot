const ShareChannels = require('../ShareChannel/ShareChannels.js');
const fs = require('fs');

const dirToDataBase = async function(dbname, dirPath, exclusions, databasify) {
    let dirs = fs.readdirSync(dirPath);

    for (let i in dirs) {
        let path = dirs[i];
        if (path.includes('js')) continue;

        await Datas.createFromFiles(
            dbname,
            path,
            `${dirPath}/${path}`,
            exclusions,
            databasify,
        );
        console.log(`${dirPath}/${path} a été databasifié`);
    }
};

const databasifyGetiData = (getiData) => {
    let dataForDB = getiData;
    dataForDB._id = getiData.key.trim();
    dataForDB.name = getiData.name.trim();
    delete dataForDB.key;
    delete dataForDB.tournoiOn;
    delete dataForDB.inscriptions;
    delete dataForDB.tournoi;
    delete dataForDB.historiqueTournois;
    delete dataForDB.historiqueRencontres;
    delete dataForDB.points;
    delete dataForDB.position;

    return dataForDB;
};

//TODO Transposer ShareChannel getiData ancienne en nouvelles version
/**
 *
 * @param {Array} data données de l'ancien bot
 */
const convertOldData = async (
    oldData = Array.from(Datas.collections.get('ShareChannel').cache.values()),
) => {
    for (let game in defaultGameCategory) {
        for (let categorie in defaultGameCategory[game]) {
            let data = { pattern: defaultGameCategory[game][categorie], game, categorie };
            data.id = `${game}-${categorie}`;

            // TODO deux format actuellement : sharechannel avec plein de channel dedans et shareChannel individuel

            data.channels = oldData
                .filter((chan) => chan.game == game && chan.categorie == categorie)
                .map((chan) => chan.id);

            let shareChannel = new ShareChannels(data);
            await shareChannel.save();
        }
    }
};

// dirToDataBase("multibot", "dataGetibot", [], databasifyGetiData);