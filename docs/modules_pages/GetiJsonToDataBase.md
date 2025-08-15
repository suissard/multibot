---
title: "Module: GetiJsonToDataBase"
layout: default
---

# Module: `GetiJsonToDataBase`

## Description

*Documentation à compléter*

## Fichiers du Module

```
index.js
```

## Composants Enregistrés

Ce module enregistre les composants suivants (commandes, événements) :
```
N/A
```

## Contenu de `index.js`

```javascript
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
```
