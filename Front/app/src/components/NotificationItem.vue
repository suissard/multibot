<template>
  <div
    class="notification"
    :class="notificationTypeClass"
    @click="toggleExpand"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <!-- Icon can be added here based on type -->
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-white">{{ notification.message }}</p>
        </div>
      </div>
      <div class="ml-4 flex-shrink-0 flex">
        <button @click.stop="dismiss" class="text-white">
          &times;
        </button>
      </div>
    </div>
    <div v-if="expanded" class="mt-2 text-sm text-white">
      <p>{{ notification.details }}</p>
    </div>
    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: progressBarWidth }"></div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useNotificationStore } from '../stores/notifications';

export default {
  name: 'NotificationItem',
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useNotificationStore();
    const expanded = ref(false);

    const notificationTypeClass = computed(() => {
      switch (props.notification.type) {
        case 'success':
          return 'bg-green-500';
        case 'error':
          return 'bg-red-500';
        case 'warning':
          return 'bg-yellow-500';
        case 'info':
          return 'bg-blue-500';
        default:
          return 'bg-gray-500';
      }
    });

    const progressBarWidth = computed(() => {
      const width = (props.notification.remainingTime / props.notification.duration) * 100;
      return `${width}%`;
    });

    const toggleExpand = () => {
      expanded.value = !expanded.value;
      if (expanded.value) {
        store.pauseTimer(props.notification.id);
      } else {
        store.resumeTimer(props.notification.id);
      }
    };

    const dismiss = () => {
      store.removeNotification(props.notification.id);
    };

    watch(() => props.notification.remainingTime, (newValue) => {
        if (newValue <= 0) {
            dismiss();
        }
    });

    return {
      expanded,
      notificationTypeClass,
      progressBarWidth,
      toggleExpand,
      dismiss,
    };
  },
};
</script>

<style scoped>
.notification {
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.progress-bar-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: rgba(0, 0, 0, 0.2);
}

.progress-bar {
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  transition: width 0.1s linear;
}
</style>
