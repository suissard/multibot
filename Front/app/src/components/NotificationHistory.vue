<template>
  <div v-if="show" class="notification-history-panel bg-white dark:bg-gray-800 dark:text-gray-100 shadow-xl">
    <div class="header flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
      <h3 class="text-lg font-semibold">Notification History</h3>
      <button @click="close"
        class="close-btn text-2xl leading-none text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">&times;</button>
    </div>
    <div class="content">
      <div v-if="history.length === 0" class="empty-state text-gray-500 dark:text-gray-400">
        No notifications yet.
      </div>
      <div v-else class="space-y-2">
        <div v-for="notification in history" :key="notification.id" class="notification-item rounded-md shadow-sm"
          :class="notificationTypeClass(notification.type)">
          <p class="font-medium"><strong>{{ notification.type }}</strong>: {{ notification.message }}</p>
          <p v-if="notification.details" class="text-sm mt-1 opacity-90">{{ notification.details }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useNotificationStore } from '../stores/notifications';

export default {
  name: 'NotificationHistory',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const store = useNotificationStore();
    const history = computed(() => store.history);

    const close = () => {
      emit('close');
    };

    const notificationTypeClass = (type) => {
      switch (type) {
        case 'success':
          return 'bg-green-100 border-l-4 border-green-500 text-green-800 dark:bg-green-900 dark:text-green-100 dark:border-green-400';
        case 'error':
          return 'bg-red-100 border-l-4 border-red-500 text-red-800 dark:bg-red-900 dark:text-red-100 dark:border-red-400';
        case 'warning':
          return 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-400';
        case 'info':
          return 'bg-blue-100 border-l-4 border-blue-500 text-blue-800 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-400';
        default:
          return 'bg-gray-100 border-l-4 border-gray-500 text-gray-800 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-400';
      }
    };

    return {
      history,
      close,
      notificationTypeClass,
    };
  },
};
</script>

<style scoped>
.notification-history-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  /* background and shadow handled by tailwind */
  display: flex;
  flex-direction: column;
  z-index: 1001;
}

/* .header styles moved to tailwind */

.content {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
}

.notification-item {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}

.empty-state {
  text-align: center;
  padding-top: 2rem;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
