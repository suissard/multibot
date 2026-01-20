<template>
    <div class="selector-message space-y-2">
        <!-- Channel Selector (which includes Guild Selector) -->
        <!-- We need to hack ChannelSelector to expose its guild selector? Or Reimplement? -->
        <!-- Reimplementing efficiently by composing -->
        <GuildSelector @select="onGuildSelected" />

        <div v-if="guildId" class="animate-fade-in">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Channel</label>
            <select v-if="!loadingChannels" v-model="selectedChannelId" @change="onChannelSelected"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white">
                <option value="" disabled>Select a Channel</option>
                <option v-for="channel in channels" :key="channel.id" :value="channel.id">
                    #{{ channel.name }}
                </option>
            </select>
            <div v-else class="text-sm text-gray-500">Loading channels...</div>
        </div>

        <!-- Message Selector -->
        <div v-if="selectedChannelId" class="animate-fade-in">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message (Last 50)</label>
            <div v-if="loadingMessages" class="text-sm text-gray-500">Loading messages...</div>
            <div v-else class="space-y-2 max-h-60 overflow-y-auto border rounded p-2 dark:border-gray-600">
                <div v-for="msg in messages" :key="msg.id" @click="selectMessage(msg)"
                    class="p-2 border rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-xs"
                    :class="{ 'border-blue-500 bg-blue-50 dark:bg-blue-900': selectedMessageId === msg.id, 'border-gray-200 dark:border-gray-700': selectedMessageId !== msg.id }">
                    <div class="flex justify-between font-bold text-gray-600 dark:text-gray-400">
                        <span>{{ msg.author.username }}</span>
                        <span>{{ new Date(msg.createdAt).toLocaleTimeString() }}</span>
                    </div>
                    <div class="truncate text-gray-800 dark:text-gray-200">{{ msg.content }}</div>
                    <div v-if="msg.embeds" class="text-gray-400 italic">[Embed]</div>
                </div>
                <div v-if="messages.length === 0" class="text-gray-500">No messages found.</div>
            </div>
            <!-- Hidden Input for binding/display -->
            <input type="hidden" v-model="selectedMessageId">
        </div>
    </div>
</template>

<script>
import { callApi } from '@/services/callApi';
import { useMainStore } from '@/stores/main';
import GuildSelector from './GuildSelector.vue';

export default {
    name: 'MessageSelector',
    components: { GuildSelector },
    data() {
        return {
            guildId: null,
            channels: [],
            selectedChannelId: '',

            messages: [],
            selectedMessageId: '',

            loadingChannels: false,
            loadingMessages: false
        };
    },
    methods: {
        async onGuildSelected(guildId) {
            this.guildId = guildId;
            this.selectedChannelId = '';
            this.channels = [];
            this.clearMessages();
            await this.fetchChannels();
        },
        async fetchChannels() {
            if (!this.guildId) return;
            const store = useMainStore();
            this.loadingChannels = true;
            try {
                this.channels = await callApi('getChannels', store.selectedBotId, this.guildId);
            } catch (e) {
                console.error(e);
            } finally {
                this.loadingChannels = false;
            }
        },
        async onChannelSelected() {
            this.clearMessages();
            await this.fetchMessages();
        },
        async fetchMessages() {
            if (!this.selectedChannelId) return;
            const store = useMainStore();
            this.loadingMessages = true;
            try {
                this.messages = await callApi('getMessages', store.selectedBotId, this.selectedChannelId);
            } catch (e) {
                console.error(e);
            } finally {
                this.loadingMessages = false;
            }
        },
        selectMessage(msg) {
            this.selectedMessageId = msg.id;
            this.emitSelection();
        },
        clearMessages() {
            this.messages = [];
            this.selectedMessageId = '';
        },
        emitSelection() {
            this.$emit('input', this.selectedMessageId);
            this.$emit('select', this.selectedMessageId);
        }
    }
};
</script>
