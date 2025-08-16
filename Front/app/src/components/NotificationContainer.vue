<template>
  <div class="notification-container">
    <transition-group name="notification" tag="div">
      <NotificationItem
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      />
    </transition-group>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useNotificationStore } from '../stores/notifications';
import NotificationItem from './NotificationItem.vue';

export default {
  name: 'NotificationContainer',
  components: {
    NotificationItem,
  },
  setup() {
    const store = useNotificationStore();
    const notifications = computed(() => store.notifications);

    return {
      notifications,
    };
  },
};
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 300px;
  z-index: 1000;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.5s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
