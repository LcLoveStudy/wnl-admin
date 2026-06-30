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
export function loginApi(data: LoginRequestData): Promise<LoginResponseData> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { username, password } = data
      if (username === 'admin' && password === 'admin') {
        resolve({
          token: 'mock-token-admin-123456',
          userInfo: {
            id: '1',
            username: 'admin',
            nickname: '超级管理员',
            roles: ['admin'],
          },
        })
      } else {
        reject(new Error('用户名或密码错误 (提示: admin / admin)'))
      }
    }, 800)
  })
}

// 获取用户信息接口
export function getUserInfoApi(): Promise<UserInfo> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '1',
        username: 'admin',
        nickname: '超级管理员',
        roles: ['admin'],
      })
    }, 500)
  })
}
