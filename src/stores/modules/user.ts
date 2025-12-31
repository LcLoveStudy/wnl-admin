import { LocalStorageKeys } from '@/enums/localstorage'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@/hooks'
import { getRandomString } from '@lichang666/utils'
interface LoginRequestData {
  username: string
  password: string
}

export const useUserStore = defineStore('user', () => {
  const userinfo = useLocalStorage<UserType | null>(LocalStorageKeys.USERINFO)
  const token = useLocalStorage<string | null>(LocalStorageKeys.TOKEN)
  /** 登录操作 */
  const login = async ({ username, password }: LoginRequestData) => {
    userinfo.value = { username, password, userType: 'admin' }
    token.value = getRandomString(32)
  }
  /** 退出登录操作 */
  const logout = async () => {
    localStorage.clear()
    userinfo.value = null
  }
  return { userinfo, token, login, logout }
})
