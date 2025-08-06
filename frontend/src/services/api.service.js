import axios from 'axios'
import Cookies from 'vue-cookies'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

// Request interceptor: gắn JWT từ cookie
api.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Response interceptor: xử lý 401 => signOut
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      alert('Phiên hết hạn. Đăng nhập lại.')
      import('@/services/auth.service').then((mod) => mod.default.signOut())
    }
    return Promise.reject(err)
  },
)

export default api
