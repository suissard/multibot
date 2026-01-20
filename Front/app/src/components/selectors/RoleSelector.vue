<template>
    <div class="selector-role space-y-2">
        <GuildSelector @select="onGuildSelected" />

        <div v-if="guildId" class="animate-fade-in">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
            <select v-if="!loading" v-model="selectedRoleId" @change="emitSelection"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                :style="{ color: getSelectedColor() }">
                <option value="" disabled>Select a Role</option>
                <option v-for="role in roles" :key="role.id" :value="role.id"
                    :style="{ color: role.color ? '#' + role.color.toString(16) : 'inherit' }">
                    {{ role.name }}
                </option>
            </select>
            <div v-else class="text-sm text-gray-500">Loading roles...</div>
        </div>
    </div>
</template>

<script>
import { callApi } from '@/services/callApi';
import { useMainStore } from '@/stores/main';
import GuildSelector from './GuildSelector.vue';

export default {
    name: 'RoleSelector',
    components: { GuildSelector },
    data() {
        return {
            guildId: null,
            roles: [],
            selectedRoleId: '',
            loading: false
        };
    },
    methods: {
        async onGuildSelected(guildId) {
            this.guildId = guildId;
            this.selectedRoleId = '';
            this.roles = [];
            await this.fetchRoles();
        },
        async fetchRoles() {
            if (!this.guildId) return;
            const store = useMainStore();
            this.loading = true;
            try {
                this.roles = await callApi('getRoles', store.selectedBotId, this.guildId);
            } catch (e) {
                console.error(e);
            } finally {
                this.loading = false;
            }
        },
        getSelectedColor() {
            if (!this.selectedRoleId) return 'inherit';
            const role = this.roles.find(r => r.id === this.selectedRoleId);
            return role && role.color ? '#' + role.color.toString(16) : 'inherit';
        },
        emitSelection() {
            this.$emit('input', this.selectedRoleId);
            this.$emit('select', this.selectedRoleId);
        }
    }
};
</script>
