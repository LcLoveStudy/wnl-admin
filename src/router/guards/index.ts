import type { Router } from 'vue-router'
import { useUserStore } from '@/stores'
import { isErrorRoute } from '@/router/utils'

/** 初始化路由导航守卫 */
export const setupRouterGuards = (router: Router) => {
  router.beforeEach((to, from, next) => {
    const { token } = useUserStore()

    // 白名单路由：登录页和错误页面
    const whiteList = ['/login']
    if (whiteList.includes(to.path) || isErrorRoute(to.path)) {
      return next()
    }

    // 未登录，重定向到登录页
    if (!token) {
      return next('/login')
    }

    // 已登录，继续导航
    return next()
  })
}
