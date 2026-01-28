const { OlympeApi } = require('olympe-client-api');
const ApiCallQueue = require('../Class/ApiCallQueue');
const { apiQueueConfig } = require('../Modules/AutoRole/utils/constants');

// On instancie la queue (utilisera les valeurs par défaut si non instanciée avant)
const queue = new ApiCallQueue(apiQueueConfig.delay, apiQueueConfig.concurrency);

// Sauvegarde de la méthode originale
const originalMakeRequest = OlympeApi.prototype.makeRequest;

// Surcharge de la méthode
OlympeApi.prototype.makeRequest = function (params) {
    // On passe par la file d'attente
    return queue.add(() => {
        // .call(this) est important pour garder le contexte de l'instance OlympeApi (token, domain, etc.)
        return originalMakeRequest.call(this, params);
    });
};