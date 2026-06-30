import { request } from '../request'
import type { UserInfo } from '@/types/user'

export interface LoginRequestData {
  username?: string
  password?: string
}

export interface LoginResponseData {
  token: string
  userInfo: UserInfo
}

// 登录接口
export function loginApi(data: LoginRequestData) {
  return request.post<LoginResponseData>('/user/login', data)
}

// 获取用户信息接口
export function getUserInfoApi() {
  return request.get<UserInfo>('/user/info')
}
