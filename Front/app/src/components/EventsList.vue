<template>
  <div class="events-list">
    <h1>Events</h1>
    <div v-if="loading">Loading...</div>
    <ul v-else>
      <li v-for="event in events" :key="event.name">
        <strong>{{ event.name }}</strong>: {{ event.description }}
      </li>
    </ul>
  </div>
</template>

<script>
import { useMainStore } from '../stores/main';
import { mapState, mapActions } from 'pinia';

export default {
  name: 'EventsList',
  computed: {
    ...mapState(useMainStore, ['events', 'loading']),
  },
  methods: {
    ...mapActions(useMainStore, ['fetchEvents']),
  },
  mounted() {
    this.fetchEvents();
  },
};
</script>

<style scoped>
.events-list {
  padding: 20px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 10px 0;
}
</style>
