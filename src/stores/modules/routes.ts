import router from '@/router'
import type { RouteConfig } from '@/router/types'
import type { TabViewType } from '@/types/tabs'
import { formatRoutes } from '@/router/utils'
import { defineStore } from 'pinia'
import { useUserStore } from './user'

export const useRoutesStore = defineStore('routes', () => {
  const dynamicRoutes = ref<RouteConfig[]>([])
  /** 初始化注册动态路由 */
  const initDynamicRoutes = (routes: RouteConfig[]) => {
    dynamicRoutes.value = []
    const { token } = useUserStore()
    if (!token) return
    formatRoutes(routes).forEach((route) => {
      router.addRoute('Root', route)
    })
    dynamicRoutes.value = routes
  }

  /** 已缓存的页面标签 */
  const visitedViews = ref<TabViewType[]>([])
  return { dynamicRoutes, initDynamicRoutes, visitedViews }
})
