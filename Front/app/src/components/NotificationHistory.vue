<template>
  <div v-if="show" class="notification-history-panel">
    <div class="header">
      <h3>Notification History</h3>
      <button @click="close" class="close-btn">&times;</button>
    </div>
    <div class="content">
      <div v-if="history.length === 0" class="empty-state">
        No notifications yet.
      </div>
      <div v-else>
        <div v-for="notification in history" :key="notification.id" class="notification-item" :class="notificationTypeClass(notification.type)">
          <p><strong>{{ notification.type }}</strong>: {{ notification.message }}</p>
          <p v-if="notification.details">{{ notification.details }}</p>
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
          return 'bg-green-100 border-green-500 text-green-700';
        case 'error':
          return 'bg-red-100 border-red-500 text-red-700';
        case 'warning':
          return 'bg-yellow-100 border-yellow-500 text-yellow-700';
        case 'info':
          return 'bg-blue-100 border-blue-500 text-blue-700';
        default:
          return 'bg-gray-100 border-gray-500 text-gray-700';
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
  background-color: white;
  box-shadow: -2px 0 5px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  z-index: 1001;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
}
.content {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
}
.notification-item {
  border-left-width: 4px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}
.empty-state {
  color: #888;
  text-align: center;
  padding-top: 2rem;
}
.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
