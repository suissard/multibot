<template>
    <div class="p-8 max-w-7xl mx-auto">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert">
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">{{ error }}</span>
        </div>

        <!-- Content -->
        <div v-else-if="command"
            class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20">

            <!-- Headers -->
            <div class="border-b border-gray-200 dark:border-gray-700 pb-6 mb-8 flex justify-between items-start">
                <div>
                    <h1
                        class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-2">
                        {{ command.name }}</h1>
                    <p class="text-xl text-gray-600 dark:text-gray-300">{{ command.description }}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <span v-if="command.category"
                        class="bg-indigo-100 text-indigo-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-900">{{
                            command.category }}</span>
                </div>
            </div>

            <!-- Main Layout -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <!-- Left Column: Info & Help -->
                <div class="lg:col-span-2 space-y-8">

                    <!-- Usage -->
                    <div v-if="command.howTo" class="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-inner">
                        <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-white flex items-center">
                            <span class="mr-2">📝</span> Usage
                        </h2>
                        <code class="block bg-black text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      {{ command.howTo }}
                  </code>
                    </div>

                    <!-- Help Text -->
                    <div v-if="command.help" class="prose dark:prose-invert max-w-none">
                        <h3 class="text-lg font-bold">Details</h3>
                        <p>{{ command.help }}</p>
                    </div>

                    <!-- Executer Form -->
                    <div
                        class="bg-indigo-50 dark:bg-gray-900 border border-indigo-100 dark:border-gray-700 rounded-xl p-6 mt-8">
                        <h2 class="text-2xl font-bold mb-6 text-indigo-700 dark:text-indigo-400 flex items-center">
                            <span class="mr-2">🚀</span> Execute Command
                        </h2>

                        <!-- Channel Context Selector Removed (Using Global Navbar Selector) -->

                        <form @submit.prevent="executeCommand">
                            <!-- Dynamic Arguments -->
                            <div v-if="command.arguments && command.arguments.length > 0" class="space-y-4 mb-6">
                                <div v-for="arg in command.arguments" :key="arg.name">
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        {{ arg.name }}
                                        <span v-if="arg.required" class="text-red-500">*</span>
                                        <span class="text-xs text-gray-500 ml-2">({{ arg.type }})</span>
                                    </label>
                                    <p class="text-xs text-gray-500 mb-2">{{ arg.description }}</p>

                                    <input v-model="formValues[arg.name]" :required="arg.required"
                                        :placeholder="arg.type === 'user' ? '@User or ID' : 'Enter value...'"
                                        :type="arg.type === 'number' ? 'number' : 'text'"
                                        class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors" />
                                </div>
                            </div>
                            <div v-else class="text-gray-500 italic mb-6">
                                No arguments required for this command.
                            </div>

                            <div class="flex justify-end">
                                <button type="submit" :disabled="executing"
                                    class="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
                                    <span v-if="executing" class="animate-spin mr-2">🔄</span>
                                    {{ executing ? 'Running...' : 'Run on Bot' }}
                                </button>
                            </div>
                        </form>

                        <!-- Execution Result -->
                        <div v-if="executionResult"
                            class="mt-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
                            <h3 class="font-bold text-green-800 dark:text-green-300 mb-2">Result:</h3>
                            <pre
                                class="bg-white dark:bg-black/50 p-2 rounded text-sm font-mono whitespace-pre-wrap">{{ executionResult }}</pre>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Permissions & Metadata -->
                <div class="lg:col-span-1 space-y-6">
                    <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                        <h3 class="font-bold text-gray-900 dark:text-white mb-4 uppercase text-sm tracking-wider">
                            Permissions</h3>

                        <div class="mb-4">
                            <span class="text-xs font-semibold text-gray-500 uppercase">User</span>
                            <div v-if="command.userPermissions && command.userPermissions.length">
                                <span v-for="perm in command.userPermissions" :key="perm"
                                    class="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                                    {{ perm }}
                                </span>
                            </div>
                            <div v-else class="text-sm text-gray-400 italic">None</div>
                        </div>

                        <div>
                            <span class="text-xs font-semibold text-gray-500 uppercase">Bot</span>
                            <div v-if="command.botPermissions && command.botPermissions.length">
                                <span v-for="perm in command.botPermissions" :key="perm"
                                    class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                                    {{ perm }}
                                </span>
                            </div>
                            <div v-else class="text-sm text-gray-400 italic">None</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Navigation -->
            <div class="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
                <router-link to="/commands"
                    class="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                    <span class="mr-2">←</span> Back to Commands List
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { useMainStore } from '../stores/main';
import { mapState, mapActions } from 'pinia';

export default {
    name: 'CommandDetail',
    data() {
        return {
            loading: true,
            error: null,
            formValues: {}, // Stores argument inputs
            executing: false,
            executionResult: null
        };
    },
    computed: {
        ...mapState(useMainStore, ['commands', 'selectedChannelId']),
    },
    methods: {
        ...mapActions(useMainStore, ['fetchCommands', 'runBotCommand']),
        async loadCommand() {
            this.loading = true;
            try {
                if (this.commands.length === 0) {
                    await this.fetchCommands();
                }

                const cmdName = this.$route.params.name;
                this.command = this.commands.find(c => c.name === cmdName || c._id === cmdName);

                if (!this.command) {
                    this.error = "Command not found";
                    return;
                }

                if (this.command.arguments) {
                    this.command.arguments.forEach(arg => {
                        this.formValues[arg.name] = ''; // Default empty
                    });
                }
            } catch (e) {
                this.error = e.message;
            } finally {
                this.loading = false;
            }
        },
        async executeCommand() {
            if (!this.command) return;
            this.executing = true;
            this.executionResult = null;
            try {
                // Filter out empty optional arguments if necessary, or pass them as is.
                // For now, pass all.
                // Channel ID will be handled by store based on selectedChannelId since we pass nothing/null
                const response = await this.runBotCommand(this.command.name || this.command._id, this.formValues);

                // Handle response - assuming API returns something
                console.log('Command execution response:', response);
                if (response && response.result) {
                    this.executionResult = response.result;
                } else {
                    this.executionResult = JSON.stringify(response, null, 2);
                }

            } catch (error) {
                console.error(error);
                this.error = 'Failed to execute command: ' + (error.response?.data?.message || error.message);
            } finally {
                this.executing = false;
            }
        }
    },
    async mounted() {
        await this.loadCommand();
    },
    watch: {
        '$route.params.name': 'loadCommand'
    }
};
</script>
