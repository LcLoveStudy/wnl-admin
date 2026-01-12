import type { RouteComponent, RouteRecordRaw } from 'vue-router'
type Lazy<T> = () => Promise<T>
// 路由配置接口
export interface RouteConfig extends Omit<RouteRecordRaw, 'children'> {
  // 路由名称
  name: string
  // 路由路径
  path: string
  // 组件路径 (相对于 views 目录)
  component?: RouteComponent | Lazy<RouteComponent>
  // 路由元信息
  meta: RouteMeta
  // 子路由
  children?: RouteConfig[]
}

// 路由元信息接口
export interface RouteMeta extends Record<PropertyKey, unknown> {
  // 页面标题
  title: string
  // 是否需要认证
  requiresAuth?: boolean
  // 需要的权限列表
  permissions?: string[]
  // 需要的角色列表
  roles?: string[]
  // 是否缓存页面
  keepAlive?: boolean
  // 页面图标
  icon?: string
  // 是否隐藏菜单
  hidden?: boolean
  // 菜单排序
  sort?: number
  // 是否在面包屑中显示
  breadcrumb?: boolean
  // 父级菜单路径
  parentPath?: string
}
