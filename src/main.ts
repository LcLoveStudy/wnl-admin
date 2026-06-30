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
import { useRoutesStore } from './stores'
import setupDirectives from '@/directive'

// 生产环境自动注入 mock 数据，使得 github pages 可以拦截请求
if (import.meta.env.PROD) {
  import('../mock/mockProdServer').then(({ setupProdMockServer }) => {
    setupProdMockServer()
  })
}

setRootFontSize({
  designWidth: 1920,
  baseFontSize: 16,
})

const initApp = async () => {
  const app = createApp(App)

  app.use(createPinia())

  // 动态路由
  const { initDynamicRoutes } = useRoutesStore()
  await initDynamicRoutes()
  app.use(router)

  //element-plus
  app.use(ElementPlus)
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  // 注册全局指令
  setupDirectives(app)

  app.mount('#app')
}

initApp()
