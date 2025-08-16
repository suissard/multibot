<template>
  <div class="command-list">
    <h1>Command List</h1>
    <div v-if="loading">Loading...</div>
    <ul v-else>
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

<style scoped>
.command-list {
  text-align: left;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 10px 0;
}
</style>
