<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
    <NotificationContainer />
    <NotificationHistory :show="showHistory" @close="showHistory = false" />
    <nav class="bg-white dark:bg-gray-800 shadow-md relative z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 relative">
          <div class="flex items-center">
            <div class="hidden md:block">
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

          <!-- Centered Bot & Channel Info -->
          <div class="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-4">

            <!-- Bot Selector -->
            <div class="relative">
              <div @click="toggleBotSelector"
                class="relative z-10 flex items-center bg-indigo-50 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-700 rounded-full py-1.5 px-4 shadow-sm cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-800 transition-colors duration-200">
                <div v-if="selectedBot" class="flex items-center">
                  <img v-if="selectedBot.avatar" :src="selectedBot.avatar" alt="Bot Avatar"
                    class="h-8 w-8 rounded-full border border-indigo-200 dark:border-indigo-600 mr-2">
                  <div v-else
                    class="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold mr-2">
                    {{ selectedBot.name.charAt(0).toUpperCase() }}
                  </div>
                  <span class="text-sm font-medium text-indigo-700 dark:text-indigo-200 hidden sm:block mr-1">{{
                    selectedBot.name }}</span>
                  <svg class="w-4 h-4 text-indigo-500 dark:text-indigo-400 ml-1" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
                <span v-else
                  class="text-sm font-medium text-indigo-500 dark:text-indigo-400 italic hidden sm:block">Select
                  Bot</span>
              </div>

              <!-- Bot Dropdown -->
              <transition name="fade">
                <div v-if="showBotSelector"
                  class="absolute top-12 left-0 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-20">
                  <div v-if="bots && bots.length > 0">
                    <div v-for="bot in bots" :key="bot.id" @click="handleBotSelection(bot)"
                      class="flex items-center px-4 py-3 hover:bg-indigo-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150"
                      :class="{ 'bg-indigo-50/50 dark:bg-gray-700/50': selectedBotId === bot.id }">
                      <img v-if="bot.avatar" :src="bot.avatar" alt="Bot Avatar"
                        class="h-8 w-8 rounded-full mr-3 border border-gray-200 dark:border-gray-600">
                      <div v-else
                        class="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold mr-3 text-xs">
                        {{ bot.name.charAt(0).toUpperCase() }}
                      </div>
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-200">{{ bot.name }}</span>
                      <span v-if="selectedBotId === bot.id" class="ml-auto text-indigo-600 dark:text-indigo-400">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div v-else class="px-4 py-3 text-sm text-gray-500 text-center">
                    No bots available
                  </div>
                </div>
              </transition>
            </div>

            <!-- Channel Selector -->
            <div class="relative" v-if="selectedBot">
              <div @click="toggleChannelSelector"
                class="relative z-10 flex items-center bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-700 rounded-full py-1.5 px-4 shadow-sm cursor-pointer hover:bg-green-100 dark:hover:bg-green-800 transition-colors duration-200">
                <div v-if="selectedChannel" class="flex items-center">
                  <span class="text-sm font-medium text-green-700 dark:text-green-200 hidden sm:block mr-1"># {{
                    selectedChannel.name }}</span>
                  <svg class="w-4 h-4 text-green-500 dark:text-green-400 ml-1" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
                <span v-else
                  class="text-sm font-medium text-green-500 dark:text-green-400 italic hidden sm:block">Default
                  (DM)</span>
              </div>

              <!-- Channel Dropdown -->
              <transition name="fade">
                <div v-if="showChannelSelector"
                  class="absolute top-12 left-0 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-50 max-h-96 overflow-y-auto w-max min-w-full">
                  <div v-if="channels && channels.length > 0">
                    <!-- Option for No Channel (DM) -->
                    <div @click="handleChannelSelection(null)"
                      class="flex items-center px-4 py-3 hover:bg-green-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150 border-b border-gray-100 dark:border-gray-700">
                      <span class="text-sm font-medium text-gray-500 dark:text-gray-400 italic">No Channel
                        (Default/DM)</span>
                    </div>

                    <div v-for="channel in channels" :key="channel.id" @click="handleChannelSelection(channel)"
                      class="flex items-center px-4 py-3 hover:bg-green-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150"
                      :class="{ 'bg-green-50/50 dark:bg-gray-700/50': selectedChannelId === channel.id }">
                      <span class="text-gray-400 text-xs mr-2">#</span>
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">{{ channel.name
                      }}</span>
                      <span v-if="selectedChannelId === channel.id" class="ml-auto text-green-600 dark:text-green-400">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div v-else class="px-4 py-3 text-sm text-gray-500 text-center">
                    No channels available
                  </div>
                </div>
              </transition>
            </div>

            <!-- Backdrop for closing -->
            <div v-if="showBotSelector || showChannelSelector" @click="toggleSettingsPanel"
              class="fixed inset-0 z-0 bg-transparent cursor-default"></div>
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
      showBotSelector: false,
      showChannelSelector: false,
      channels: []
    };
  },
  computed: {
    ...mapState(useUserStore, ['isAuthenticated', 'profilePictureUrl', 'theme', 'user']),
    ...mapState(useMainStore, ['selectedBotId', 'bots', 'selectedChannelId']),
    selectedBot() {
      if (!this.selectedBotId || !this.bots) return null;
      return this.bots.find(bot => bot.id === this.selectedBotId);
    },
    selectedChannel() {
      if (!this.selectedChannelId || !this.channels) return null;
      return this.channels.find(c => c.id === this.selectedChannelId);
    }
  },
  methods: {
    ...mapActions(useUserStore, ['checkAuth', 'logout']),
    ...mapActions(useMainStore, ['fetchBots', 'selectBot', 'fetchChannels', 'selectChannel']),
    toggleSettingsPanel() {
      this.isSettingsPanelOpen = !this.isSettingsPanelOpen;
      this.showBotSelector = false;
      this.showChannelSelector = false;
    },
    toggleBotSelector() {
      this.showBotSelector = !this.showBotSelector;
      this.showChannelSelector = false;
      this.isSettingsPanelOpen = false;
    },
    toggleChannelSelector() {
      this.showChannelSelector = !this.showChannelSelector;
      this.showBotSelector = false;
      this.isSettingsPanelOpen = false;
    },
    async handleBotSelection(bot) {
      if (!bot) return;
      this.selectBot(bot.id);
      this.showBotSelector = false;
      // Refresh logic:
      await this.loadChannels(); // Fetch channels for new bot
      // Reload is a bit harsh if we can just react, but user asked for consistency. 
      // Reloading ensures all components reset. 
      window.location.reload();
    },
    async handleChannelSelection(channel) {
      if (!channel) {
        this.selectChannel(null);
      } else {
        this.selectChannel(channel.id);
      }
      this.showChannelSelector = false;
    },
    async loadChannels() {
      if (this.selectedBotId) {
        this.channels = await this.fetchChannels();
      } else {
        // Clear channels if no bot is selected
        this.channels = [];
      }
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
    this.checkAuth().then(async () => {
      if (this.isAuthenticated) {
        // fetchBots will set bots, but selectedBotId comes from localStorage (store state)
        await this.fetchBots();
        // loadChannels will be triggered by watch if immediate or changed, but let's keep direct call or rely on watch.
        // If we use watch immediate, we don't need this call here.
      }
    });
  },
  watch: {
    selectedBotId: {
      immediate: true,
      handler: 'loadChannels'
    }
  }
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
