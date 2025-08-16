import { defineStore } from 'pinia';
import { callApi } from '../services/callApi';

export const useMainStore = defineStore('main', {
  state: () => ({
    commands: [],
    events: [],
    loading: false,
  }),
  actions: {
    async fetchCommands() {
      this.loading = true;
      try {
        this.commands = await callApi('getCommands');
      } catch (error) {
        console.error('Failed to fetch commands:', error);
      } finally {
        this.loading = false;
      }
    },
    async fetchEvents() {
      this.loading = true;
      try {
        this.events = await callApi('getEvents');
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        this.loading = false;
      }
    },
  },
});
