<template>
  <div class="module-data p-8">
    <h1 class="text-3xl font-bold mb-6">Test Data for {{ $route.params.id }}</h1>
    <div v-if="loading" class="text-gray-600 dark:text-gray-400">Loading...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>
    <div class="flex space-x-8">
      <ul v-if="testData.length" class="w-1/3 space-y-4">
        <li v-for="item in testData" :key="item.id" @click="selectDataItem(item)" :class="['cursor-pointer block p-4 rounded-lg', selectedItem && selectedItem.id === item.id ? 'bg-blue-200 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700']">
          <h2 class="text-xl font-semibold">{{ item.id }}</h2>
        </li>
      </ul>
      <div v-if="selectedItem" class="w-2/3">
        <DataEditor :data="selectedItem" @save="handleSave" />
      </div>
    </div>
  </div>
</template>

<script>
import { callApi } from '@/services/callApi';
import DataEditor from './DataEditor.vue';

export default {
  name: 'ModuleData',
  components: {
    DataEditor,
  },
  data() {
    return {
      testData: [],
      selectedItem: null,
      loading: true,
      error: null,
    };
  },
  async created() {
    await this.fetchTestData();
  },
  methods: {
    async fetchTestData() {
      this.loading = true;
      this.error = null;
      const moduleId = this.$route.params.id;
      try {
        this.testData = await callApi('getModuleTestData', moduleId);
      } catch (err) {
        this.error = 'Failed to load test data.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    selectDataItem(item) {
      this.selectedItem = item;
    },
    async handleSave(updatedData) {
      const moduleId = this.$route.params.id;
      const dataId = this.selectedItem.id;
      try {
        await callApi('putModuleTestData', moduleId, dataId, updatedData);
        // Refresh data after save
        await this.fetchTestData();
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
