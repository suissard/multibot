<template>
  <div class="modules-list p-8">
    <h1 class="text-3xl font-bold mb-6">Modules</h1>
    <div v-if="loading" class="text-gray-600 dark:text-gray-400">Loading...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>
    <ul v-if="modules.length" class="space-y-4">
      <li v-for="module in modules" :key="module.id"
        class="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <router-link :to="`/modules/${module.id}/settings`" class="flex-grow hover:underline">
          <h2 class="text-xl font-semibold">{{ module.name }}</h2>
        </router-link>
        <router-link :to="`/modules/${module.id}/settings`"
          class="ml-4 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm">
          Settings
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { callApi } from '@/services/callApi';

export default {
  name: 'ModulesList',
  data() {
    return {
      modules: [],
      loading: true,
      error: null,
    };
  },
  async created() {
    try {
      this.modules = await callApi('getModules');
    } catch (err) {
      this.error = 'Failed to load modules.';
      console.error(err);
    } finally {
      this.loading = false;
    }
  },
};
</script>
