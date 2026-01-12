import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/assets/style/reset.css'
import '@/assets/style/common.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { setRootFontSize } from '@/utils/responsive/setRootFontSize'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { dynamicRoutes } from './router/config/dynamicRoutes'
import { useRoutesStore } from './stores'

setRootFontSize({
  designWidth: 1920,
  baseFontSize: 16,
})

const initApp = () => {
  const app = createApp(App)

  app.use(createPinia())
  const { initDynamicRoutes } = useRoutesStore()
  initDynamicRoutes(dynamicRoutes)
  app.use(router)
  app.use(ElementPlus)
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  app.mount('#app')
}

initApp()
