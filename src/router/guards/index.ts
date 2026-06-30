import type { Router } from 'vue-router'
import { useRoutesStore, useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { generateCacheKey } from '@/utils/tabs'
/** 初始化路由导航守卫 */
export const setupRouterGuards = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    const { token } = userStore
    if (to.path === '/login') return next()
    if (!token) return next('/login')
    next()
  })
}

/** 处理tab */
export const setupTabGuards = (router: Router) => {
  router.afterEach((to) => {
    if (to.path === '/login' || to.name === 'Redirect') return
    const { visitedViews } = storeToRefs(useRoutesStore())
    const cacheKey = generateCacheKey(String(to.name), to.params, to.query)
    const exists = visitedViews.value.find((v) => v.cacheKey === cacheKey)
    if (exists) {
      // 恢复可能因为“重新加载”而被设为 false 的 keepAlive 状态
      if (to.meta.keepAlive && !exists.keepAlive) {
        exists.keepAlive = true
      }
      return
    }
    visitedViews.value.push({
      title: (to.meta.title as string) || 'no-name',
      keepAlive: to.meta.keepAlive as boolean,
      name: String(to.name),
      cacheKey,
    })
  })
}
