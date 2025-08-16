import commands from '../mockData/commands.json';
import events from '../mockData/events.json';
import modules from '../mockData/modules.json';
import settings from '../mockData/settings.json';

class Route {
    constructor() {
        this.routes = {
            getCommands: () => commands,
            getEvents: () => events,
            getModules: () => modules,
            getSettings: () => settings,
            getUser: () => ({
                id: '12345',
                username: 'Test User',
                avatar: 'avatar-hash',
            }),
            login: (code) => {
                if (code) {
                    return { token: `fake-token-for-code-${code}` };
                }
                throw new Error('No authorization code provided.');
            },
            getDiscordAuthUrl: () => {
                return `/auth/callback?code=fake-code`;
            },
            getModuleTestData: (_moduleId) => {
                console.log(`Fetching test data for module ${_moduleId}`);
                // In a real app, you'd fetch data for the specific module.
                // Here, we'll just return some generic test data.
                return [
                    { id: 'data1', content: 'Test data 1' },
                    { id: 'data2', content: 'Test data 2' },
                ];
            },
            putModuleTestData: (moduleId, dataId, updatedData) => {
                // In a real app, you'd update the data on the server.
                // Here, we'll just log the data to the console.
                console.log(`Updating module ${moduleId}, data ${dataId} with`, updatedData);
                return { success: true };
            },
            getEventData: (eventName) => {
                // In a real app, you'd fetch data for the specific event.
                // Here, we'll just return some generic event data.
                return {
                    name: eventName,
                    description: 'Some event description',
                    data: 'Some event data',
                };
            },
            postEventData: (updatedData) => {
                // In a real app, you'd update the data on the server.
                // Here, we'll just log the data to the console.
                console.log(`Updating event with`, updatedData);
                return { success: true };
            }
        };
    }

    getRoute(routeName) {
        return this.routes[routeName];
    }
}

export default Route;
