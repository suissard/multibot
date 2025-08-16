<template>
  <div class="command-list p-8">
    <h1 class="text-3xl font-bold mb-6">Command List</h1>
    <ul class="space-y-4">
      <li v-for="command in commands" :key="command.id" class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 transform hover:scale-105 transition-transform duration-300">
        <strong class="text-indigo-600 dark:text-indigo-400">{{ command.id }}</strong>: <span class="text-gray-700 dark:text-gray-300">{{ command.description }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CommandList',
  data() {
    return {
      commands: []
    };
  },
  mounted() {
    axios.get('/api/commands')
      .then(response => {
        this.commands = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
}
</script>
