import { defineStore } from 'pinia';
import api from '../api';

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
        this.commands = await api.selfApi.getCommands();
      } catch (error) {
        console.error('Failed to fetch commands:', error);
      } finally {
        this.loading = false;
      }
    },
    async fetchEvents() {
      this.loading = true;
      try {
        this.events = await api.selfApi.getEvents();
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        this.loading = false;
      }
    },
  },
});
