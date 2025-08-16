<template>
  <div class="command-list p-8">
    <h1 class="text-3xl font-bold mb-6">Command List</h1>
    <div v-if="loading">Loading...</div>
    <ul class="space-y-4" v-else>
      <li v-for="command in commands" :key="command.name">
        <strong>{{ command.name }}</strong>: {{ command.description }}
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
