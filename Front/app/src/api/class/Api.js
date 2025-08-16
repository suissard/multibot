class Api {
    constructor(route) {
        this.route = route;
    }

    async call(routeName, ...args) {
        const route = this.route.getRoute(routeName);
        if (!route) {
            throw new Error(`Route ${routeName} not found`);
        }

        // Simulate API latency
        await new Promise(resolve => setTimeout(resolve, 500));

        return route(...args);
    }
}

export default Api;
