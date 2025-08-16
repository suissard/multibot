<template>
  <div class="events-list p-8">
    <h1 class="text-3xl font-bold mb-6">Events</h1>
    <div v-if="loading" class="text-gray-600 dark:text-gray-400">Loading...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>
    <ul v-if="events.length" class="space-y-4">
      <li v-for="event in events" :key="event.name">
        <router-link :to="`/events/${event.name}/test-data`" class="block p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
          <h2 class="text-xl font-semibold">{{ event.name }}</h2>
          <p class="text-gray-600 dark:text-gray-400">{{ event.description }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { callApi } from '@/services/callApi';

export default {
  name: 'EventsList',
  data() {
    return {
      events: [],
      loading: true,
      error: null,
    };
  },
  async created() {
    try {
      this.events = await callApi('getEvents');
    } catch (err) {
      this.error = 'Failed to load events.';
      console.error(err);
    } finally {
      this.loading = false;
    }
  },
};
</script>
