import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/styles/index.scss'
import 'element-plus/dist/index.css'
import '@/router/permission'
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
