import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import '../src/assets/styles.css'
import { useUserStore } from '@/stores/userStore'
import Cookies from 'vue-cookies'


import AuthService from '@/services/auth.service'

const app = createApp(App)
app.use(createPinia())

const initializeAuth = async () => {
  const token = Cookies.get('accessToken')
  const userStore = useUserStore()
  
  if (token && !userStore.token) {
    userStore.setToken(token)
    try {
      const profile = await AuthService.fetchUserProfile()
      userStore.setUser(profile)
    } catch (error) {
      console.error('Lỗi khi khôi phục phiên đăng nhập:', error)
      userStore.$reset()
    }
  }
}

app.use(router)
initializeAuth().finally(() => app.mount('#app'))
