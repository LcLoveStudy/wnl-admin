import type { RouteConfig } from '../types'
import { errorRoutes } from './errorRoutes'

/**
 * 静态路由配置 - 不需要权限控制的路由
 */
export const staticRoutes: RouteConfig[] = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      requiresAuth: false,
      hidden: true,
      breadcrumb: false,
    },
  },
  // 全局通配符路由 - 重定向到404页面
  {
    name: 'CatchAll',
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: {
      title: '重定向',
      hidden: true,
    },
  },
]

/**
 * 根路由配置
 */
export const rootRoute: RouteConfig = {
  name: 'Root',
  path: '/',
  component: () => import('@/views/system/index.vue'),
  meta: {
    title: '首页',
    requiresAuth: true,
  },
  children: [
    // 错误页面路由
    ...errorRoutes,
  ], // 动态路由会添加到这里
}
