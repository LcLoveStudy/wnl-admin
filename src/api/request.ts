import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { ElMessage } from 'element-plus'
import { LocalStorageKeys } from '@/enums/localstorage'
import { ConstEnums } from '@/enums/const-enums'

// 统一的返回接口规范
export interface Result<T = unknown> {
  code: number
  message: string
  data: T
}

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/wnl-admin/api',
  timeout: 10000, // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 统一携带 Token
    const tokenKey = `${LocalStorageKeys.TOKEN}-${ConstEnums.PROJECT_NAME}`
    const token = localStorage.getItem(tokenKey)
    if (token) {
      // 因为 useLocalStorage 会通过 JSON.stringify 存储，所以字符串会带双引号，这里需要 parse 一下
      config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`
    }
    return config
  },
  (error: unknown) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<Result>) => {
    const { code, message, data } = response.data

    // 假设 200 为成功状态码
    if (code === 200) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data as any
    } else {
      // 统一错误处理
      ElMessage.error(message || '请求失败')
      return Promise.reject(new Error(message || 'Error'))
    }
  },
  (error: unknown) => {
    // 处理 HTTP 网络错误
    let message = ''
    const status = (error as { response?: { status?: number } }).response?.status
    switch (status) {
      case 401:
        message = 'token 失效，请重新登录'
        // 这里可以执行退出登录操作，清理 localStorage，跳转登录页等
        break
      case 403:
        message = '拒绝访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器内部错误'
        break
      default:
        message = '网络连接故障'
    }
    ElMessage.error(message)
    return Promise.reject(error)
  },
)

export default service

/**
 * 封装通用请求方法
 */
export const request = {
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config)
  },
  post<T = unknown>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, config)
  },
  put<T = unknown>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.put(url, data, config)
  },
  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, config)
  },
}
