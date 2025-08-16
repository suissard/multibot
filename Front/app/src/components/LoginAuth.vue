<template>
  <div class="flex items-center justify-center h-full">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-8">Login</h1>
      <button @click="login" class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        Login with Discord
      </button>
    </div>
  </div>
</template>

<script>
import { callApi } from '../services/callApi';

export default {
  name: 'LoginAuth',
  methods: {
    async login() {
      try {
        const authUrl = await callApi('getDiscordAuthUrl');
        window.location.href = authUrl;
      } catch (error) {
        console.error('Error getting Discord auth URL:', error);
      }
    }
  }
};
</script>
