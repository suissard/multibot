import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import CommandList from '../components/CommandList.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/commands',
    name: 'CommandList',
    component: CommandList
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
