import React, { createContext, useContext, useState, useEffect } from 'react'
import { createHttp } from '@/services/httpFactory'

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: any | null
  login: (username: string, password: string) => Promise<any>
  logout: () => Promise<void>
  refreshUserToken: () => Promise<boolean>
  register: (authData: RegisterFormData) => Promise<any>
}

export interface RegisterFormData {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  phoneNumber: string
  address: string
  dob: string | null
  roleName: string
  loginType: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Improved token validation function
const validateToken = async (token: string): Promise<{ isValid: boolean }> => {
  try {
    if (!token) {
      return { isValid: false }
    }

    const api = createHttp('http://139.59.97.252:8080')
    const response = await api.post('/auth/introspect', { token })

    return {
      isValid:
        response.data.code === 1000 && response.data.result?.valid === true,
    }
  } catch (error) {
    console.error('Token validation error:', error)
    return { isValid: false }
  }
}

// Improved token refresh function
const refreshToken = async (token: string): Promise<string | null> => {
  try {
    if (!token) {
      return null
    }

    const api = createHttp('http://139.59.97.252:8080')
    const response = await api.post('/auth/refresh', { token })

    if (response.data.code === 1000 && response.data.result?.token) {
      const newToken = response.data.result.token
      localStorage.setItem('access-token', newToken)
      return newToken
    }

    return null
  } catch (error) {
    console.error('Token refresh error:', error)
    return null
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [user, setUser] = useState<any | null>(null)

  // Improved check authentication function
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true)

      try {
        const token = localStorage.getItem('access-token')

        // If no token, user is not authenticated
        if (!token) {
          setIsAuthenticated(false)
          setIsLoading(false)
          return
        }

        // First try to validate the token
        const { isValid } = await validateToken(token)

        // If token is valid, set authenticated and fetch user info
        if (isValid) {
          setIsAuthenticated(true)
          await fetchUserInfo()
          setIsLoading(false)
          return
        }

        // If token is invalid, try to refresh it
        const newToken = await refreshToken(token)

        if (newToken) {
          // If refresh successful, set authenticated and fetch user info
          setIsAuthenticated(true)
          await fetchUserInfo()
        } else {
          // If refresh fails, user is not authenticated
          setIsAuthenticated(false)
          // Silent failure - don't redirect automatically
        }
      } catch (error) {
        console.error('Auth check error:', error)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Separate function to fetch user info
  const fetchUserInfo = async () => {
    try {
      const api = createHttp('http://139.59.97.252:8080')
      const token = localStorage.getItem('access-token')

      if (!token) return

      api.defaults.headers.common.Authorization = `Bearer ${token}`

      const response = await api.get('/users/my-info')

      if (response.data.code === 1000) {
        setUser(response.data.result)
      } else {
        console.error('Failed to fetch user info:', response.data)
      }
    } catch (error) {
      console.error('Error fetching user info:', error)
    }
  }

  const login = async (username: string, password: string) => {
    try {
      const api = createHttp('http://139.59.97.252:8080')
      const response = await api.post('/auth/token', { username, password })

      if (response.data.code === 1000 && response.data.result?.token) {
        const token = response.data.result.token
        localStorage.setItem('access-token', token)
        setIsAuthenticated(true)

        // Fetch user info
        await fetchUserInfo()

        return response.data
      }

      return response.data
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = async () => {
    const token = localStorage.getItem('access-token')

    // Try to invalidate the token on the server
    if (token) {
      try {
        const api = createHttp('http://139.59.97.252:8080')
        await api.post('/auth/logout', { token })
      } catch (error) {
        console.error('Logout API error:', error)
      }
    }

    // Clear local storage
    localStorage.removeItem('access-token')
    setIsAuthenticated(false)
    setUser(null)
  }

  const refreshUserToken = async () => {
    try {
      const token = localStorage.getItem('access-token')

      if (!token) return false

      const newToken = await refreshToken(token)
      return !!newToken
    } catch (error) {
      console.error('Token refresh error:', error)
      return false
    }
  }

  const register = async (authData: RegisterFormData) => {
    try {
      const api = createHttp('http://139.59.97.252:8080')
      const response = await api.post('/users', authData)
      if (response.data.code === 1000) {
        return response.data
      } else {
        throw new Error(response.data.message || 'Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login,
        logout,
        refreshUserToken,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
