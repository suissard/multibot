<template>
  <div class="callback">
    <p>Authenticating...</p>
  </div>
</template>

<script>
import { useNotificationStore } from '../stores/notifications';
import authApi from '../api/auth';

export default {
  name: 'AuthCallback',
  async created() {
    const notificationStore = useNotificationStore();
    const code = this.$route.query.code;

    if (code) {
      try {
        const data = await authApi.login(code);

        if (data.token) {
          localStorage.setItem('api_token', data.token);
          notificationStore.addNotification({
            type: 'success',
            message: 'Login successful!',
            duration: 5000,
            details: 'Welcome back!'
          });
          this.$router.push('/');
        } else {
          notificationStore.addNotification({
            type: 'error',
            message: 'Login Failed',
            duration: 5000,
            details: 'No token received from server.'
          });
          this.$router.push('/login');
        }
      } catch (error) {
        notificationStore.addNotification({
          type: 'error',
          message: 'Authentication Error',
          duration: 5000,
          details: error.message || 'An unknown error occurred.'
        });
        this.$router.push('/login');
      }
    } else {
      notificationStore.addNotification({
        type: 'error',
        message: 'Authentication Failed',
        duration: 5000,
        details: 'No authorization code found in the URL.'
      });
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.callback {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
