const SelfApi = require('../Api.js');
const Route = require('../Route.js');

const getCommands = require('./get-commands.js');
const postCommands = require('./post-commands.js');
const getEvents = require('./get-events.js');
const postEvents = require('./post-events.js');
const getEvent = require('./get-event.js');
const getdiscordAuthurl = require('./get-discordAuthurl.js');
const post = require('./post-.js');

const putAutorole = require('./put-autorole.js');
const getModules = require('./get-modules.js');
const putModuleTestData = require('./put-module-test-data.js');
const getAuthCallback = require('./get-auth-callback.js');
const getSettings = require('./get-settings.js');
const putSettings = require('./put-settings.js');

const getBots = require('./get-bots.js');

const routes = [getCommands, postCommands, getEvents, getEvent, postEvents, getdiscordAuthurl, post, putAutorole, getModules, putModuleTestData,  getSettings, putSettings, getAuthCallback, getBots];

/**
 * Enregistre une liste de routes sur l'instance de l'API.
 * @param {import('../Api')} api - L'instance de l'API.
 * @param {Array<{path: string, method: string, handler: function}>} [routesArg] - Un tableau d'objets de route à enregistrer. Si non fourni, utilise les routes importées par défaut.
 */
const createAllRoutes = (api, routesArg) => {
    if (!routesArg) routesArg = routes;
	for (const { path, method, handler } of routesArg) new Route(api, path, method, handler);
};
module.exports = { routes, createAllRoutes };
