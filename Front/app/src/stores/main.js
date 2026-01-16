import { defineStore } from 'pinia';
import { callApi } from '../services/callApi';

export const useMainStore = defineStore('main', {
  state: () => ({
    commands: [],
    events: [],
    bots: [],
    users: [],
    roles: [],
    channels: [],
    selectedBotId: localStorage.getItem('selectedBotId') || null,
    selectedChannelId: localStorage.getItem('selectedChannelId') || null,
    loading: false,
  }),
  actions: {
    selectBot(botId) {
      this.selectedBotId = botId;
      localStorage.setItem('selectedBotId', botId);

      // Load default channel for this bot
      const defaultChannelId = localStorage.getItem(`default_channel_${botId}`);
      if (defaultChannelId) {
        this.selectedChannelId = defaultChannelId;
        localStorage.setItem('selectedChannelId', defaultChannelId);
      } else {
        this.selectedChannelId = null;
        localStorage.removeItem('selectedChannelId');
      }

      this.users = [];
    },
    selectChannel(channelId) {
      this.selectedChannelId = channelId;
      if (channelId) {
        localStorage.setItem('selectedChannelId', channelId);
      } else {
        localStorage.removeItem('selectedChannelId');
      }
    },
    setDefaultChannel(botId, channelId) {
      if (!botId) return;
      const key = `default_channel_${botId}`;
      if (channelId) {
        localStorage.setItem(key, channelId);
      } else {
        localStorage.removeItem(key);
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
    async fetchUsers() {
      if (!this.selectedBotId) return [];
      try {
        this.users = await callApi('getUsers', this.selectedBotId);
        return this.users;
      } catch (error) {
        console.error('Failed to fetch users:', error);
        return [];
      }
    },
    async fetchRoles() {
      if (!this.selectedBotId) return [];
      try {
        const roles = await callApi('getRoles', this.selectedBotId);
        this.roles = roles;
        return roles;
      } catch (error) {
        console.error('Failed to fetch roles:', error);
        return [];
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
        const channels = await callApi('getChannels', this.selectedBotId);
        this.channels = channels;
        return channels;
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
