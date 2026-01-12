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
