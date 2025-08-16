import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import { useUserStore } from './stores/user'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

const userStore = useUserStore()
userStore.initializeTheme()
userStore.checkAuth()


app.mount('#app')
