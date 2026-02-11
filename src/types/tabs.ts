/** 标签页数据类型 */
export type TabViewType = {
  title: string // 标签页标题
  name: string // 路由名称
  cacheKey: string // 组件缓存标识，默认为路由名称
  keepAlive?: boolean // 是否缓存页面
  params?: Record<string, unknown>
  query?: Record<string, unknown>
}
