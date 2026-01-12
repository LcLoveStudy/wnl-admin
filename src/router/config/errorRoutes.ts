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

/**
 * 获取所有错误路由的路径列表
 * @returns 错误路由路径数组
 */
export const getErrorRoutePaths = (): string[] => {
  return errorRoutes.map((route) => route.path)
}

/**
 * 检查是否为错误路由路径
 * @param path 路由路径
 * @returns 是否为错误路由
 */
export const isErrorRoute = (path: string): boolean => {
  return getErrorRoutePaths().includes(path.replace('/', ''))
}
