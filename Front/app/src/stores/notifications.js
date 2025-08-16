import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [],
    history: [],
    nextId: 0,
  }),
  actions: {
    addNotification(notification) {
      const id = this.nextId++;
      const newNotification = {
        id,
        ...notification,
        timer: null,
        remainingTime: notification.duration,
      };

      this.notifications.push(newNotification);
      this.history.push(newNotification);

      if (notification.duration) {
        this.startTimer(id, notification.duration);
      }
    },
    removeNotification(id) {
      this.notifications = this.notifications.filter(
        (notification) => notification.id !== id
      );
    },
    startTimer(id, duration) {
      const notification = this.notifications.find((n) => n.id === id);
      if (!notification) return;

      const startTime = Date.now();
      notification.timer = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        notification.remainingTime = duration - elapsedTime;
        if (notification.remainingTime <= 0) {
          this.removeNotification(id);
          clearInterval(notification.timer);
        }
      }, 10);
    },
    pauseTimer(id) {
      const notification = this.notifications.find((n) => n.id === id);
      if (notification && notification.timer) {
        clearInterval(notification.timer);
        notification.timer = null;
      }
    },
    resumeTimer(id) {
      const notification = this.notifications.find((n) => n.id === id);
      if (notification && !notification.timer && notification.remainingTime > 0) {
        this.startTimer(id, notification.remainingTime);
      }
    },
  },
});
