import { LocalStorageKeys } from '@/enums/localstorage'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@/hooks'
import { getRandomString } from '@lichang666/utils'
import type { UserInfo } from '@/types/user'
import { ElMessage } from 'element-plus'
import { useRoutesStore } from './routes'
import { dynamicRoutes } from '@/router/config/dynamicRoutes'

interface LoginRequestData {
  username: string
  password: string
}

export const useUserStore = defineStore('user', () => {
  const userinfo = useLocalStorage<UserInfo | null>(LocalStorageKeys.USERINFO)
  const token = useLocalStorage<string | null>(LocalStorageKeys.TOKEN)
  /** 登录操作 */
  const login = async ({ username, password }: LoginRequestData) => {
    userinfo.value = {
      id: '1',
      username,
      nickname: '管理员',
      roles: ['admin'],
    }
    token.value = getRandomString(32)
    const { initDynamicRoutes } = useRoutesStore()
    initDynamicRoutes(dynamicRoutes)
  }
  /** 退出登录操作 */
  const logout = async () => {
    ElMessage.success('退出登录成功')
    localStorage.clear()
    userinfo.value = null
    token.value = null
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }
  return { userinfo, token, login, logout }
})
