<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
    <nav class="bg-white dark:bg-gray-800 shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow">
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <router-link to="/" class="text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Home</router-link>
                <router-link to="/commands" class="text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Commands</router-link>
                <router-link to="/events" class="text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Events</router-link>
                <router-link to="/modules" class="text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Modules</router-link>
                <router-link to="/settings" class="text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Settings</router-link>
              </div>
            </div>
          </div>
          <div class="flex items-center">
            <button @click="toggleSettingsPanel" class="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span class="sr-only">View settings</span>
              <img v-if="isAuthenticated && profilePictureUrl" :src="profilePictureUrl" alt="User Avatar" class="h-8 w-8 rounded-full">
              <svg v-else class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </button>
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
import { mapState, mapActions } from 'pinia';
import { useUserStore } from './stores/user';
import SettingsPanel from './components/SettingsPanel.vue';

export default {
  name: 'App',
  components: {
    SettingsPanel,
  },
  data() {
    return {
      isSettingsPanelOpen: false,
    };
  },
  computed: {
    ...mapState(useUserStore, ['isAuthenticated', 'profilePictureUrl', 'theme']),
  },
  methods: {
    ...mapActions(useUserStore, ['checkAuth', 'logout']),
    toggleSettingsPanel() {
      this.isSettingsPanelOpen = !this.isSettingsPanelOpen;
    },
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
