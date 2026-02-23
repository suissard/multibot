<template>
  <div class="data-editor p-4 border border-gray-300 dark:border-gray-700 rounded-lg">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">Edit Data</h2>
      <button @click="saveData"
        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">Save Changes</button>
    </div>

    <div class="space-y-1">
      <JsonEditorItem v-for="(value, key) in editableData" :key="key" :field-key="key" :model-value="value"
        :is-root="true" :module-id="moduleId" :description-node="getChildDescription(key)"
        @update:modelValue="updateField(key, $event)" @renameKey="onRename(key, $event)" />
      />
    </div>

    <div class="mt-4">
      <button @click="addRootEntry" type="button"
        class="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">
        + Add Root Entry
      </button>
    </div>
  </div>
</template>

<script>
import JsonEditorItem from './JsonEditorItem.vue';

export default {
  name: 'DataEditor',
  components: {
    JsonEditorItem
  },
  props: {
    moduleId: {
      type: String,
      required: true
    },
    initialData: {
      type: Object,
      required: true // Now expect object directly
    }
  },
  data() {
    return {
      editableData: {},
      configDescriptions: {}
    };
  },
  watch: {
    initialData: {
      immediate: true,
      handler(newVal) {
        this.editableData = newVal ? JSON.parse(JSON.stringify(newVal)) : {};
      }
    }
  },
  async mounted() {
    try {
      // Fetch descriptions from backend
      // Fetch descriptions from backend
      const response = await fetch('/module-descriptions', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('api_token')}`
        }
      });
      console.log('Descriptions fetch status:', response.status);
      if (response.ok) {
        this.configDescriptions = await response.json();
      }
    } catch (e) {
      console.error("Failed to load descriptions", e);
    }
  },
  methods: {
    updateField(key, value) {
      this.editableData[key] = value;
    },
    onRename(oldKey, { newKey }) {
      // Rename at root level
      const entries = Object.entries(this.editableData);
      const index = entries.findIndex(([k]) => k === oldKey);
      if (index !== -1) {
        entries[index] = [newKey, this.editableData[oldKey]];
        this.editableData = Object.fromEntries(entries);
      }
    },
    saveData() {
      this.$emit('save', this.editableData);
    },
    getChildDescription(key) {
      if (!this.moduleId || !this.configDescriptions[this.moduleId]) return null;

      // The root entry for the module (e.g. configDescriptions['AutoRole'])
      // follows [KeyHelp, ValueHelp, Example, NestedStructure]
      const moduleRoot = this.configDescriptions[this.moduleId];

      // Return the node for the specific key from the nested structure (index 3)
      if (moduleRoot[3] && moduleRoot[3][key]) {
        return moduleRoot[3][key];
      } else if (moduleRoot[3] && moduleRoot[3]['*']) {
        // Wildcard fallback if defined
        return moduleRoot[3]['*'];
      }
      return null;
    },
    addRootEntry() {
      const newKeyName = prompt("Enter new key name:");
      if (!newKeyName) return;

      if (Object.prototype.hasOwnProperty.call(this.editableData, newKeyName)) {
        alert("Key already exists!");
        return;
      }

      // Vue 3 reactivity handles direct assignment, but for safety in potential Vue 2 compat or deep watching:
      this.editableData = { ...this.editableData, [newKeyName]: "" };
    }
  }
};
</script>
