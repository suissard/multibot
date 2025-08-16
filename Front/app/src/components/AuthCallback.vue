<template>
  <div class="callback">
    <p>Authenticating...</p>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user';

export default {
  name: 'AuthCallback',
  async created() {
    const userStore = useUserStore();
    const code = this.$route.query.code;

    if (code) {
      try {
        await userStore.login(code);
        this.$router.push('/');
      } catch (error) {
        console.error('Error during authentication:', error);
        this.$router.push('/login');
      }
    } else {
      console.error('No authorization code found');
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
