<template>
    <div class="selector-channel space-y-2">
        <!-- Guild Selector First -->
        <GuildSelector @select="onGuildSelected" />

        <!-- Channel Selector -->
        <div v-if="guildId" class="animate-fade-in">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Channel ({{ channelTypeFilter
                }})</label>
            <select v-if="!loading" v-model="selectedChannelId" @change="emitSelection"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white">
                <option value="" disabled>Select a Channel</option>
                <option v-for="channel in channels" :key="channel.id" :value="channel.id">
                    #{{ channel.name }}
                </option>
            </select>
            <div v-else class="text-sm text-gray-500">Loading channels...</div>
        </div>
    </div>
</template>

<script>
import { callApi } from '@/services/callApi';
import { useMainStore } from '@/stores/main';
import GuildSelector from './GuildSelector.vue';

export default {
    name: 'ChannelSelector',
    components: { GuildSelector },
    props: {
        typeFilter: { // Optional, e.g., 'text', 'voice' but backend currently just returns text
            type: String,
            default: 'text'
        }
    },
    data() {
        return {
            guildId: null,
            channels: [],
            selectedChannelId: '',
            loading: false
        };
    },
    computed: {
        channelTypeFilter() {
            return this.typeFilter;
        }
    },
    methods: {
        async onGuildSelected(guildId) {
            this.guildId = guildId;
            this.selectedChannelId = '';
            this.channels = [];
            await this.fetchChannels();
        },
        async fetchChannels() {
            if (!this.guildId) return;
            const store = useMainStore();
            this.loading = true;
            try {
                this.channels = await callApi('getChannels', store.selectedBotId, this.guildId);
            } catch (e) {
                console.error(e);
            } finally {
                this.loading = false;
            }
        },
        emitSelection() {
            this.$emit('select', this.selectedChannelId);
            // Also emit full object if needed, but ID is primary
            this.$emit('input', this.selectedChannelId); // Support v-model like behavior
        }
    }
};
</script>
