/**
 * Ce module contient un ensemble de scripts utilitaires conçus pour la migration de données.
 *
 * Sa fonction principale est de lire des données depuis des fichiers JSON, de les transformer dans un format compatible avec la base de données, puis de les y insérer.
 * Il inclut des fonctions spécifiques pour traiter les données "Geti" et pour convertir d'anciens formats de configuration, comme ceux de 'ShareChannel', vers la nouvelle structure de la base de données.
 *
 * Ce module n'est pas destiné à être activé ou désactivé comme les autres modules du bot, mais plutôt à être utilisé ponctuellement pour des tâches de maintenance et de migration.
 */
const ShareChannels = require('../ShareChannel/ShareChannels.js');
const fs = require('fs');

/**
 * Lit les fichiers d'un répertoire et les insère dans une base de données.
 * @param {string} dbname - Le nom de la collection dans la base de données.
 * @param {string} dirPath - Le chemin vers le répertoire contenant les données.
 * @param {Array<string>} exclusions - Une liste de fichiers à exclure.
 * @param {function} databasify - Une fonction pour transformer les données avant l'insertion.
 */
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

/**
 * Transforme un objet de données "Geti" brut en un format adapté à la base de données.
 * Renomme `key` en `_id` et supprime plusieurs propriétés inutiles.
 * @param {object} getiData - L'objet de données Geti à transformer.
 * @returns {object} L'objet de données formaté pour la base de données.
 */
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

/**
 * Convertit les anciennes données de ShareChannel vers le nouveau format de base de données.
 * @param {Array<object>} oldData - Un tableau d'anciens objets ShareChannel.
 * @todo Le code semble inachevé et dépend de `defaultGameCategory` qui n'est pas défini ici.
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