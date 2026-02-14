<template>
  <div class="settings p-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Settings</h1>

      <!-- File Selector -->
      <div class="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
        <button @click="fileType = 'bot'" class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
          :class="fileType === 'bot' ? 'bg-white dark:bg-gray-600 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'">
          Bot Settings
        </button>
        <button @click="fileType = 'api'" class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
          :class="fileType === 'api' ? 'bg-white dark:bg-gray-600 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'">
          API Settings
        </button>
      </div>
    </div>

    <div v-if="loading" class="text-gray-600 dark:text-gray-400">Loading...</div>
    <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>

    <div v-if="settings" :key="fileType">
      <DataEditor :data="settings" @save="handleSave" />
    </div>

    <!-- Local Settings Section -->
    <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
      <h2 class="text-2xl font-bold mb-4">Local Settings (Browser)</h2>
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Gemini API Key</label>
            <input type="password" v-model="localSettings.geminiApiKey" placeholder="Start with API Key..."
              class="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <p class="text-xs text-gray-500 mt-1">Stored only in your browser. Leave empty to use server default.</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Model Name</label>
            <select v-model="localSettings.geminiModel"
              class="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="gemini-flash-latest">Gemini Flash Latest (Recommended)</option>
              <option value="gemini-pro-latest">Gemini Pro Latest</option>
              <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
              <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
              <option value="gemini-3-pro-preview">Gemini 3 Pro Preview</option>
              <option value="gemini-3-flash-preview">Gemini 3 Flash Preview</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Temperature ({{
              localSettings.geminiTemperature }})</label>
            <input type="range" v-model="localSettings.geminiTemperature" min="0" max="1" step="0.1"
              class="mt-1 block w-full">
            <div class="flex justify-between text-xs text-gray-500">
              <span>Precise (0.0)</span>
              <span>Creative (1.0)</span>
            </div>
          </div>
          <button @click="saveLocalSettings"
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">Save Local
            Settings</button>
        </div>
      </div>
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
      fileType: 'bot', // 'bot' or 'api'
      localSettings: {
        geminiApiKey: '',
        geminiModel: 'gemini-flash-latest',
        geminiTemperature: 0.7
      }
    };
  },
  watch: {
    fileType() {
      this.fetchSettings();
    }
  },
  async created() {
    await this.fetchSettings();
  },
  methods: {
    async fetchSettings() {
      this.loading = true;
      this.error = null;
      this.settings = null;
      try {
        const response = await axios.get('/settings', {
          params: { file: this.fileType },
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
        await axios.put('/settings', updatedSettings, {
          params: { file: this.fileType },
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
    loadLocalSettings() {
      const stored = localStorage.getItem('user_gemini_config');
      if (stored) {
        try {
          this.localSettings = { ...this.localSettings, ...JSON.parse(stored) };
        } catch (e) {
          console.error('Failed to parse local settings', e);
        }
      }
    },
    saveLocalSettings() {
      localStorage.setItem('user_gemini_config', JSON.stringify(this.localSettings));
      alert('Local settings saved!');
    }
  },
  mounted() {
    this.loadLocalSettings();
  }
};
</script>
