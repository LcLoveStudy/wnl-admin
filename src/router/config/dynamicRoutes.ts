import type { RouteConfig } from '@/router/types'
/**
 * 动态路由配置 - 需要根据权限动态加载的路由
 */
export const dynamicRoutes: RouteConfig[] = [
  {
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/system/dashboard/index.vue'),
    meta: {
      title: '仪表盘',
      requiresAuth: false,
      icon: 'dashboard',
      keepAlive: true,
      sort: 1,
      breadcrumb: true,
    },
  },
]
