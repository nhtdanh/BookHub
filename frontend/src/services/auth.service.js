import Cookies from 'vue-cookies'
import api from './api.service'
import router from '@/router'
import { useUserStore } from '@/stores/userStore'

const AuthService = {
  async login(credentials) {
    const { data } = await api.post('/auth/login', credentials)
    console.log('Login response:', data)
    Cookies.set('accessToken', data.token)

    const userStore = useUserStore()

    userStore.setCredentials({ user: data.user, token: data.token })

    //userStore.setCredentials({ user: data.data.user, token: data.data.token })
    console.log(userStore.user)
  },

  async register(payload) {
    return api.post('/auth/register', payload)
  },
  async fetchUserProfile() {
    const { data } = await api.get('/docgia/me')
    const userStore = useUserStore()
    userStore.setUser(data.data)
    return data.data
  },

  signOut() {
    Cookies.remove('accessToken')
    const userStore = useUserStore()
    userStore.$reset()
    router.push({ name: 'Login' })
  },
}

export default AuthService
