<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
    <NotificationContainer />
    <NotificationHistory :show="showHistory" @close="showHistory = false" />
    <nav class="bg-white dark:bg-gray-800 shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow">
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
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
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <button @click="showHistory = !showHistory"
                class="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span class="sr-only">View notifications</span>
                <!-- Heroicon name: bell -->
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>

            <div class="flex items-center">
              <button @click="toggleSettingsPanel"
                class="flex items-center p-2 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span class="sr-only">View settings</span>
                
                <div v-if="isAuthenticated && user" class="flex items-center mr-2">
                   <span class="text-sm font-medium text-gray-700 dark:text-gray-200 mr-2">{{ user.username }}</span>
                </div>

                <img v-if="isAuthenticated && profilePictureUrl" :src="profilePictureUrl" alt="User Avatar"
                  class="h-8 w-8 rounded-full">
                <svg v-else class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z">
                  </path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
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
import SettingsPanel from './components/SettingsPanel.vue';

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
      isAuthenticated: false,
      showHistory: false
    };
  },
  computed: {
    ...mapState(useUserStore, ['isAuthenticated', 'profilePictureUrl', 'theme', 'user']),
  },
  methods: {
    ...mapActions(useUserStore, ['checkAuth', 'logout']),
    toggleSettingsPanel() {
      this.isSettingsPanelOpen = !this.isSettingsPanelOpen;
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
    this.checkAuth();
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
