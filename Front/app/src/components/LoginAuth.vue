<template>
  <div class="login">
    <h1>Login</h1>
    <button @click="login">Login with Discord</button>
  </div>
</template>

<script>
import authApi from '../api/auth';

export default {
  name: 'LoginAuth',
  methods: {
    login() {
      try {
        const authUrl = authApi.getDiscordAuthUrl();
        window.location.href = authUrl;
      } catch (error) {
        console.error('Error getting Discord auth URL:', error);
      }
    }
  }
};
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
