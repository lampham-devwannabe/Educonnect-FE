import axios from 'axios'
import type { AxiosInstance } from 'axios'

export function createHttp(baseURL: string): AxiosInstance {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
  })

  // Request Interceptor
  instance.interceptors.request.use(config => {
    const token = localStorage.getItem('access-token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  })

  // Response Interceptor
  instance.interceptors.response.use(
    res => res,
    err => {
      if (err.response?.status === 401) {
        // ví dụ: redirect login
        // window.location.href = "/login"
      }
      return Promise.reject(err)
    }
  )

  return instance
}
