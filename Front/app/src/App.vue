<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
    <NotificationContainer />
    <NotificationHistory :show="showHistory" @close="showHistory = false" />
    <nav class="bg-white dark:bg-gray-800 shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <!-- Bot Info on the Left -->
            <div class="flex items-center space-x-4">
              <div class="flex items-center">
                <div v-if="selectedBot" class="flex items-center">
                  <div
                    class="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold mr-2">
                    {{ selectedBot.name.charAt(0).toUpperCase() }}
                  </div>
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-200">{{ selectedBot.name }}</span>
                </div>
                <span v-else class="text-sm font-medium text-gray-500 dark:text-gray-400 italic">No Bot Selected</span>
              </div>
            </div>

            <div class="hidden md:block ml-10">
              <div class="flex items-baseline space-x-4">
                <router-link to="/"
                  class="text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Home</router-link>
                <router-link to="/commands"
                  class="text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Commands</router-link>
                <router-link to="/events"
                  class="text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Events</router-link>
                <router-link to="/modules"
                  class="text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Modules</router-link>
                <router-link to="/settings"
                  class="text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Settings</router-link>
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <!-- Notification Bell -->
            <button @click="showHistory = !showHistory"
              class="p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span class="sr-only">View notifications</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            <!-- Settings Toggle / Login -->
            <div v-if="isAuthenticated && user">
              <button @click="toggleSettingsPanel" class="flex items-center focus:outline-none ml-4">
                <img v-if="profilePictureUrl" :src="profilePictureUrl" alt="User Avatar"
                  class="h-9 w-9 rounded-full border-2 border-transparent hover:border-indigo-500 transition-colors duration-200 shadow-sm">
                <div v-else
                  class="h-9 w-9 rounded-full bg-indigo-500 flex items-center justify-center text-white shadow-sm font-bold">
                  {{ user.username.charAt(0).toUpperCase() }}
                </div>
              </button>
            </div>
            <div v-else class="ml-4">
              <button @click="handleLogin"
                class="flex items-center space-x-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 shadow-md">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
                </svg>
                <span>Login</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </main>
    <SettingsPanel :is-open="isSettingsPanelOpen" @close="toggleSettingsPanel" />
  </div>
</template>

<script>
import { useNotificationStore } from './stores/notifications';
import NotificationContainer from './components/NotificationContainer.vue';
import NotificationHistory from './components/NotificationHistory.vue';
import { mapState, mapActions } from 'pinia';
import { useUserStore } from './stores/user';
import { useMainStore } from './stores/main';
import SettingsPanel from './components/SettingsPanel.vue';
import { callApi } from './services/callApi';

export default {
  name: 'App',
  components: {
    NotificationContainer,
    NotificationHistory,
    SettingsPanel
  },
  data() {
    return {
      isSettingsPanelOpen: false,
      showHistory: false,
      showBotSelector: false
    };
  },
  computed: {
    ...mapState(useUserStore, ['isAuthenticated', 'profilePictureUrl', 'theme', 'user']),
    ...mapState(useMainStore, ['selectedBotId', 'bots']),
    selectedBot() {
      if (!this.selectedBotId || !this.bots) return null;
      return this.bots.find(bot => bot.id === this.selectedBotId);
    }
  },
  methods: {
    ...mapActions(useUserStore, ['checkAuth', 'logout']),
    ...mapActions(useMainStore, ['fetchBots', 'selectBot']),
    toggleSettingsPanel() {
      this.isSettingsPanelOpen = !this.isSettingsPanelOpen;
      this.showBotSelector = false; // Close bot selector if settings opens
    },
    toggleBotSelector() {
      this.showBotSelector = !this.showBotSelector;
      this.isSettingsPanelOpen = false; // Close settings if bot selector opens
    },
    async selectBot(bot) {
      if (!bot) return;
      this.selectBot(bot.id); // Call store action to set selected ID
      this.showBotSelector = false;
      // Optionally reload or re-fetch data for the new bot
      // Since we changed the ID, we might want to refresh current view's data
      // For simplicity, we can let individual components react to ID change, or simple reload:
      window.location.reload();
    },
    async handleLogin() {
      // Redirect to Discord OAuth
      window.location.href = await callApi('getDiscordAuthUrl');
    },
    logout() {
      const notificationStore = useNotificationStore();
      localStorage.removeItem('api_token');
      this.updateAuthStatus();
      this.$router.push('/login');
      notificationStore.addNotification({
        type: 'success',
        message: 'You have been logged out successfully.',
        duration: 5000,
        details: 'You will be redirected to the login page.'
      });
    }

  },
  created() {
    this.checkAuth().then(() => {
      if (this.isAuthenticated) {
        this.fetchBots();
      }
    });
  },
};
</script>

<style>
.router-link-exact-active {
  @apply bg-gray-200 dark:bg-gray-700;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
