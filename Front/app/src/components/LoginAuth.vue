<template>
  <div class="login">
    <h1>Login</h1>
    <button @click="login">Login with Discord</button>
  </div>
</template>

<script>
export default {
  name: 'LoginAuth',
  methods: {
    async login() {
      try {
        const response = await fetch('/api/discord/authurl');
        const authUrl = await response.text();
        window.location.href = authUrl;
      } catch (error) {
        console.error('Error fetching Discord auth URL:', error);
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
