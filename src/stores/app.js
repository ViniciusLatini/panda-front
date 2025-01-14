// Utilities
import router from '@/router'
import { signInService } from '@/services/user'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    user: {}
  }),
  actions: {
    async signIn(body) {
      const res = await signInService(body)
      this.user = res
      localStorage.setItem('token', res.token)
    },
    logout() {
      this.user = {}
      localStorage.removeItem('token')
      router.push('/signin');
    }
   }
})
