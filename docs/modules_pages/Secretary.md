---
title: "Module: Secretary"
layout: default
---

# Module: `Secretary`

## Description

*Documentation à compléter*

## Fichiers du Module

```
MessageCheckSecretary.js, ReadyCreateSecretary.js, Secretary.js, Secretary.test.js, index.js
```

## Composants Enregistrés

Ce module enregistre les composants suivants (commandes, événements) :
```
MessageCheckSecretary, ReadyCreateSecretary, Secretary
```

## Contenu de `index.js`

```javascript
const MessageCheckSecretary = require('./MessageCheckSecretary.js');
const ReadyCreateSecretary = require('./ReadyCreateSecretary.js');
const Secretary = require('./Secretary.js');

/**
 * Initialise le module Secretary pour un bot.
 * Ce module semble gérer un système de "secrétariat", probablement pour transférer
 * les messages privés des utilisateurs vers des salons privés sur un serveur.
 * Il exporte les différentes classes et gestionnaires d'événements qui composent le module.
 * @param {import('../../Class/Bot')} bot - L'instance du bot.
 * @returns {object} Un objet contenant les classes du module.
 */
module.exports = (bot) => {
    return {
        MessageCheckSecretary,
        ReadyCreateSecretary,
        Secretary,
    };
};
```
