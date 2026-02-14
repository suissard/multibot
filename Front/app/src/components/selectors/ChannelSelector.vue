<template>
    <div class="selector-channel space-y-2">
        <!-- Guild Selector First -->
        <GuildSelector @select="onGuildSelected" />

        <!-- Channel Selector -->
        <div v-if="guildId" class="animate-fade-in">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Channel ({{ channelTypeFilter
                }})</label>
            <SearchableSelect v-if="!loading" v-model="selectedChannelId" :options="channelOptions"
                placeholder="Select a Channel" @update:modelValue="emitSelection" />
            <div v-else class="text-sm text-gray-500">Loading channels...</div>
        </div>
    </div>
</template>

<script>
import { callApi } from '@/services/callApi';
import { useMainStore } from '@/stores/main';
import GuildSelector from './GuildSelector.vue';
import SearchableSelect from '../SearchableSelect.vue';

export default {
    name: 'ChannelSelector',
    components: { GuildSelector, SearchableSelect },
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
        },
        channelOptions() {
            return this.channels.map(c => ({
                id: c.id,
                label: '#' + c.name
            }));
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
        emitSelection(val) {
            if (val && typeof val !== 'object') this.selectedChannelId = val;
            this.$emit('select', this.selectedChannelId);
            // Also emit full object if needed, but ID is primary
            this.$emit('input', this.selectedChannelId); // Support v-model like behavior
        }
    }
};
</script>
