<template>
    <div class="relative" ref="container">
        <div class="relative">
            <input type="text" :value="searchQuery" @input="onInput" @focus="open"
                :placeholder="selectedLabel || placeholder"
                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                :class="{ 'text-gray-900 dark:text-gray-100': true }" />
            <div v-if="isOpen"
                class="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                <div v-if="filteredOptions.length === 0" class="px-4 py-2 text-gray-500 dark:text-gray-400">
                    No results found
                </div>
                <ul v-else>
                    <li v-for="option in filteredOptions" :key="option.id" @click="selectOption(option)"
                        class="px-4 py-2 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/50 text-gray-700 dark:text-gray-200">
                        {{ option.label }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchableSelect',
    props: {
        options: {
            type: Array,
            required: true,
            default: () => []
        },
        modelValue: {
            type: [String, Number],
            default: ''
        },
        placeholder: {
            type: String,
            default: 'Select an option...'
        }
    },
    emits: ['update:modelValue'],
    data() {
        return {
            isOpen: false,
            searchQuery: ''
        };
    },
    computed: {
        filteredOptions() {
            if (!this.searchQuery) return this.options;
            const query = this.searchQuery.toLowerCase();
            return this.options.filter(option =>
                option.label.toLowerCase().includes(query)
            );
        },
        selectedLabel() {
            const selected = this.options.find(o => o.id === this.modelValue);
            return selected ? selected.label : '';
        }
    },
    methods: {
        open() {
            this.isOpen = true;
            this.searchQuery = ''; // Reset search on open to show all, or keep it? user asked "strike letters -> search"
            // If we want to filter by what is typed, we keep blank initially or match current selection?
            // Usually simpler to clear or show all.
        },
        close() {
            this.isOpen = false;
        },
        onInput(event) {
            this.searchQuery = event.target.value;
            this.isOpen = true;
        },
        selectOption(option) {
            this.$emit('update:modelValue', option.id);
            this.searchQuery = option.label; // Update input to show selected label
            this.close();
        },
        handleClickOutside(event) {
            if (this.$refs.container && !this.$refs.container.contains(event.target)) {
                // If closing without selection and searchQuery doesn't match a label, revert or clear?
                // For now, just close. The input display might be out of sync if typed but not selected.
                // Revert input to selected label
                this.searchQuery = this.selectedLabel;
                this.close();
            }
        }
    },
    watch: {
        // Update local search query if external modelValue changes
        modelValue: {
            immediate: true,
            handler() {
                this.searchQuery = this.selectedLabel;
            }
        }
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }
};
</script>
