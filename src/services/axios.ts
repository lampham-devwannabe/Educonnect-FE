import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'

// Flag to prevent multiple refresh attempts simultaneously
let isRefreshing = false
// Queue of requests to retry after token refresh
let failedQueue: any[] = []

// Process the queue of failed requests
const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

// Create base axios instance
const instance = axios.create({
  baseURL: 'http://139.59.97.252:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Request interceptor - add auth token
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor - handle token refresh
instance.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    const originalRequest = error.config

    // If we already tried refreshing or it's not a 401 error, reject the promise
    if (originalRequest._retry || error.response?.status !== 401) {
      return Promise.reject(error)
    }

    // Mark as retried to prevent infinite loops
    originalRequest._retry = true

    // If we're not already refreshing the token
    if (!isRefreshing) {
      isRefreshing = true

      try {
        // Get refresh token from storage
        const currentToken = localStorage.getItem('current-token')

        if (!currentToken) {
          throw new Error('No token available')
        }

        // Call your refresh endpoint
        const response = await axios.post(
          'http://139.59.97.252:8080/auth/refresh',
          {
            token: currentToken,
          }
        )

        // Handle successful refresh
        if (response.data.code === 1000 && response.data.result?.token) {
          const newToken = response.data.result.token

          // Store new tokens
          localStorage.setItem('access-token', newToken)

          // Update header for original request
          originalRequest.headers.Authorization = `Bearer ${newToken}`

          // Process any queued requests
          processQueue(null, newToken)

          // Return axios instance with original request
          return instance(originalRequest)
        } else {
          throw new Error('Failed to refresh token')
        }
      } catch (refreshError) {
        // If refresh failed, clear tokens and redirect to login
        localStorage.removeItem('access-token')
        processQueue(refreshError as AxiosError, null)
        window.location.href = '/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    } else {
      // If already refreshing, queue this request
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            resolve(instance(originalRequest))
          },
          reject: (err: AxiosError) => {
            reject(err)
          },
        })
      })
    }
  }
)

export default instance
