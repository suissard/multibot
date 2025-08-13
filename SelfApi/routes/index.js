const SelfApi = require('../Api.js');
const Route = require('../Route.js');

const getCommands = require('./get-commands.js');
const postCommands = require('./post-commands.js');
const getEvents = require('./get-events.js');
const postEvents = require('./post-events.js');
const getdiscordAuthurl = require('./get-discordAuthurl.js');
const post = require('./post-.js');

const putAutorole = require('./put-autorole.js');

const routes = [getCommands, postCommands, getEvents, postEvents, getdiscordAuthurl, post, putAutorole];

/**
 *
 * @param {SelfApi} api
 * @param {Array} routesArg
 */
const createAllRoutes = (api, routesArg) => {
    if (!routesArg) routesArg = routes;
	for (const { path, method, handler } of routesArg) new Route(api, path, method, handler);
};
module.exports = { routes, createAllRoutes };
