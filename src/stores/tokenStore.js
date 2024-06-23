// tokenStore.js 或 tokenStore.ts
import { defineStore } from 'pinia'
export const useTokenStore = defineStore('token', {
  state: () => ({
    accessToken: ''
  }),

  actions: {
    setAccessToken(token) {
      // 存储Token到本地存储中
      this.accessToken = token
      return localStorage.setItem('accessToken', token)
    },
    clearAccessToken() {
      this.accessToken = ''
      // 同样，清除本地存储中的Token
    }
  }
})
