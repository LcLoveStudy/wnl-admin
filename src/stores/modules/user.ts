import { LocalStorageKeys } from '@/enums/localstorage'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@/hooks'
import type { UserInfo } from '@/types/user'
import { ElMessage } from 'element-plus'
import { useRoutesStore } from './routes'
import { loginApi, type LoginRequestData } from '@/api/modules/user'

export const useUserStore = defineStore('user', () => {
  const userinfo = useLocalStorage<UserInfo | null>(LocalStorageKeys.USERINFO)
  const token = useLocalStorage<string | null>(LocalStorageKeys.TOKEN)
  /** 登录操作 */
  const login = async ({ username, password }: LoginRequestData) => {
    try {
      const res = await loginApi({ username, password })
      userinfo.value = res.userInfo
      token.value = res.token

      const { initDynamicRoutes } = useRoutesStore()
      await initDynamicRoutes()
      return true
    } catch (error) {
      return false
    }
  }
  /** 退出登录操作 */
  const logout = async () => {
    ElMessage.success('退出登录成功')
    localStorage.clear()
    userinfo.value = null
    token.value = null
    setTimeout(() => {
      window.location.href = './'
    }, 1000)
  }
  return { userinfo, token, login, logout }
})
