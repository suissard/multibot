import axios from 'axios';

class Route {
    constructor() {
        this.api = axios.create({
            baseURL: '/api'
        });

        this.api.interceptors.request.use(config => {
            const token = localStorage.getItem('api_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        this.routes = {
            getCommands: async (botId) => {
                const response = await this.api.get(`/commands?bot_id=${botId}`);
                return response.data;
            },
            runCommand: async (botId, commandName, args = {}) => {
                 const response = await this.api.post(`/commands/${commandName}?bot_id=${botId}`, { args });
                 return response.data;
            },
            getEvents: async (botId) => {
                const response = await this.api.get(`/events?bot_id=${botId}`);
                return response.data;
            },
            getModules: async (botId) => {
                const response = await this.api.get(`/modules?bot_id=${botId}`);
                return response.data;
            },
            getSettings: async (botId) => {
                 const response = await this.api.get(`/settings?bot_id=${botId}`);
                 return response.data;
            },
            getUser: async () => {
                 const response = await this.api.get('/user');
                 return response.data.user;
            },
            login: async (code) => {
                 const response = await this.api.get(`/auth/callback?code=${code}`);
                 return response.data;
            },
            getDiscordAuthUrl: async () => {
                 const response = await this.api.get('/discord/authurl');
                 return response.data; 
            },
            getBots: async () => {
                const response = await this.api.get('/bots');
                return response.data;
            },
            // Keep mocks for others if needed or implement them
            getModuleTestData: (_moduleId) => [], 
            putModuleTestData: () => ({ success: true }),
            getEventData: () => ({}),
            postEventData: () => ({ success: true })
        };
    }

    getRoute(routeName) {
        return this.routes[routeName];
    }
}

export default Route;
