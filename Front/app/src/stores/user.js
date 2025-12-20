import { defineStore } from 'pinia';
import { callApi } from '../services/callApi';

export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: !!localStorage.getItem('api_token'),
    user: null,
    theme: localStorage.getItem('theme') || 'light',
    token: localStorage.getItem('api_token') || null,
  }),
  getters: {
    profilePictureUrl() {
      if (this.user && this.user.avatar) {
        return `https://cdn.discordapp.com/avatars/${this.user.id}/${this.user.avatar}.png`;
      }
      return null;
    },
  },
  actions: {
    initializeTheme() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.theme = savedTheme;
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.theme = prefersDark ? 'dark' : 'light';
      }
      document.documentElement.classList.toggle('dark', this.theme === 'dark');
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', this.theme);
      document.documentElement.classList.toggle('dark', this.theme === 'dark');
    },
    async fetchUser() {
      try {
        this.user = await callApi('getUser');
      } catch (error) {
        console.error('Failed to fetch user:', error);
        this.logout();
      }
    },
    async login(code) {
      this.logout(); // Clear previous token
      const { token } = await callApi('login', code);
      localStorage.setItem('api_token', token);
      this.token = token;
      this.isAuthenticated = true;
      await this.fetchUser();
    },
    logout() {
      localStorage.removeItem('api_token');
      this.token = null;
      this.isAuthenticated = false;
      this.user = null;
    },
    checkAuth() {
      this.isAuthenticated = !!localStorage.getItem('api_token');
      if (this.isAuthenticated && !this.user) {
        this.fetchUser();
      }
    }
  },
});
