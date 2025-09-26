import React, { createContext, useContext, useState, useEffect } from 'react'
import { validateToken, refreshToken } from '../services/auth'
import axios from '@/services/axios'

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: any | null
  login: (username: string, password: string) => Promise<any>
  logout: () => Promise<void>
  refreshUserToken: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [user, setUser] = useState<any | null>(null)

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('access-token')

        // If no token, user is not authenticated but that's okay
        if (!token) {
          setIsAuthenticated(false)
          setIsLoading(false)
          return
        }

        // If token exists, validate it
        const { isValid } = await validateToken(token)
        setIsAuthenticated(isValid)

        // Only fetch user info if token is valid
        if (isValid) {
          try {
            const response = await axios.get('/users/my-info')
            setUser(response.data)
          } catch (error) {
            console.error('Error fetching user info:', error)
            // If we can't get user info, user might not be properly authenticated
            // But we won't log them out automatically
          }
        }
      } catch (error) {
        console.error('Auth check error:', error)
        // Don't set authenticated, but don't redirect either
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('/auth/token', { username, password })

      if (response.data.code === 1000) {
        localStorage.setItem('access-token', response.data.result.token)
        setIsAuthenticated(true)

        // Fetch user info
        try {
          const userResponse = await axios.get('/users/my-info')
          setUser(userResponse.data)
        } catch (userError) {
          console.error('Error fetching user info:', userError)
        }

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
        await axios.post('/auth/logout', { token })
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

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login,
        logout,
        refreshUserToken,
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
