/**
 * Représente une route de l'API.
 * L'instanciation de cette classe enregistre automatiquement la route auprès de l'API.
 * @class
 */
class Route {
    /**
     * @param {import('./Api')} api - L'instance de l'API sur laquelle enregistrer la route.
     * @param {string} path - Le chemin de la route (ex: '/commands').
     * @param {'get'|'post'|'put'|'delete'} method - La méthode HTTP.
     * @param {function} handler - La fonction de gestion de la route.
     * @param {object} [options] - Options supplémentaires pour la route (ex: { auth: false }).
     */
    constructor(api, path, method, handler, options = {}) {
        //Gestion d'errur de config 
        if (!api || !path || !method || !handler) {
            throw new Error('Invalid route configuration');
        }
        this.path = path;
        this.method = method;
        this.options = options;

        // Wrap the handler to provide automatic error handling and response sending
        this.handler = async (req, res, ...args) => {
            try {
                const result = await handler(req, res, ...args);

                // If a result is returned and no response has been sent yet, send it as JSON
                if (result !== undefined) res.json(result);

            } catch (error) {
                // Centralized error log
                api.error(`Error in route ${path}: ${error.message}`, 'API_ROUTE');

                // Centralized error response
                if (!res.headersSent && !res.sent) {
                    const errorMethod = res.status ? res.status(500) : res;
                    errorMethod.json({ error: 'Internal Server Error' });
                }
            }
        };

        api.setRoute(path, method, this.handler, options);
    }
}

module.exports = Route;
