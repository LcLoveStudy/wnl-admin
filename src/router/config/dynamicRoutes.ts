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
      icon: 'Menu',
      keepAlive: true,
      sort: 1,
      breadcrumb: true,
    },
  },
  {
    path: 'examples',
    name: 'Examples',
    redirect: '/slider-verify',
    meta: {
      title: '示例',
      requiresAuth: false,
      breadcrumb: true,
      icon: 'Coin',
      sort: 2,
    },
    children: [
      {
        path: 'slider-verify',
        name: 'SliderVerify',
        component: () => import('@/views/system/examples/slider-verify/index.vue'),
        meta: {
          title: '滑块验证',
          requiresAuth: false,
          icon: 'Open',
          keepAlive: true,
          sort: 1,
          breadcrumb: true,
        },
      },
      {
        path: 'clickoutside',
        name: 'clickoutside',
        component: () => import('@/views/system/examples/clickoutside/index.vue'),
        meta: {
          title: '点击外部区域',
          requiresAuth: false,
          icon: 'Mouse',
          keepAlive: true,
          sort: 2,
          breadcrumb: true,
        },
      },
    ],
  },
]
