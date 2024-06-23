import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // 代理配置
    proxy: {
      // 如果你的 API 位于 'http://localhost:3000/api'
      '/adminapi': {
        target:
          process.env.NODE_ENV === 'production' ? 'https://test.com' : 'http://localhost:8000/',
        changeOrigin: true, // 是否改变源，开启后服务器接收到的请求头中的Host会被设置为目标URL
        rewrite: (path) => path.replace(/^\/api/, '') // 路径重写，去除请求路径中的 '/api'
      }
      // 可以添加更多代理规则
      // '/other-api': {
      //   target: 'http://another-api.example.com',
      //   changeOrigin: true,
      //   // 更多配置...
      // },
    }
  }
})
