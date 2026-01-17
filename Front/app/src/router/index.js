import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/Home.vue'
import CommandList from '../components/CommandList.vue'
import CommandDetail from '../components/CommandDetail.vue'
import EventsList from '../components/EventsList.vue'
import SettingsPage from '../components/Settings.vue'
import ModulesList from '../components/ModulesList.vue'
import ModuleData from '../components/ModuleData.vue'
import ModuleSettings from '../components/ModuleSettings.vue'
import EventData from '../components/EventData.vue'
import LoginAuth from '../components/LoginAuth.vue'
import AuthCallback from '../components/AuthCallback.vue'
import SecretaryView from '../components/SecretaryView.vue'

const routes = [
  {
    path: '/login',
    name: 'LoginAuth',
    component: LoginAuth
  },
  {
    path: '/auth/callback',
    name: 'AuthCallback',
    component: AuthCallback
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/commands',
    name: 'CommandList',
    component: CommandList
  },
  {
    path: '/commands/:name',
    name: 'CommandDetail',
    component: CommandDetail
  },
  {
    path: '/events',
    name: 'EventsList',
    component: EventsList
  },
  {
    path: '/events/:eventName/test-data',
    name: 'EventData',
    component: EventData
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsPage
  },
  {
    path: '/modules',
    name: 'ModulesList',
    component: ModulesList
  },
  {
    path: '/modules/:id/test-data',
    name: 'ModuleData',
    component: ModuleData
  },
  {
    path: '/module/:id/settings',
    name: 'ModuleSettings',
    component: ModuleSettings
  },
  {
    path: '/secretary',
    name: 'Secretary',
    component: SecretaryView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/auth/callback'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('api_token');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});

export default router
