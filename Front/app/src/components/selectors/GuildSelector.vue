<template>
    <div class="selector-guild">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Guild</label>
        <select v-model="selectedGuildId" @change="emitSelection"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white">
            <option value="" disabled>Select a Guild</option>
            <option v-for="guild in guilds" :key="guild.id" :value="guild.id">
                {{ guild.name }}
            </option>
        </select>
    </div>
</template>

<script>
import { callApi } from '@/services/callApi';
import { useMainStore } from '@/stores/main';

export default {
    name: 'GuildSelector',
    data() {
        return {
            guilds: [],
            selectedGuildId: '',
        };
    },
    async created() {
        await this.fetchGuilds();
    },
    methods: {
        async fetchGuilds() {
            const store = useMainStore();
            if (!store.selectedBotId) return;
            try {
                this.guilds = await callApi('getGuilds', store.selectedBotId);
                // Auto-select if only one
                if (this.guilds.length === 1) {
                    this.selectedGuildId = this.guilds[0].id;
                    this.emitSelection();
                }
            } catch (e) {
                console.error("Error fetching guilds", e);
            }
        },
        emitSelection() {
            this.$emit('select', this.selectedGuildId);
        }
    }
};
</script>
