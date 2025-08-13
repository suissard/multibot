const strapi = require('./index.js');
const fs = require('fs');

/**
 * Explore un dossier, lit tous les fichiers JSON et retourne leur contenu.
 * @param {string} path - Le chemin du dossier à explorer.
 * @returns {object} Un objet où les clés sont les noms de fichiers et les valeurs sont les contenus JSON parsés.
 */
const exploreJson = (path) => {
    let datas = {};
    let fileNames = [];
    try {
        fileNames = fs.readdirSync(`${path}`);
    } catch (e) {
        console.error(`Erreur avec ${path}`);
    }

    for (let ii in fileNames) {
        let fileName = fileNames[ii];
        if (!fileName.includes('.json')) continue;
        try {
            let file = fs.readFileSync(`${path}/${fileName}`, 'utf8');
            datas[fileName] = JSON.parse(file);
        } catch (e) {
            continue;
        }
    }
    return datas;
};

/**
 * Lit les données de plusieurs collections à partir d'un chemin de base.
 * Chaque sous-dossier est traité comme une collection.
 * @param {string} path - Le chemin de base contenant les dossiers des collections.
 * @returns {{datas: object, collectionNames: Array<string>}} Un objet contenant les données et les noms des collections.
 */
const getDataFromPath = (path) => {
    let collectionNames = fs.readdirSync(path);
    let datas = {};
    for (let i in collectionNames) {
        let collectionName = collectionNames[i];
        if (collectionName.includes('.')) continue;
        datas[collectionName.toLowerCase()] = exploreJson(`${path}${collectionName}`);
    }
    return { datas, collectionNames };
};

/**
 * Script principal pour migrer les données depuis des fichiers JSON locaux vers Strapi.
 * Récupère les données, les compare à un exemple de Strapi et les envoie.
 * @param {string} path - Le chemin de base contenant les données à migrer.
 */
const start = async (path) => {
    // Recuperer les donnée brut
    let { datas, collectionNames } = getDataFromPath(path);
    let getiDatas = datas;
    //Recuperer un exemple strapi
    let strapiExemple = {};

    let strapiData = await strapi.getAllData();

    for (let i in collectionNames) {
        let collectionName = collectionNames[i].toLowerCase();
        if (!strapiData[collectionName + 's']) continue;
        let collection = strapiData[collectionName + 's'];
        strapiExemple[collectionName] = collection[0];
    }

    //Envoyer les données
    for (let type in strapiExemple) {
        let exemple = strapiExemple[type];
        datas = getiDatas[type];

        console.log(`Creation des ${type}`);

        for (let i in datas) {
            let data = datas[i];
            let objToSend = {};

            let filter = ['id', 'getCollection', 'getType', 'createdAt', 'updatedAt'];
            for (let ii in exemple) {
                if (filter.includes(ii)) continue;
                objToSend[ii] = data[ii];
            }

            let strapiCollection = strapi.collections[type + 's'];
            await strapiCollection.create(objToSend).catch((e) => {
                console.error(`Erreur sur ${type}/${i}`);
            });
        }
    }

    return;
};

// start("./Class/DataBase/.archives/");


/**
 * Sauvegarde les configurations de bots depuis une source de données vers Strapi.
 * (La source de données semble être une autre base de données ou un cache)
 */
const saveBotsConfigsOnStrapi = async () => {
    const Datas = require('../DataBase');

    await Datas.setup(['multibot']);
    await Datas.getAllFromAllCollections();
    const botDatas = Datas.collections.get('bots_data').cache;

    let exemple = await strapi.collections.botsdatas.get(2);

    for (let [id, data] of botDatas) {
        let objToSend = {};

        let filter = ['id', 'getCollection', 'getType', 'createdAt', 'updatedAt'];
        for (let ii in exemple) {
            if (filter.includes(ii)) continue;
            objToSend[ii] = data[ii];
        }

        await strapi.collections.botsdatas.create(objToSend).catch((e) => {
            console.error(`Erreur sur ${bot.name}/${i}`, e);
        });
    }
};

