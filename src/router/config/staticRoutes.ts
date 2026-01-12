import type { RouteConfig } from '../types'

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
  {
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '页面不存在',
      requiresAuth: false,
      hidden: true,
      breadcrumb: false,
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
  children: [], // 动态路由会添加到这里
}
