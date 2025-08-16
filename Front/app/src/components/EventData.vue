<template>
  <div class="event-data p-8">
    <h1 class="text-3xl font-bold mb-6">Data for {{ $route.params.eventName }}</h1>
    <div v-if="loading" class="text-gray-600 dark:text-gray-400">Loading...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>
    <div v-if="eventData">
      <DataEditor :data="eventData" @save="handleSave" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DataEditor from './DataEditor.vue';

export default {
  name: 'EventData',
  components: {
    DataEditor,
  },
  data() {
    return {
      eventData: null,
      loading: true,
      error: null,
    };
  },
  async created() {
    await this.fetchEventData();
  },
  methods: {
    async fetchEventData() {
      this.loading = true;
      this.error = null;
      const eventName = this.$route.params.eventName;
      try {
        const response = await axios.get(`/api/events/${eventName}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('api_token')}`
          }
        });
        this.eventData = response.data;
      } catch (err) {
        this.error = 'Failed to load event data.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async handleSave(updatedData) {
      const eventName = this.$route.params.eventName;
      try {
        await axios.post(`/api/events`, { eventName, ...updatedData } , {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('api_token')}`
          }
        });
        // Refresh data after save
        await this.fetchEventData();
        // Optionally, show a success message
        alert('Data saved successfully!');
      } catch (err) {
        this.error = 'Failed to save data.';
        console.error(err);
        alert('Error saving data.');
      }
    },
  },
};
</script>
