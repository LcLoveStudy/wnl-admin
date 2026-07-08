import type { RouteConfig } from '@/router/types'

// 将组件路径映射到具体的 Vue 组件
const modules = import.meta.glob('@/views/**/*.vue')

/** 处理路由，主要解决vue-router的类型检查 */
export const formatRoutes = (routes: RouteConfig[]) => {
  return routes.map((route: RouteConfig) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const currentRoute = route as any
    const { meta, children, component } = currentRoute

    // 如果 component 是字符串（从后端获取的路径），转换为实际的动态导入函数
    if (typeof component === 'string') {
      const componentPath = `/src/views/${component}`
      currentRoute.component = modules[componentPath] || (() => import('@/views/error/404.vue'))
    }

    if (children) {
      currentRoute.children = formatRoutes(children)
    }
    return {
      ...currentRoute,
      meta: {
        ...meta,
        title: meta.title || currentRoute.name,
      },
    }
  })
}

const normalizeChildPath = (parentPath: string, childPath: string) => {
  if (childPath.startsWith('/')) return childPath.replace(/\/+/g, '/')
  const child = childPath.replace(/^\//, '')
  if (!parentPath || parentPath === '/') return `/${child}`.replace(/\/+/g, '/')
  const parent = parentPath.replace(/\/$/, '')
  return `${parent}/${child}`.replace(/\/+/g, '/')
}

const flattenRoutesToRoot = (routes: RouteConfig[], parentFullPath = ''): RouteConfig[] => {
  return routes.flatMap((route) => {
    const fullPath = normalizeChildPath(parentFullPath, route.path)
    const meta = {
      ...route.meta,
      parentPath:
        route.meta?.parentPath ??
        (parentFullPath && parentFullPath !== '/' ? parentFullPath : undefined),
    }

    const flatSelf: RouteConfig = {
      ...route,
      path: fullPath,
      meta,
    }
    delete (flatSelf as Partial<RouteConfig>).children

    const children = route.children ? flattenRoutesToRoot(route.children, fullPath) : []
    return [flatSelf, ...children]
  })
}

export const formatRoutesToRoot = (routes: RouteConfig[]) => {
  const formattedTree = formatRoutes(routes)
  return flattenRoutesToRoot(formattedTree)
}
