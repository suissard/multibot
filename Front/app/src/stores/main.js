import { defineStore } from 'pinia';
import { callApi } from '../services/callApi';

export const useMainStore = defineStore('main', {
  state: () => ({
    commands: [],
    events: [],
    bots: [],
    selectedBotId: localStorage.getItem('selectedBotId') || null,
    selectedChannelId: localStorage.getItem('selectedChannelId') || null,
    loading: false,
  }),
  actions: {
    selectBot(botId) {
        this.selectedBotId = botId;
        localStorage.setItem('selectedBotId', botId);
        // Reset channel when bot changes
        this.selectedChannelId = null;
        localStorage.removeItem('selectedChannelId');
    },
    selectChannel(channelId) {
        this.selectedChannelId = channelId;
        if (channelId) {
             localStorage.setItem('selectedChannelId', channelId);
        } else {
             localStorage.removeItem('selectedChannelId');
        }
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
    async fetchChannels() {
        if (!this.selectedBotId) return [];
        try {
            return await callApi('getChannels', this.selectedBotId);
        } catch (error) {
            console.error('Failed to fetch channels:', error);
            return [];
        }
    },
    async runBotCommand(commandName, args, channelId = null) {
        if (!this.selectedBotId) throw new Error("No bot selected");
        // Use provided channelId or fallback to store's selectedChannelId
        const finalChannelId = channelId || this.selectedChannelId;
        return await callApi('runCommand', this.selectedBotId, commandName, args, finalChannelId);
    },
  },
});
