import type { Router } from 'vue-router'
import { useUserStore } from '@/stores'
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
