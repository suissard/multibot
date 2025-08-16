<template>
  <div class="modules-list p-8">
    <h1 class="text-3xl font-bold mb-6">Modules</h1>
    <div v-if="loading" class="text-gray-600 dark:text-gray-400">Loading...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>
    <ul v-if="modules.length" class="space-y-4">
      <li v-for="module in modules" :key="module.id">
        <router-link :to="`/modules/${module.id}/test-data`" class="block p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
          <h2 class="text-xl font-semibold">{{ module.name }}</h2>
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
