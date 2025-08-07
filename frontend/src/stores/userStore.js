import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    role: (state) => state.user?.vaiTro,
  },
  actions: {
    setCredentials({ user, token }) {
      this.user = user
      this.token = token
    },
    setToken(token) {
      this.token = token
    },
    setUser(user) {
      this.user = user
    },
  },
})
