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
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="command in filteredCommands" :key="command.name" @click="$router.push('/commands/' + command.name)"
        class="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col cursor-pointer">
        <div class="p-6 flex-grow">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-xl font-bold text-gray-800 dark:text-white group-hover:text-indigo-600 transition-colors">
                {{ command.name }}</h3>
              <span v-if="command.category"
                class="inline-block mt-1 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{{
                  command.category }}</span>
            </div>
            <div class="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg text-indigo-500">
              ⚡
            </div>
          </div>

          <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
            {{ command.description || 'No description provided.' }}
          </p>

          <!-- Args Preview -->
          <div v-if="command.arguments && command.arguments.length" class="flex flex-wrap gap-1 mb-4">
            <span v-for="arg in command.arguments.slice(0, 3)" :key="arg.name"
              class="text-xs font-mono bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded">
              {{ arg.name }}
            </span>
            <span v-if="command.arguments.length > 3" class="text-xs text-gray-400">+{{ command.arguments.length - 3
            }}</span>
          </div>
        </div>

        <!-- Actions Footer -->
        <div
          class="bg-gray-50 dark:bg-gray-900/50 p-4 border-t border-gray-100 dark:border-gray-700 flex justify-end items-center">
          <router-link :to="'/commands/' + command.name"
            class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95">
            Execute
          </router-link>
        </div>
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
