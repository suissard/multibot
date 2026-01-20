<template>
  <div class="event-data p-8">
    <h1 class="text-3xl font-bold mb-6">Data for {{ $route.params.eventName }}</h1>
    <div v-if="loading" class="text-gray-600 dark:text-gray-400">Loading...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>
    <div v-if="eventData">
      <div class="flex space-x-4 mb-4">
        <button @click="handleTrigger" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Trigger Event
        </button>
      </div>
      <DataEditor :data="eventData" @save="handleSave" />
    </div>
  </div>
</template>

<script>
import { callApi } from '@/services/callApi';
import { useMainStore } from '../stores/main';
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
        const response = await callApi('getEvent', eventName);
        this.eventData = response.template || {};

      } catch (err) {
        this.error = 'Failed to load event data.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async handleSave(updatedData) {
      try {
        await callApi('postEventData', updatedData);
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
    async handleTrigger() {
      try {
        const store = useMainStore(); // Need to import this if not available, but usually available in scope if setup. Actually need to import.
        const botId = store.selectedBotId;
        const eventName = this.$route.params.eventName;
        const payload = this.eventData; // Using current data as payload

        this.loading = true;
        await callApi('triggerEvent', botId, eventName, payload);
        alert(`Event ${eventName} triggered successfully!`);
      } catch (err) {
        console.error(err);
        alert('Failed to trigger event: ' + (err.message || err));
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
