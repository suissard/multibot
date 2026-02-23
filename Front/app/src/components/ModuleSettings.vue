<template>
  <div class="module-settings p-8">
    <h1 class="text-3xl font-bold mb-6">Module Settings: {{ moduleId }}</h1>

    <div v-if="loading" class="text-gray-600 dark:text-gray-400">Loading...</div>
    <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>

    <div v-if="settings">
      <DataEditor :initialData="settings" :moduleId="moduleId" @save="handleSave" />
    </div>
    <div v-else-if="!loading && !error" class="text-gray-500">
      No configuration found for this module.
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DataEditor from './DataEditor.vue';

export default {
  name: 'ModuleSettings',
  components: {
    DataEditor
  },
  data() {
    return {
      moduleId: this.$route.params.id,
      settings: null,
      loading: true,
      error: null
    };
  },
  async created() {
    await this.fetchSettings();
  },
  methods: {
    async fetchSettings() {
      this.loading = true;
      this.error = null;
      // Assume selectedBotId is stored in localStorage or accessible via a global store/mixin
      // For now, let's try to get it from localStorage which seems to be used in other places
      const botId = localStorage.getItem('selectedBotId');

      if (!botId) {
        this.error = "No bot selected. Please select a bot first.";
        this.loading = false;
        return;
      }

      try {
        const response = await axios.get('/module-settings', {
          params: { bot_id: botId, module_id: this.moduleId },
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('api_token')}`
          }
        });
        this.settings = response.data;
      } catch (err) {
        this.error = 'Failed to load module settings.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async handleSave(updatedSettings) {
      const botId = localStorage.getItem('selectedBotId');
      if (!botId) {
        alert("No bot selected");
        return;
      }

      try {
        await axios.put('/module-settings', updatedSettings, {
          params: { bot_id: botId, module_id: this.moduleId },
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('api_token')}`
          }
        });
        // Refresh data after save
        await this.fetchSettings();
        alert('Settings saved successfully!');
      } catch (err) {
        this.error = 'Failed to save settings.';
        console.error(err);
        alert('Error saving settings.');
      }
    }
  }
}
</script>
