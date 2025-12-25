import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/assets/style/reset.css'
import '@/assets/style/common.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
