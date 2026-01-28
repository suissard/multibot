<template>
    <div class="h-[calc(100vh-4rem)] flex overflow-hidden bg-gray-100 dark:bg-gray-900">
        <!-- Sidebar: Conversation List -->
        <aside class="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
            <div class="p-4 border-b border-gray-200 dark:border-gray-700 space-y-3">
                <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">Conversations</h2>
                <!-- Search Input -->
                <div class="relative">
                    <input type="text" v-model="searchQuery" placeholder="Search conversations..."
                        class="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400">
                    <svg class="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
            </div>
            <div class="flex-1 overflow-y-auto">
                <div v-if="loadingConversations" class="p-4 space-y-4 animate-pulse">
                    <!-- Conversation List Skeleton -->
                    <div v-for="i in 6" :key="i" class="flex items-center space-x-4">
                        <div class="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
                        <div class="flex-1 space-y-2 py-1">
                            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                        </div>
                    </div>
                </div>
                <div v-else-if="filteredConversations.length === 0" class="p-4 text-center text-gray-500">
                    <span v-if="searchQuery">No matching conversations found.</span>
                    <span v-else>No active conversations found.</span>
                </div>
                <ul v-else class="divide-y divide-gray-200 dark:divide-gray-700">
                    <li v-for="conversation in filteredConversations" :key="conversation.channelId"
                        @click="selectConversation(conversation)"
                        class="cursor-pointer p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
                        :class="{ 'bg-indigo-50 dark:bg-gray-700': selectedConversation?.channelId === conversation.channelId }">
                        <div class="flex items-center space-x-4">
                            <div class="flex-shrink-0">
                                <img class="h-10 w-10 rounded-full bg-indigo-500" :src="conversation.avatar" alt=""
                                    @error="handleImageError($event, conversation.username)">
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                    {{ conversation.username }}
                                </p>
                                <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
                                    {{ conversation.channelName }}
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </aside>

        <!-- Main Content: Chat View -->
        <main class="flex-1 flex flex-col min-w-0 bg-white dark:bg-gray-900">
            <div v-if="selectedConversation" class="flex-1 flex flex-col h-full">
                <!-- Chat Header -->
                <div
                    class="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-800 shadow-sm z-10">
                    <div class="flex items-center space-x-3">
                        <img class="h-10 w-10 rounded-full" :src="selectedConversation.avatar" alt=""
                            @error="handleImageError($event, selectedConversation.username)">
                        <div>
                            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                                {{ selectedConversation.username }}
                            </h2>
                            <span class="text-sm text-gray-500 dark:text-gray-400 font-mono">
                                {{ selectedConversation.userId }}
                            </span>
                        </div>
                    </div>
                    <button @click="loadMessages" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>

                <!-- Messages Area -->
                <div class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900 scroll-smooth"
                    ref="messagesContainer">
                    <!-- Skeleton Loader -->
                    <div v-if="loadingMessages" class="space-y-4 animate-pulse">
                        <div v-for="i in 5" :key="i" class="flex flex-col"
                            :class="i % 2 === 0 ? 'items-end' : 'items-start'">
                            <div class="flex items-end space-x-2"
                                :class="i % 2 === 0 ? 'flex-row-reverse space-x-reverse' : ''">
                                <div class="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                                <div class="max-w-[70%] rounded-lg px-4 py-3 bg-gray-200 dark:bg-gray-800 h-16 w-48">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else class="space-y-4">
                        <div v-for="message in messages" :key="message.id" class="flex flex-col"
                            :class="{ 'items-end': message.author.bot, 'items-start': !message.author.bot }">
                            <div class="max-w-[70%] rounded-lg px-4 py-2 shadow-sm relative group"
                                :class="message.author.bot ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600'">

                                <!-- Reply/Embed context visualization could go here -->

                                <p class="whitespace-pre-wrap">{{ message.content }}</p>

                                <!-- Attachments -->
                                <div v-if="message.attachments && message.attachments.length > 0" class="mt-2 space-y-2">
                                    <div v-for="(attachment, idx) in message.attachments" :key="idx">
                                        <img v-if="attachment.type && attachment.type.startsWith('image/')"
                                            :src="attachment.url" @error="handleImageError($event, 'Attachment')"
                                            class="max-w-full rounded-md max-h-60 object-contain bg-black/10" />
                                        <a v-else :href="attachment.url" target="_blank"
                                            class="text-xs underline opacity-75 hover:opacity-100 flex items-center">
                                            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13">
                                                </path>
                                            </svg>
                                            {{ attachment.name }}
                                        </a>
                                    </div>
                                </div>

                                <!-- Embeds -->
                                <div v-if="message.embeds && message.embeds.length > 0" class="mt-2 space-y-2">
                                    <div v-for="(embed, idx) in message.embeds" :key="idx"
                                        class="border-l-4 pl-2 border-gray-400 text-sm opacity-90">
                                        <!-- Simple embed rendering -->
                                        <p v-if="embed.title" class="font-bold">{{ embed.title }}</p>
                                        <p v-if="embed.description">{{ embed.description }}</p>
                                        <img v-if="embed.image" :src="embed.image.url"
                                            @error="handleImageError($event, 'Embed')" class="mt-1 rounded max-h-40" />
                                    </div>
                                </div>

                                <!-- Timestamp -->
                                <div class="text-[10px] mt-1 opacity-70 text-right"
                                    :class="message.author.bot ? 'text-indigo-100' : 'text-gray-400'">
                                    {{ formatTime(message.timestamp) }}
                                    <span v-if="message.author.bot && !message.author.username.includes('Dashboard')"
                                        class="ml-1 font-bold">• {{ message.author.username }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Input Area -->
                <div class="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <div class="flex justify-end mb-2">
                        <button @click="getSuggestion"
                            class="text-xs flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                            Generate Suggestion (AI)
                        </button>
                    </div>
                    <form @submit.prevent="sendMessage" class="flex items-end space-x-2">
                        <div
                            class="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-2 focus-within:ring-2 focus-within:ring-indigo-500 relative">
                            <textarea v-model="newMessage" @keydown.enter.prevent="handleEnter" rows="1"
                                class="w-full bg-transparent border-0 focus:ring-0 text-gray-900 dark:text-gray-100 resize-none max-h-32"
                                placeholder="Type a message to reply..."></textarea>

                            <!-- AI Loading Indicator -->
                            <div v-if="isGenerating"
                                class="absolute inset-0 bg-gray-100/80 dark:bg-gray-700/80 flex items-center justify-center rounded-lg backdrop-blur-[1px] z-10">
                                <div class="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
                                    <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg>
                                    <span class="text-sm font-medium animate-pulse">AI is writing...</span>
                                </div>
                            </div>
                        </div>
                        <button type="submit" :disabled="!newMessage.trim() || sending"
                            class="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition duration-200">
                            <svg v-if="sending" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else
                class="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-500 bg-gray-50 dark:bg-gray-900">
                <svg class="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z">
                    </path>
                </svg>
                <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Select a conversation</h3>
                <p class="mt-1">Choose a user from the sidebar to view the conversation history and reply.</p>
            </div>
        </main>
    </div>
</template>

<script>
import { callApi } from '../services/callApi';
import { useMainStore } from '../stores/main';
import { mapState } from 'pinia';
import SocketService from '../services/socket';


export default {
    name: 'SecretaryView',
    data() {
        return {
            conversations: [],
            selectedConversation: null,
            messages: [],
            newMessage: '',
            searchQuery: '', // Add search query
            loadingConversations: false,
            loadingMessages: false,
            sending: false,
            isGenerating: false,
            refreshInterval: null
        };
    },
    computed: {
        ...mapState(useMainStore, ['selectedBotId']),
        filteredConversations() {
            if (!this.searchQuery) return this.conversations;
            const query = this.searchQuery.toLowerCase();
            return this.conversations.filter(c =>
                c.username.toLowerCase().includes(query) ||
                c.channelName.toLowerCase().includes(query)
            );
        }
    },
    watch: {
        selectedBotId: {
            handler(newVal) {
                if (newVal) this.loadConversations();
            },
            immediate: true
        }
    },
    methods: {
        async loadConversations() {
            if (!this.selectedBotId) return;
            this.loadingConversations = true;
            try {
                this.conversations = await callApi('getSecretaryConversations', this.selectedBotId);
            } catch (e) {
                console.error('Failed to load conversations', e);
            } finally {
                this.loadingConversations = false;
            }
        },
        async selectConversation(conversation) {
            this.selectedConversation = conversation;
            this.messages = []; // Clear messages immediately for loading state
            await this.loadMessages();
            this.scrollToBottom();
        },
        async loadMessages() {
            if (!this.selectedConversation || !this.selectedBotId) return;
            this.loadingMessages = true;
            try {
                this.messages = await callApi('getSecretaryMessages', this.selectedBotId, this.selectedConversation.channelId);
            } catch (e) {
                console.error('Failed to load messages', e);
            } finally {
                this.loadingMessages = false;
            }
        },
        async sendMessage() {
            if (!this.newMessage.trim() || !this.selectedBotId || !this.selectedConversation) return;

            const content = this.newMessage;
            this.sending = true;
            try {
                await callApi('replyToSecretaryMessage', this.selectedBotId, this.selectedConversation.channelId, content);
                this.newMessage = '';
                // Optimistic update or refresh
                this.messages.push({
                    id: 'temp-' + Date.now(),
                    content: content,
                    author: {
                        bot: true,
                        username: 'You',
                        avatar: ''
                    },
                    timestamp: Date.now()
                });
                this.scrollToBottom();

                // Refresh to get actual message id and confirmation
                setTimeout(() => this.loadMessages(), 1000);
            } catch (e) {
                console.error('Failed to send message', e);
                // Show error toast
            } finally {
                this.sending = false;
            }
        },
        async getSuggestion() {
            if (!this.selectedBotId || !this.messages || this.messages.length === 0) return;

            this.isGenerating = true;
            try {
                // Load local config
                const config = {};
                const stored = localStorage.getItem('user_gemini_config');
                if (stored) {
                    const localSettings = JSON.parse(stored);
                    if (localSettings.geminiApiKey) config.apiKey = localSettings.geminiApiKey;
                    if (localSettings.geminiModel) config.model = localSettings.geminiModel;
                    if (localSettings.geminiTemperature) config.temperature = localSettings.geminiTemperature;
                }

                const result = await callApi('getSecretarySuggestion', this.selectedBotId, this.messages, config);
                if (result && result.suggestion) {
                    this.newMessage = result.suggestion;
                }
            } catch (e) {
                console.error('Failed to get suggestion', e);
                this.newMessage = "Error generating suggestion.";
            } finally {
                this.isGenerating = false;
            }
        },
        handleEnter(e) {
            if (!e.shiftKey) {
                this.sendMessage();
            }
        },
        formatTime(timestamp) {
            return new Date(timestamp).toLocaleString();
        },
        scrollToBottom() {
            this.$nextTick(() => {
                const container = this.$refs.messagesContainer;
                if (container) {
                    container.scrollTop = container.scrollHeight;
                }
            });
        },
        handleImageError(event, fallbackName) {
            // Prevent infinite loop if fallback fails
            if (event.target.dataset.error) return;
            event.target.dataset.error = true;

            // Use UI Avatars as robust fallback
            event.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(fallbackName || 'User') + '&background=random';
        }
    },
    async mounted() {
        // Initialize socket connection
        SocketService.connect();

        // Listen for new messages
        SocketService.on('secretaryMessage', (data) => {
            console.log('[SecretaryView] ws event received:', data);
            if (data.botId !== this.selectedBotId) return;

            // Update messages if conversation is open
            if (this.selectedConversation && this.selectedConversation.channelId === data.channelId) {
                console.log('[SecretaryView] Updating conversation messages');
                // Avoid duplication if message ID already exists (e.g. from optimistic update)
                // Note: Messages from backend might have different ID structure initially or temporary IDs
                const exists = this.messages.some(m => m.id === data.message.id);
                if (!exists) {
                    this.messages.push(data.message);
                    this.scrollToBottom();
                } else {
                    console.log('[SecretaryView] Message already exists');
                }
            } else {
                console.log('[SecretaryView] Conversation not open or channel mismatch', this.selectedConversation?.channelId, data.channelId);
            }

            // Refresh conversation list to show new activity/unread (if we had unread status specific logic)
            // For now, just re-fetching conversations is safe and ensures top sorting if backend sorts by recency
            this.loadConversations();
        });
    },
    beforeUnmount() {
        SocketService.off('secretaryMessage');
        // We might want to keep the socket connected globally, but removing listener is good practice
    }
};
</script>
