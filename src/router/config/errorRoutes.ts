import type { RouteConfig } from '../types'

/**
 * 错误页面路由列表
 */
export const errorRoutes: RouteConfig[] = [
  {
    name: 'NotFound',
    path: '404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '页面不存在',
      requiresAuth: false,
      hidden: true,
      breadcrumb: false,
    },
  },
  {
    name: 'Forbidden',
    path: '403',
    component: () => import('@/views/error/403.vue'),
    meta: {
      title: '权限不足',
      requiresAuth: false,
      hidden: true,
      breadcrumb: false,
    },
  },
  {
    name: 'ServerError',
    path: '500',
    component: () => import('@/views/error/500.vue'),
    meta: {
      title: '服务器错误',
      requiresAuth: false,
      hidden: true,
      breadcrumb: false,
    },
  },
]
