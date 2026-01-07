import type { Router } from 'vue-router'
import { useUserStore } from '@/stores'
/** 初始化路由导航守卫 */
export const setupRouterGuards = (router: Router) => {
  router.beforeEach((to, from, next) => {
    const { token, userinfo } = useUserStore()
    if (to.path === '/login') return next()
    if (!token || !userinfo) return next('/login')
    return next()
  })
}
