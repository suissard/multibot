<template>
  <div class="p-8 max-w-7xl mx-auto">
    <!-- Header with Search -->
    <div class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <div>
        <h1
          class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
          Commands Repository</h1>
        <p class="text-gray-500 mt-2">Browse and execute available bot commands.</p>
      </div>
      <div class="w-full md:w-auto relative">
        <input v-model="searchQuery" type="text" placeholder="Search commands..."
          class="w-full md:w-80 pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 transition-all shadow-sm">
        <span class="absolute left-3 top-2.5 text-gray-400">🔍</span>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>

    <!-- No Bot Selected State -->
    <div v-if="!selectedBotId" class="text-center py-12">
      <div
        class="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-xl p-8 inline-block max-w-lg">
        <h2 class="text-2xl font-bold text-yellow-800 dark:text-yellow-200 mb-4">⚠️ No Bot Selected</h2>
        <p class="text-yellow-700 dark:text-yellow-300 mb-6">Please select a bot from the dashboard to view and execute
          commands.</p>
        <router-link to="/"
          class="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg shadow transition">
          Go to Dashboard
        </router-link>
      </div>
    </div>

    <!-- Empty State (No Search Results) -->
    <div v-else-if="filteredCommands.length === 0 && !loading"
      class="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
      <p class="text-xl text-gray-500">No commands found matching "{{ searchQuery }}"</p>
    </div>

    <!-- Grid -->
    <!-- Table View -->
    <div v-else class="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Command Name
              </th>
              <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Category
              </th>
              <th scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Description
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="command in filteredCommands" :key="command.name"
              @click="$router.push('/commands/' + command.name)"
              class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="text-sm font-bold text-gray-900 dark:text-white">
                    {{ command.name }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span v-if="command.category"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                  {{ command.category }}
                </span>
                <span v-else class="text-xs text-gray-400 italic">Uncategorized</span>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
                  {{ command.description || 'No description provided.' }}
                </div>
                <!-- Args Preview (Optional, kept for detail) -->
                <div v-if="command.arguments && command.arguments.length" class="flex flex-wrap gap-1 mt-1">
                  <span v-for="arg in command.arguments.slice(0, 3)" :key="arg.name"
                    class="text-xs font-mono bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-300 px-1 py-0.5 rounded">
                    {{ arg.name }}
                  </span>
                  <span v-if="command.arguments.length > 3" class="text-xs text-gray-400">+{{ command.arguments.length -
                    3 }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { useMainStore } from '../stores/main';
import { mapState, mapActions } from 'pinia';

export default {
  name: 'CommandList',
  data() {
    return {
      searchQuery: ''
    };
  },
  computed: {
    ...mapState(useMainStore, ['commands', 'loading', 'selectedBotId']),
    filteredCommands() {
      if (!this.searchQuery) return this.commands;
      const query = this.searchQuery.toLowerCase();
      return this.commands.filter(cmd =>
        cmd.name.toLowerCase().includes(query) ||
        (cmd.description && cmd.description.toLowerCase().includes(query))
      );
    }
  },
  methods: {
    ...mapActions(useMainStore, ['fetchCommands']),
  },
  mounted() {
    this.fetchCommands();
  },
};
</script>
