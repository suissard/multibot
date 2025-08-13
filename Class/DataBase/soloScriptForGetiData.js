const strapi = require('./index.js');
const fs = require('fs');

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

