class Route {
    /**
     *
     * @param {Api} api api qui va utiliser la route
     * @param {RegExp} path
     * @param {String} method
     * @param {Function} handler
     */
    constructor(api, path, method, handler) {
        this.path = path;
        this.method = method;
        this.handler = handler;
        api.setRoute(path, method, handler);
    }
}

module.exports = Route;
