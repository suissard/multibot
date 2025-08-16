<template>
  <div class="home p-8">
    <h1 class="text-4xl font-bold mb-4">Welcome to the Bot Control Interface</h1>
    <p class="text-lg text-gray-600 dark:text-gray-400">
      This interface allows you to manage the bot's functions.
    </p>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  props: {
    msg: String
  }
}
</script>
