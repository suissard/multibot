<template>
  <div class="data-editor p-4 border border-gray-300 dark:border-gray-700 rounded-lg">
    <h2 class="text-2xl font-bold mb-4">Edit Data</h2>
    <form @submit.prevent="saveData">
      <div v-for="(value, key) in editableData" :key="key" class="mb-4">
        <label :for="key" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize">{{
          formatLabel(key) }}</label>

        <!-- Boolean -->
        <div v-if="typeof value === 'boolean'" class="flex items-center">
          <input type="checkbox" :id="key" v-model="editableData[key]"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
          <label :for="key" class="ml-2 block text-sm text-gray-900 dark:text-gray-100">Enabled</label>
        </div>

        <!-- IDs (Smart Selectors) -->
        <div v-else-if="getSelectorComponent(key)"
          class="border p-2 rounded bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
          <!-- Use Dynamic Component -->
          <component :is="getSelectorComponent(key)" v-model="editableData[key]" />
          <!-- Fallback Text Input (hidden mostly, or visible for manual override?) -->
          <div class="mt-2 text-xs text-right">
            <span class="text-gray-500 mr-2">Or enter ID manually:</span>
            <input type="text" v-model="editableData[key]" class="w-32 px-1 py-0.5 border rounded text-xs">
          </div>
        </div>

        <!-- Generic IDs (no smart selector match) -->
        <input v-else-if="isIdField(key)" type="text" :id="key" v-model="editableData[key]"
          placeholder="123456789012345678"
          class="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono">

        <!-- Strings -->
        <input v-else-if="typeof value === 'string'" type="text" :id="key" v-model="editableData[key]"
          class="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">

        <!-- Numbers -->
        <input v-else-if="typeof value === 'number'" type="number" :id="key" v-model="editableData[key]"
          class="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">

        <!-- Objects/Arrays (TextArea fallback with validation hint) -->
        <div v-else>
          <textarea :id="key" v-model="editableData[key]" rows="4"
            class="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono text-xs"></textarea>
          <p class="text-xs text-gray-500 mt-1">JSON format required for objects/arrays.</p>
        </div>
      </div>
      <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save</button>
    </form>
  </div>
</template>

<script>
import GuildSelector from './selectors/GuildSelector.vue';
import ChannelSelector from './selectors/ChannelSelector.vue';
import RoleSelector from './selectors/RoleSelector.vue';
import MemberSelector from './selectors/MemberSelector.vue';
import MessageSelector from './selectors/MessageSelector.vue';

export default {
  name: 'DataEditor',
  components: {
    GuildSelector,
    ChannelSelector,
    RoleSelector,
    MemberSelector,
    MessageSelector
  },
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
        // Try to parse fields that look like JSON but are stored as strings in editableData (from textarea)
        if (typeof this.editableData[key] === 'string' && (this.editableData[key].startsWith('{') || this.editableData[key].startsWith('['))) {
          try {
            dataToSave[key] = JSON.parse(this.editableData[key]);
          } catch (e) {
            // Ignore, keep as string
          }
        }
      }
      this.$emit('save', dataToSave);
    },
    formatLabel(key) {
      return key.replace(/([A-Z])/g, ' $1').trim();
    },
    isIdField(key) {
      return key.toLowerCase().endsWith('id');
    },
    getSelectorComponent(key) {
      const lowerKey = key.toLowerCase();
      if (lowerKey.endsWith('guildid')) return 'GuildSelector';
      if (lowerKey.endsWith('channelid')) return 'ChannelSelector';
      if (lowerKey.endsWith('roleid')) return 'RoleSelector';
      if (lowerKey.endsWith('userid') || lowerKey.endsWith('memberid') || lowerKey.endsWith('authorid')) return 'MemberSelector';
      if (lowerKey.endsWith('messageid')) return 'MessageSelector';
      return null;
    }
  },
};
</script>
