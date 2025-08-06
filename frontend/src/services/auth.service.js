import Cookies from 'vue-cookies'
import api from './api.service'
//import router from '@/router'
import { useUserStore } from '@/stores/userStore'

const AuthService = {
  async login(credentials) {
    const { data } = await api.post('/auth/login', credentials)

    Cookies.set('accessToken', data.token)

    const userStore = useUserStore()
    userStore.setCredentials({ user: data.user, token: data.token })
  },

  async register(payload) {
    return api.post('/auth/register', payload)
  },

  // signOut() {
  //   Cookies.remove('accessToken')
  //   const userStore = useUserStore()
  //   userStore.$reset()
  //   router.push({ name: 'Login' })
  // },
}

export default AuthService
