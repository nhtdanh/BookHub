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


const app = createApp(App)
app.use(createPinia()) // Khởi tạo Pinia root:contentReference[oaicite:4]{index=4}
app.use(router) // Đăng ký Vue Router

const store = useUserStore()
const token = Cookies.get('accessToken')
if (token) {
  store.token = token
  // Optionally fetch `/docgia/me` để lấy profile
}
app.mount('#app')
