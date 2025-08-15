<template>
  <div class="command-list">
    <h1>Command List</h1>
    <ul>
      <li v-for="command in commands" :key="command.id">
        <strong>{{ command.id }}</strong>: {{ command.description }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CommandList',
  data() {
    return {
      commands: []
    };
  },
  mounted() {
    axios.get('/api/commands')
      .then(response => {
        this.commands = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
}
</script>

<style scoped>
.command-list {
  text-align: left;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 10px 0;
}
</style>
