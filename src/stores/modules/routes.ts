import router from '@/router'
import type { RouteConfig } from '@/router/types'
import type { TabViewType } from '@/types/tabs'
import { formatRoutesToRoot } from '@/router/utils'
import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { getRoutesApi } from '@/api/modules/routes'
import type { RouteRecordRaw } from 'vue-router'

export const useRoutesStore = defineStore('routes', () => {
  const dynamicRoutes = ref<RouteConfig[]>([])
  /** 从后端获取路由并初始化注册 */
  const initDynamicRoutes = async () => {
    dynamicRoutes.value = []
    const { token } = useUserStore()
    if (!token) return

    try {
      const routes = await getRoutesApi()
      const formattedRoutes = formatRoutesToRoot(routes)
      formattedRoutes.forEach((route) => {
        router.addRoute('Root', route as unknown as RouteRecordRaw)
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

  /** 缓存组件 name 集合 (供 keep-alive 的 include 使用) */
  const cacheKeys = computed(() =>
    visitedViews.value.filter((v) => v.keepAlive && v.name).map((v) => v.name as string),
  )

  /** 删除某个页面的缓存 */
  const delCachedView = (view: TabViewType) => {
    const index = visitedViews.value.findIndex((v) => v.cacheKey === view.cacheKey)
    if (index > -1 && visitedViews.value[index]) {
      // 通过将 keepAlive 临时设为 false，可以促使 keep-alive 组件释放该实例
      visitedViews.value[index]!.keepAlive = false
    }
  }

  return { dynamicRoutes, initDynamicRoutes, visitedViews, cacheKeys, delCachedView }
})
