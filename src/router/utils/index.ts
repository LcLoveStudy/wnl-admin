import { errorRoutes } from '@/router/config/errorRoutes'
/** 处理路由，主要解决vue-router的类型检查 */
export const formatRoutes = (routes: any) => {
  return routes.map((route: any) => {
    const { meta, children } = route
    if (children) {
      route.children = formatRoutes(children)
    }
    return {
      ...route,
      meta: {
        ...meta,
        title: meta.title || route.name,
      },
    }
  })
}

/**
 * 获取所有错误路由的路径列表
 * @returns 错误路由路径数组
 */
const getErrorRoutePaths = (): string[] => {
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
