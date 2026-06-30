import router from '@/router'
import type { RouteConfig } from '@/router/types'
import type { TabViewType } from '@/types/tabs'
import { formatRoutes } from '@/router/utils'
import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { getRoutesApi } from '@/api/modules/routes'

export const useRoutesStore = defineStore('routes', () => {
  const dynamicRoutes = ref<RouteConfig[]>([])

  /** 从后端获取路由并初始化注册 */
  const initDynamicRoutes = async () => {
    dynamicRoutes.value = []
    const { token } = useUserStore()
    if (!token) return

    try {
      const routes = await getRoutesApi()
      const formattedRoutes = formatRoutes(routes)
      formattedRoutes.forEach((route) => {
        router.addRoute('Root', route)
      })
      dynamicRoutes.value = routes
      return true
    } catch (error) {
      console.error('获取动态路由失败:', error)
      return false
    }
  }

  /** 已缓存的页面标签 */
  const visitedViews = ref<TabViewType[]>([])
  return { dynamicRoutes, initDynamicRoutes, visitedViews }
})
