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

    <!-- Controls: Filter & Sort -->
    <div
      class="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
      <!-- Category Filter -->
      <div class="flex-1 min-w-[200px]">
        <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">CATEGORY</label>
        <select v-model="selectedCategory"
          class="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
          <option value="">All Categories</option>
          <option v-for="category in uniqueCategories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <!-- Sort By -->
      <div class="flex-1 min-w-[200px]">
        <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">SORT BY</label>
        <select v-model="sortBy"
          class="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
          <option value="name">Name</option>
          <option value="category">Category</option>
        </select>
      </div>

      <!-- Sort Order -->
      <div class="flex items-end">
        <button @click="toggleSortOrder"
          class="h-[42px] px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors flex items-center justify-center gap-2"
          :title="sortOrder === 'asc' ? 'Ascending' : 'Descending'">
          <span class="text-sm font-medium">{{ sortOrder === 'asc' ? 'A-Z' : 'Z-A' }}</span>
          <span class="text-xs">{{ sortOrder === 'asc' ? '↓' : '↑' }}</span>
        </button>
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
      searchQuery: '',
      selectedCategory: '',
      sortBy: 'name', // 'name' | 'category'
      sortOrder: 'asc' // 'asc' | 'desc'
    };
  },
  computed: {
    ...mapState(useMainStore, ['commands', 'loading', 'selectedBotId']),
    uniqueCategories() {
      // Extract unique categories, filter out null/undefined/empty
      const categories = new Set(this.commands.map(cmd => cmd.category).filter(Boolean));
      return Array.from(categories).sort();
    },
    filteredCommands() {
      let result = [...this.commands]; // Create a copy

      // 1. Search Filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(cmd =>
          cmd.name.toLowerCase().includes(query) ||
          (cmd.description && cmd.description.toLowerCase().includes(query))
        );
      }

      // 2. Category Filter
      if (this.selectedCategory) {
        result = result.filter(cmd => cmd.category === this.selectedCategory);
      }

      // 3. Sorting
      result.sort((a, b) => {
        let comparison = 0;

        if (this.sortBy === 'name') {
          comparison = a.name.localeCompare(b.name);
        } else if (this.sortBy === 'category') {
          const catA = a.category || '';
          const catB = b.category || '';
          comparison = catA.localeCompare(catB); // Handle potential empty categories

          // Secondary sort by name if categories are equal
          if (comparison === 0) {
            comparison = a.name.localeCompare(b.name);
          }
        }

        return this.sortOrder === 'asc' ? comparison : -comparison;
      });

      return result;
    }
  },
  methods: {
    ...mapActions(useMainStore, ['fetchCommands']),
    toggleSortOrder() {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    }
  },
  mounted() {
    this.fetchCommands();
  },
};
</script>
