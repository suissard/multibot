<template>
  <div class="home p-8">
    <h1 class="text-4xl font-bold mb-4">Welcome to the Bot Control Interface</h1>
    <p class="text-lg text-gray-600 dark:text-gray-400">
      This interface allows you to manage the bot's functions.
    </p>

    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Test Notifications</h2>
      <div class="flex space-x-4">
        <button @click="triggerSuccess" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Trigger Success</button>
        <button @click="triggerError" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Trigger Error</button>
        <button @click="triggerWarning" class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Trigger Warning</button>
        <button @click="triggerInfo" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Trigger Info</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useNotificationStore } from '../stores/notifications';

export default {
  name: 'HomeView',
  props: {
    msg: String
  },
  setup() {
    const notificationStore = useNotificationStore();

    const triggerSuccess = () => {
      notificationStore.addNotification({
        type: 'success',
        message: 'Success!',
        details: 'The operation was completed successfully.',
        duration: 5000,
      });
    };

    const triggerError = () => {
      notificationStore.addNotification({
        type: 'error',
        message: 'Error!',
        details: 'An error occurred while processing your request.',
        duration: 5000,
      });
    };

    const triggerWarning = () => {
      notificationStore.addNotification({
        type: 'warning',
        message: 'Warning!',
        details: 'Please be aware of this important information.',
        duration: 5000,
      });
    };

    const triggerInfo = () => {
      notificationStore.addNotification({
        type: 'info',
        message: 'Info',
        details: 'Here is some information you might find useful.',
        duration: 5000,
      });
    };

    return {
      triggerSuccess,
      triggerError,
      triggerWarning,
      triggerInfo,
    };
  },
}
</script>
