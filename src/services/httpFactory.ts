import AxiosInstance from '@/services/axios'

export const createHttp = (baseUrl?: string) => {
  const instance = AxiosInstance

  if (baseUrl) {
    instance.defaults.baseURL = baseUrl
  }

  return instance
}
