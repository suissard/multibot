<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">Commands</h1>
    <div v-if="loading">Loading...</div>
    <ul v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <li v-for="command in commands" :key="command.name" class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <strong class="text-lg text-indigo-500">{{ command.name }}</strong>
        <p class="text-gray-600 dark:text-gray-400">{{ command.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { useMainStore } from '../stores/main';
import { mapState, mapActions } from 'pinia';

export default {
  name: 'CommandList',
  computed: {
    ...mapState(useMainStore, ['commands', 'loading']),
  },
  methods: {
    ...mapActions(useMainStore, ['fetchCommands']),
  },
  mounted() {
    this.fetchCommands();
  },
};
</script>
