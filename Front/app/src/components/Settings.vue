<template>
  <div class="settings p-8">
    <h1 class="text-3xl font-bold mb-6">Settings</h1>
    <div v-if="loading" class="text-gray-600 dark:text-gray-400">Loading...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>
    <div v-if="settings">
      <DataEditor :data="settings" @save="handleSave" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DataEditor from './DataEditor.vue';

export default {
  name: 'SettingsPage',
  components: {
    DataEditor,
  },
  data() {
    return {
      settings: null,
      loading: true,
      error: null,
    };
  },
  async created() {
    await this.fetchSettings();
  },
  methods: {
    async fetchSettings() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('/api/settings', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('api_token')}`
          }
        });
        this.settings = response.data;
      } catch (err) {
        this.error = 'Failed to load settings.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async handleSave(updatedSettings) {
      try {
        await axios.put('/api/settings', updatedSettings, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('api_token')}`
          }
        });
        // Refresh data after save
        await this.fetchSettings();
        // Optionally, show a success message
        alert('Settings saved successfully!');
      } catch (err) {
        this.error = 'Failed to save settings.';
        console.error(err);
        alert('Error saving settings.');
      }
    },
  },
};
</script>
