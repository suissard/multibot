import axios from 'axios';

class Route {
    constructor() {
        this.api = axios.create({
            baseURL: process.env.NODE_ENV === 'DEV'
                ? 'http://localhost:3000/api'
                : (process.env.VUE_APP_API_URL ? `${process.env.VUE_APP_API_URL}/api` : '/api')
        });

        this.api.interceptors.request.use(config => {
            const token = localStorage.getItem('api_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        this.api.interceptors.response.use(
            response => response,
            error => {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('api_token');
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            }
        );

        this.routes = {
            getCommands: async (botId) => {
                const response = await this.api.get(`/commands?bot_id=${botId}`);
                return response.data;
            },
            runCommand: async (botId, commandName, args = {}, channelId = null) => {
                const body = { args, channel_id: channelId };
                const response = await this.api.post(`/commands/${commandName}?bot_id=${botId}`, body);
                return response.data;
            },
            getEvents: async (botId) => {
                const response = await this.api.get(`/events?bot_id=${botId}`);
                return response.data;
            },
            getEvent: async (eventName) => {
                const response = await this.api.get(`/events/${eventName}`);
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
                const response = await this.api.get(`/auth/callback?code=${code}`, {
                    headers: { Authorization: '' }
                });
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
            getGuilds: async (botId) => {
                const response = await this.api.get(`/guilds?bot_id=${botId}`);
                return response.data;
            },
            getChannels: async (botId, guildId = null) => {
                let url = `/channels?bot_id=${botId}`;
                if (guildId) url += `&guild_id=${guildId}`;
                const response = await this.api.get(url);
                return response.data;
            },
            getUsers: async (botId, guildId = null) => {
                let url = `/users?bot_id=${botId}`;
                if (guildId) url += `&guild_id=${guildId}`;
                const response = await this.api.get(url);
                return response.data;
            },
            getRoles: async (botId, guildId = null) => {
                let url = `/roles?bot_id=${botId}`;
                if (guildId) url += `&guild_id=${guildId}`;
                const response = await this.api.get(url);
                return response.data;
            },
            getMessages: async (botId, channelId, limit = 50) => {
                const response = await this.api.get(`/messages?bot_id=${botId}&channel_id=${channelId}&limit=${limit}`);
                return response.data;
            },
            // Secretary Routes
            getSecretaryConversations: async (botId) => {
                const response = await this.api.get(`/secretary/conversations?bot_id=${botId}`);
                return response.data;
            },
            getSecretaryMessages: async (botId, channelId) => {
                const response = await this.api.get(`/secretary/conversations/${channelId}?bot_id=${botId}`);
                return response.data;
            },
            replyToSecretaryMessage: async (botId, channelId, content) => {
                const body = { channelId, content };
                const response = await this.api.post(`/secretary/reply?bot_id=${botId}`, body);
                return response.data;
            },
            getSecretarySuggestion: async (botId, messages, config) => {
                const body = { messages, config };
                const response = await this.api.post(`/secretary/suggestion?bot_id=${botId}`, body);
                return response.data;
            },

            // Keep mocks for others if needed or implement them
            getModuleTestData: (_moduleId) => [],
            putModuleTestData: () => ({ success: true }),
            getEventData: () => ({}),
            postEventData: () => ({ success: true }),
            triggerEvent: async (botId, eventName, payload) => {
                const body = { eventName, payload };
                const response = await this.api.post(`/events/trigger?bot_id=${botId}`, body);
                return response.data;
            }
        };
    }

    getRoute(routeName) {
        return this.routes[routeName];
    }
}

export default Route;
