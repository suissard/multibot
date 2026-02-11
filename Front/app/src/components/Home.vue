<template>
    <div class="home p-8">
        <h1 class="text-4xl font-bold mb-4">Dashboard</h1>

        <!-- Backend Status Section -->
        <div class="mb-8 p-4 rounded-lg shadow-md flex items-center gap-4" :class="statusClass">
            <div class="text-3xl">
                <span v-if="connectionStatus === 'connected'">✅</span>
                <span v-else-if="connectionStatus === 'error'">❌</span>
                <span v-else>⏳</span>
            </div>
            <div>
                <h2 class="text-xl font-bold">Backend Connection</h2>
                <p v-if="connectionStatus === 'connected'" class="text-green-800 dark:text-green-200">Successfully
                    connected to API</p>
                <p v-else-if="connectionStatus === 'error'" class="text-red-800 dark:text-red-200">Connection Failed</p>
                <p v-else class="text-gray-600">Checking connection...</p>
            </div>
        </div>

        <!-- Bots List Section -->
        <div v-if="connectionStatus === 'connected'" class="mt-8">
            <h2 class="text-2xl font-bold mb-4">Available Bots</h2>
            <div v-if="bots.length === 0" class="text-gray-500">No bots found.</div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="bot in bots" :key="bot.id" @click="selectBotHandler(bot.id)"
                    class="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-lg shadow border transition-all duration-200"
                    :class="{ 'border-green-500 ring-2 ring-green-200 dark:ring-green-900': bot.id === selectedBotId, 'border-gray-200 dark:border-gray-700 hover:border-indigo-300': bot.id !== selectedBotId }">
                    <div class="flex items-center gap-4 mb-4">
                        <img v-if="bot.avatar" :src="bot.avatar" alt="Avatar" class="w-12 h-12 rounded-full">
                        <div v-else
                            class="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xl">
                            {{ (bot.name || 'Unknown').charAt(0).toUpperCase() }}
                        </div>
                        <div>
                            <h3 class="text-xl font-bold">{{ bot.name }}</h3>
                            <p class="text-xs text-gray-500 font-mono">{{ bot.id }}</p>
                        </div>
                    </div>
                    <div class="mt-4 flex justify-between items-center">
                        <span
                            class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">Active</span>
                        <span v-if="bot.id === selectedBotId" class="text-green-600 font-bold text-sm">Selected</span>
                    </div>

                    <div v-if="bot.id === selectedBotId"
                        class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <router-link to="/commands"
                            class="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition">
                            Manage Commands
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useMainStore } from '../stores/main';
import { mapState, mapActions } from 'pinia';

export default {
    name: 'HomeView',
    data() {
        return {
            connectionStatus: 'pending', // pending, connected, error
        };
    },
    computed: {
        ...mapState(useMainStore, ['bots', 'selectedBotId']),
        statusClass() {
            if (this.connectionStatus === 'connected') return 'bg-green-100 dark:bg-green-900 border border-green-300';
            if (this.connectionStatus === 'error') return 'bg-red-100 dark:bg-red-900 border border-red-300';
            return 'bg-gray-100 dark:bg-gray-800 border border-gray-300';
        }
    },
    methods: {
        ...mapActions(useMainStore, ['fetchBots', 'selectBot']),
        async checkConnection() {
            this.connectionStatus = 'pending';
            try {
                await this.fetchBots();
                this.connectionStatus = 'connected';
            } catch (e) {
                console.error(e);
                this.connectionStatus = 'error';
            }
        },
        selectBotHandler(id) {
            this.selectBot(id);
        }
    },
    mounted() {
        this.checkConnection();
    }
}
</script>
