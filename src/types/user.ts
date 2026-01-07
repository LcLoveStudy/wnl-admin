/** 通用用户信息类型，可在全局复用 */
export interface UserInfo {
  id: string
  username: string
  nickname?: string
  avatar?: string
  roles: string[]
  [key: string]: unknown
}
