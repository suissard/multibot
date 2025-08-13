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
     */
    constructor(api, path, method, handler) {
        this.path = path;
        this.method = method;
        this.handler = handler;
        api.setRoute(path, method, handler);
    }
}

module.exports = Route;
