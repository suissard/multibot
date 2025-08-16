<template>
  <div class="data-editor p-4 border border-gray-300 dark:border-gray-700 rounded-lg">
    <h2 class="text-2xl font-bold mb-4">Edit Data</h2>
    <form @submit.prevent="saveData">
      <div v-for="(value, key) in editableData" :key="key" class="mb-4">
        <label :for="key" class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ key }}</label>
        <input v-if="typeof value === 'string' || typeof value === 'number'" type="text" :id="key" v-model="editableData[key]" class="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        <textarea v-else-if="typeof value === 'object'" :id="key" v-model="editableData[key]" rows="5" class="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
      </div>
      <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'DataEditor',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editableData: {},
    };
  },
  watch: {
    data: {
      immediate: true,
      handler(newData) {
        // Deep clone the data to avoid modifying the original object directly
        this.editableData = JSON.parse(JSON.stringify(newData));
        // Stringify object/array fields for editing in textarea
        for (const key in this.editableData) {
          if (typeof this.editableData[key] === 'object' && this.editableData[key] !== null) {
            this.editableData[key] = JSON.stringify(this.editableData[key], null, 2);
          }
        }
      },
    },
  },
  methods: {
    saveData() {
        const dataToSave = { ...this.editableData };
        for (const key in dataToSave) {
            try {
                // Try to parse fields that were stringified
                dataToSave[key] = JSON.parse(dataToSave[key]);
            } catch (e) {
                // Keep as string if not valid JSON
            }
        }
        this.$emit('save', dataToSave);
    },
  },
};
</script>
