<template>
  <div class="fixed top-0 right-0 h-full bg-white dark:bg-gray-800 shadow-lg z-50 w-64 p-4 transform transition-transform duration-300 ease-in-out"
       :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold">Settings</h2>
      <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>

    <div class="space-y-4">
      <div>
        <h3 class="text-lg font-semibold mb-2">Theme</h3>
        <button @click="toggleTheme" class="w-full flex items-center justify-between px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700">
          <span>{{ theme === 'light' ? 'Light' : 'Dark' }} Mode</span>
          <svg v-if="theme === 'light'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
        </button>
      </div>

      <hr class="border-gray-200 dark:border-gray-700">

      <div>
        <div v-if="isAuthenticated">
          <div v-if="user" class="flex items-center space-x-3 mb-4">
            <img :src="profilePictureUrl" alt="User Avatar" class="w-10 h-10 rounded-full">
            <div>
              <p class="font-semibold">{{ user.username }}</p>
            </div>
          </div>
          <button @click="handleLogout" class="w-full px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-600">Logout</button>
        </div>
        <div v-else>
          <button @click="handleLogin" class="w-full px-3 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600">Login with Discord</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useUserStore } from '@/stores/user';
import { callApi } from '@/services/callApi';

export default {
  name: 'SettingsPanel',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close'],
  computed: {
    ...mapState(useUserStore, ['isAuthenticated', 'user', 'theme', 'profilePictureUrl']),
  },
  methods: {
    ...mapActions(useUserStore, ['toggleTheme', 'login', 'logout']),
    async handleLogin() {
      window.location.href = await callApi('getDiscordAuthUrl');
    },
    handleLogout() {
      this.logout();
      this.$emit('close');
    },
  },
};
</script>
