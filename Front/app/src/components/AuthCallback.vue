<template>
  <div class="callback">
    <p>Authenticating...</p>
  </div>
</template>

<script>
import authApi from '../api/auth';

export default {
  name: 'AuthCallback',
  async created() {
    const code = this.$route.query.code;

    if (code) {
      try {
        const data = await authApi.login(code);

        if (data.token) {
          localStorage.setItem('api_token', data.token);
          this.$router.push('/');
        } else {
          console.error('API token not received');
          this.$router.push('/login');
        }
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
