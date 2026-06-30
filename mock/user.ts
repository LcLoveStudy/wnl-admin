import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/wnl-admin/api/user/login',
    method: 'post',
    response: ({ body }: { body: Record<string, unknown> }) => {
      const { username, password } = body
      if (username === 'admin' && password === 'admin') {
        return {
          code: 200,
          message: '登录成功',
          data: {
            token: 'mock-token-admin-123456',
            userInfo: {
              id: '1',
              username: 'admin',
              nickname: '超级管理员',
              roles: ['admin'],
            },
          },
        }
      }
      return {
        code: 400,
        message: '用户名或密码错误 (提示: admin / admin)',
        data: null,
      }
    },
  },
  {
    url: '/wnl-admin/api/user/info',
    method: 'get',
    response: ({ headers }: { headers: Record<string, string> }) => {
      const token = headers.authorization
      if (token === 'Bearer mock-token-admin-123456') {
        return {
          code: 200,
          message: '获取用户信息成功',
          data: {
            id: '1',
            username: 'admin',
            nickname: '超级管理员',
            roles: ['admin'],
          },
        }
      }
      return {
        code: 401,
        message: 'token 失效，请重新登录',
        data: null,
      }
    },
  },
] as MockMethod[]
