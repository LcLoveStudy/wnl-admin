import type { RouteConfig } from '@/router/types'

// 获取动态路由接口
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getRoutesApi(): Promise<any[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: 'system/dashboard/index.vue',
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
              path: 'example-components',
              name: 'ExampleComponents',
              redirect: '/slider-verify',
              meta: {
                title: '组件封装',
                requiresAuth: false,
                breadcrumb: true,
                icon: 'Help',
                sort: 1,
              },
              children: [
                {
                  path: 'slider-verify',
                  name: 'SliderVerify',
                  component: 'system/examples/component/slider-verify/index.vue',
                  meta: {
                    title: '滑块验证',
                    requiresAuth: false,
                    icon: 'Open',
                    keepAlive: true,
                    sort: 1,
                    breadcrumb: true,
                  },
                },
              ],
            },
            {
              path: 'example-directives',
              name: 'ExampleDirectives',
              redirect: '/clickoutside',
              meta: {
                title: '指令封装',
                requiresAuth: false,
                breadcrumb: true,
                icon: 'SwitchFilled',
                sort: 2,
              },
              children: [
                {
                  path: 'clickoutside',
                  name: 'ClickOutside',
                  component: 'system/examples/directives/clickoutside/index.vue',
                  meta: {
                    title: '点击外部区域',
                    requiresAuth: false,
                    icon: 'Mouse',
                    keepAlive: true,
                    sort: 1,
                    breadcrumb: true,
                  },
                },
                {
                  path: 'lazy-load',
                  name: 'LazyLoad',
                  component: 'system/examples/directives/lazy-load/index.vue',
                  meta: {
                    title: '懒加载',
                    requiresAuth: false,
                    icon: 'Picture',
                    keepAlive: true,
                    sort: 2,
                    breadcrumb: true,
                  },
                },
                {
                  path: 'draggable',
                  name: 'Draggable',
                  component: 'system/examples/directives/draggable/index.vue',
                  meta: {
                    title: '拖拽',
                    requiresAuth: false,
                    icon: 'Position',
                    keepAlive: true,
                    sort: 2,
                    breadcrumb: true,
                  },
                },
              ],
            },
          ],
        },
      ])
    }, 500)
  })
}
