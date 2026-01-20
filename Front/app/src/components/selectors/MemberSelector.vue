<template>
    <div class="selector-member space-y-2">
        <GuildSelector @select="onGuildSelected" />

        <div v-if="guildId" class="animate-fade-in">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Member</label>
            <select v-if="!loading" v-model="selectedUserId" @change="emitSelection"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white">
                <option value="" disabled>Select a Member</option>
                <option v-for="user in users" :key="user.id" :value="user.id">
                    {{ user.username }} {{ user.discriminator !== '0' ? '#' + user.discriminator : '' }} ({{
                    user.displayName }})
                </option>
            </select>
            <div v-else class="text-sm text-gray-500">Loading members...</div>
        </div>
    </div>
</template>

<script>
import { callApi } from '@/services/callApi';
import { useMainStore } from '@/stores/main';
import GuildSelector from './GuildSelector.vue';

export default {
    name: 'MemberSelector',
    components: { GuildSelector },
    data() {
        return {
            guildId: null,
            users: [],
            selectedUserId: '',
            loading: false
        };
    },
    methods: {
        async onGuildSelected(guildId) {
            this.guildId = guildId;
            this.selectedUserId = '';
            this.users = [];
            await this.fetchUsers();
        },
        async fetchUsers() {
            if (!this.guildId) return;
            const store = useMainStore();
            this.loading = true;
            try {
                this.users = await callApi('getUsers', store.selectedBotId, this.guildId);
            } catch (e) {
                console.error(e);
            } finally {
                this.loading = false;
            }
        },
        emitSelection() {
            this.$emit('input', this.selectedUserId);
            this.$emit('select', this.selectedUserId);
        }
    }
};
</script>
