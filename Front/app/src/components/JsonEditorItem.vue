<template>
  <div class="json-editor-item" :style="{ marginLeft: depth > 0 ? '20px' : '0' }">
    <!-- Header for this item (Row) -->
    <div class="flex items-center mb-1 group">

      <!-- Toggle Button (always visible if nested) -->
      <button v-if="isNested" @click.stop="toggle" type="button"
        class="mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none transition-transform duration-200"
        :class="{ 'transform rotate-90': expanded }">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
          <path d="M6 6L14 10L6 14V6Z" />
        </svg>
      </button>
      <div v-else class="w-5"></div> <!-- Spacer for alignment -->

      <!-- VIEW MODE -->
      <div v-if="!isEditing" class="flex items-center flex-grow cursor-pointer" @click="handleRowClick">
        <!-- Label -->
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2 flex items-center">
          {{ fieldKey }}:
          <!-- Key Help (Index 0) -->
          <div v-if="descriptionNode && descriptionNode[0]" class="group relative ml-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 hover:text-blue-500" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div
              class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
              {{ descriptionNode[0] }}
              <div
                class="absolute top-100 left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900">
              </div>
            </div>
          </div>
        </span>

        <!-- Preview Value (truncated or summary) -->
        <span class="text-sm text-gray-600 dark:text-gray-400 mr-2 truncate max-w-xs">
          <span v-if="isNested">
            <span class="text-xs px-1.5 py-0.5 rounded border"
              :class="isArray ? 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700' : 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'">
              {{ isArray ? `Array [${modelValue.length}]` : 'Object' }}
            </span>
          </span>
          <span v-else-if="type === 'boolean'" :class="modelValue ? 'text-green-600' : 'text-red-600'">
            {{ modelValue }}
          </span>
          <span v-else>
            {{ modelValue }}
          </span>
        </span>

        <!-- Pencil Icon (Visible on hover or if selected?) -->
        <button @click.stop="startEdit"
          class="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-gray-400 hover:text-indigo-500 p-1"
          title="Edit">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      </div>

      <!-- EDIT MODE -->
      <div v-else
        class="flex items-start flex-grow bg-gray-50 dark:bg-gray-800 p-1 rounded border border-indigo-300 ring-2 ring-indigo-200">
        <!-- Key Input -->
        <div class="mt-1">
          <input v-if="!isRoot" v-model="editKey"
            class="text-sm border-gray-300 rounded mr-2 px-1 py-0.5 w-32 dark:bg-gray-700 dark:text-white"
            placeholder="Key">
          <span v-else class="text-sm font-bold mr-2 inline-block py-0.5">{{ fieldKey }}:</span>
        </div>

        <!-- Value Input -->
        <div class="flex-grow">
          <!-- Nested / JSON Edit -->
          <div v-if="isNested">
            <textarea v-model="editValue" :rows="textAreaRows"
              class="w-full text-xs font-mono border-gray-300 rounded dark:bg-gray-700 dark:text-white p-1"
              style="max-height: 600px; min-height: 100px;"></textarea>
          </div>

          <!-- Primitive / Smart Selector -->
          <div v-else class="mt-1">
            <!-- Smart Selector -->
            <div v-if="selectorComponent">
              <GuildSelector v-if="selectorComponent === 'GuildSelector'" v-model="editValue" />
              <ChannelSelector v-else-if="selectorComponent === 'ChannelSelector'" v-model="editValue" />
              <RoleSelector v-else-if="selectorComponent === 'RoleSelector'" v-model="editValue" />
              <MemberSelector v-else-if="selectorComponent === 'MemberSelector'" v-model="editValue" />
              <MessageSelector v-else-if="selectorComponent === 'MessageSelector'" v-model="editValue" />

              <!-- Fallback ID Input -->
              <div class="mt-1 flex items-center">
                <span class="text-xs text-gray-500 mr-2">Or ID:</span>
                <input v-model="editValue"
                  class="text-xs border-gray-300 rounded px-1 py-0.5 w-full dark:bg-gray-700 dark:text-white">
              </div>
            </div>

            <!-- Standard Inputs -->
            <template v-else>
              <input v-if="type === 'boolean'" type="checkbox" v-model="editValue">
              <input v-else-if="type === 'number'" type="number" v-model.number="editValue"
                class="text-sm border-gray-300 rounded px-1 py-0.5 w-full dark:bg-gray-700 dark:text-white">

              <!-- Auto-expanding Textarea for Strings -->
              <textarea v-else v-model="editValue" ref="autoSizeTextarea" @input="adjustHeight"
                class="text-sm border-gray-300 rounded px-1 py-0.5 w-full dark:bg-gray-700 dark:text-white resize-none overflow-hidden"
                rows="1" style="min-height: 30px;"></textarea>
            </template>
          </div>
        </div>

        <!-- JSON Indicator -->
        <span v-if="isNested || isValidJson" class="text-xs italic ml-2 w-16 text-center mt-1"
          :class="isValidJson ? 'text-green-600 font-bold' : 'text-gray-400'">
          {{ isValidJson ? 'JSON ✓' : (isNested ? 'JSON' : '') }}
        </span>

        <!-- Actions -->
        <div class="flex flex-col ml-2 mt-1">
          <button @click="saveEdit" class="text-green-600 hover:text-green-800 mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd" />
            </svg>
          </button>
          <button @click="cancelEdit" class="text-red-500 hover:text-red-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Help / Example Panel (Visible in Edit Mode) -->
    <div v-if="isEditing && descriptionNode"
      class="mt-1 mb-2 ml-1 p-2 bg-blue-50 dark:bg-blue-900 border border-blue-100 dark:border-blue-800 rounded text-xs text-blue-800 dark:text-blue-100">
      <div v-if="descriptionNode[1]"><strong>Info:</strong> {{ descriptionNode[1] }}</div>
      <div v-if="descriptionNode[2]"
        class="mt-1 font-mono bg-white dark:bg-gray-800 p-1 rounded border border-gray-200 dark:border-gray-700">
        <strong>Ex:</strong> {{ descriptionNode[2] }}
      </div>
    </div>

    <!-- Children (Recursive) -->
    <div v-if="expanded && isNested" class="ml-2 border-l-2 border-gray-200 dark:border-gray-700 pl-2">
      <!-- ... existing children loop ... -->
      <json-editor-item v-for="(val, k) in modelValue" :key="k" :field-key="k" :model-value="val" :depth="depth + 1"
        :module-id="moduleId" :description-node="getChildDescription(k)" @update:modelValue="onChildUpdate(k, $event)"
        @renameKey="onChildRename(k, $event)" />

      <button v-if="Array.isArray(modelValue)" @click="addItemToArray" type="button"
        class="ml-6 mt-2 text-xs text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
        + Add Item
      </button>

      <button v-if="!Array.isArray(modelValue) && isNested" @click="addItemToObject" type="button"
        class="ml-6 mt-2 text-xs text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
        + Add Entry
      </button>
    </div>
  </div>
</template>

<script>
// Import selectors directly or via a mixin/plugin if global. 
import GuildSelector from './selectors/GuildSelector.vue';
import ChannelSelector from './selectors/ChannelSelector.vue';
import RoleSelector from './selectors/RoleSelector.vue';
import MemberSelector from './selectors/MemberSelector.vue';
import MessageSelector from './selectors/MessageSelector.vue';

export default {
  name: 'JsonEditorItem',
  components: {
    GuildSelector,
    ChannelSelector,
    RoleSelector,
    MemberSelector,
    MessageSelector
  },
  props: {
    modelValue: {
      required: true
    },
    fieldKey: {
      type: [String, Number],
      default: ''
    },
    depth: {
      type: Number,
      default: 0
    },
    isRoot: {
      type: Boolean,
      default: false
    },
    descriptionNode: {
      type: Array,
      default: null
    },
    moduleId: {
      type: String,
      default: null
    }
  },
  emits: ['update:modelValue', 'renameKey'],
  data() {
    return {
      expanded: false,
      isEditing: false,
      editKey: '',
      editValue: null
    };
  },
  computed: {
    type() {
      return typeof this.modelValue;
    },
    isArray() {
      return Array.isArray(this.modelValue);
    },
    isNested() {
      return this.modelValue !== null && (this.type === 'object' || this.isArray);
    },
    selectorComponent() {
      return this.getSelectorComponent(this.fieldKey);
    },
    textAreaRows() {
      if (!this.editValue || typeof this.editValue !== 'string') return 5;
      const lines = this.editValue.split('\n').length;
      return Math.min(Math.max(lines, 5), 30); // 30 lines * ~20px = 600px
    },
    isValidJson() {
      if (!this.editValue || typeof this.editValue !== 'string') return false;
      try {
        JSON.parse(this.editValue);
        return true;
      } catch (e) {
        return false;
      }
    }
  },
  watch: {
    isEditing(val) {
      if (val) {
        // Delay adding listener to prevent immediate closing from the click that started edit
        setTimeout(() => {
          document.addEventListener('click', this.handleClickOutside);
        }, 0);
      } else {
        document.removeEventListener('click', this.handleClickOutside);
      }
    }
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    handleClickOutside(event) {
      // If clicking outside this component, cancel edit
      if (this.$el && !this.$el.contains(event.target)) {
        this.cancelEdit();
      }
    },
    toggle() {
      this.expanded = !this.expanded;
    },
    handleRowClick() {
      if (this.isNested) {
        this.toggle();
      } else {
        this.startEdit();
      }
    },
    startEdit() {
      this.editKey = this.fieldKey;
      if (this.isNested) {
        this.editValue = JSON.stringify(this.modelValue, null, 2);
      } else {
        this.editValue = this.modelValue;
      }
      this.isEditing = true;
      // Adjust height on start if it's a textarea
      this.$nextTick(() => {
        if (this.$refs.autoSizeTextarea) {
          this.adjustHeight({ target: this.$refs.autoSizeTextarea });
        }
      });
    },
    adjustHeight(event) {
      const element = event.target;
      element.style.height = 'auto';
      element.style.height = element.scrollHeight + 'px';
    },
    saveEdit() {
      // 1. Check if key changed
      if (String(this.editKey) !== String(this.fieldKey)) {
        this.$emit('renameKey', { oldKey: this.fieldKey, newKey: this.editKey });
      }

      let newValue = this.editValue;

      // 2. Parse if nested (JSON string) OR if detected as valid JSON
      if (this.isNested || (typeof this.editValue === 'string' && this.isValidJson)) {
        try {
          // If it was a primitive string but now contains valid JSON, try to parse it
          // However, we want to allow saving simple strings that might happen to be valid JSON (like "123") as strings 
          // if the user didn't intend to change type? 
          // But usually in this context, valid JSON syntax usually implies intent.
          // Let's parse it.
          const parsed = JSON.parse(this.editValue);

          // Only switch to Object/Array if the result is actually an Object/Array
          // This prevents converting "123" to number 123 automatically unless we really want that type inference.
          // But strict JSON "123" is a number. 
          // Let's assume if it parses, we use the parsed value.
          newValue = parsed;
        } catch (e) {
          if (this.isNested) {
            alert("Invalid JSON format. Please fix the JSON before saving.");
            return;
          }
          // If not nested, we just keep it as string if parse fails (shouldn't happen due to isValidJson check)
        }
      }

      // 3. Check for value changes
      // Use JSON.stringify for deep comparison if needed, or just simple check for primitives
      // For nested (which we just parsed), comparing stringified versions is simplest way to check for change
      const isChanged = this.isNested
        ? JSON.stringify(newValue) !== JSON.stringify(this.modelValue)
        : newValue !== this.modelValue;

      if (isChanged) {
        this.$emit('update:modelValue', newValue);
      }

      this.isEditing = false;
    },
    cancelEdit() {
      this.isEditing = false;
    },
    formatLabel(key) {
      if (typeof key === 'number') return `Item ${key}`;
      return String(key).replace(/([A-Z])/g, ' $1').trim();
    },
    getSelectorComponent(key) {
      const lowerKey = String(key).toLowerCase();
      if (lowerKey.endsWith('guildid')) return 'GuildSelector';
      if (lowerKey.endsWith('channelid')) return 'ChannelSelector';
      if (lowerKey.endsWith('roleid')) return 'RoleSelector';
      if (lowerKey.endsWith('userid') || lowerKey.endsWith('memberid') || lowerKey.endsWith('authorid')) return 'MemberSelector';
      if (lowerKey.endsWith('messageid')) return 'MessageSelector';
      return null;
    },
    isIdField(key) {
      return String(key).toLowerCase().endsWith('id');
    },
    onChildUpdate(key, newValue) {
      let newValueStructure;
      if (Array.isArray(this.modelValue)) {
        newValueStructure = [...this.modelValue];
        newValueStructure[key] = newValue;
      } else {
        newValueStructure = { ...this.modelValue, [key]: newValue };
      }
      this.$emit('update:modelValue', newValueStructure);
    },
    onChildRename(key, { oldKey, newKey }) {
      if (Array.isArray(this.modelValue)) return; // No renaming array indices

      // Reconstruct Object maintaining order
      const entries = Object.entries(this.modelValue);
      const index = entries.findIndex(([k]) => k === oldKey);

      if (index !== -1) {
        entries[index] = [newKey, this.modelValue[oldKey]]; // Rename key, keep value
        const newObj = Object.fromEntries(entries);
        this.$emit('update:modelValue', newObj);
      }
    },
    addItemToArray() {
      if (!Array.isArray(this.modelValue)) return;

      const newArr = [...this.modelValue];
      let newItem = '';
      if (newArr.length > 0) {
        const lastItem = newArr[newArr.length - 1];
        if (typeof lastItem === 'object' && lastItem !== null) {
          newItem = JSON.parse(JSON.stringify(lastItem));
        } else {
          newItem = typeof lastItem === 'number' ? 0 : '';
        }
      }
      newArr.push(newItem);
      this.$emit('update:modelValue', newArr);
    },
    addItemToObject() {
      if (Array.isArray(this.modelValue) || typeof this.modelValue !== 'object' || this.modelValue === null) return;

      const newKeyName = prompt("Enter new key name:");
      if (!newKeyName) return;

      if (Object.prototype.hasOwnProperty.call(this.modelValue, newKeyName)) {
        alert("Key already exists!");
        return;
      }

      const newObj = { ...this.modelValue, [newKeyName]: "" };
      this.$emit('update:modelValue', newObj);
    },
    getChildDescription(key) {
      // descriptionNode[3] is the nested structure map
      if (this.descriptionNode && this.descriptionNode[3]) {
        // Check for exact match
        if (this.descriptionNode[3][key]) {
          return this.descriptionNode[3][key];
        }
        // Check for wildcard '*' (e.g. for dynamic IDs)
        if (this.descriptionNode[3]['*']) {
          return this.descriptionNode[3]['*'];
        }
      }
      return null;
    }
  }
}
</script>
