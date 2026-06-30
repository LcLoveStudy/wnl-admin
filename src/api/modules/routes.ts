import { request } from '../request'
import type { RouteConfig } from '@/router/types'

// 获取动态路由接口
export function getRoutesApi() {
  return request.get<RouteConfig[]>('/routes')
}
