<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/events">Events</router-link> |
    <router-link to="/modules">Modules</router-link> |
    <router-link to="/settings">Settings</router-link> |
    <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
    <a v-if="isAuthenticated" href="#" @click.prevent="logout">Logout</a>
  </div>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isAuthenticated: false
    };
  },
  created() {
    this.updateAuthStatus();
    window.addEventListener('storage', this.updateAuthStatus);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.updateAuthStatus);
  },
  methods: {
    updateAuthStatus() {
      this.isAuthenticated = !!localStorage.getItem('api_token');
    },
    logout() {
      localStorage.removeItem('api_token');
      this.updateAuthStatus();
      this.$router.push('/login');
    }
  },
  watch: {
    '$route': 'updateAuthStatus'
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
