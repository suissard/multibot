import { defineStore } from 'pinia';
import { callApi } from '../services/callApi';

export const useMainStore = defineStore('main', {
  state: () => ({
    commands: [],
    events: [],
    bots: [],
    selectedBotId: localStorage.getItem('selectedBotId') || null,
    loading: false,
  }),
  actions: {
    selectBot(botId) {
        this.selectedBotId = botId;
        localStorage.setItem('selectedBotId', botId);
    },
    async fetchBots() {
        this.loading = true;
        try {
            this.bots = await callApi('getBots');
        } catch (error) {
            console.error('Failed to fetch bots:', error);
            throw error; 
        } finally {
            this.loading = false;
        }
    },
    async fetchCommands() {
      if (!this.selectedBotId) {
          console.warn('No bot selected');
          return;
      }
      this.loading = true;
      try {
        this.commands = await callApi('getCommands', this.selectedBotId);
      } catch (error) {
        console.error('Failed to fetch commands:', error);
      } finally {
        this.loading = false;
      }
    },
    async fetchEvents() {
      if (!this.selectedBotId) return;
      this.loading = true;
      try {
        this.events = await callApi('getEvents', this.selectedBotId);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        this.loading = false;
      }
    },
    async runBotCommand(commandName, args) {
        if (!this.selectedBotId) throw new Error("No bot selected");
        return await callApi('runCommand', this.selectedBotId, commandName, args);
    },
  },
});
