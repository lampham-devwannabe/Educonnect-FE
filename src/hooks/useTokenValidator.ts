import { useEffect, useState } from 'react'
import { validateToken, refreshToken } from '../services/auth'

export const useTokenValidator = (intervalMinutes = 5) => {
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [isChecking, setIsChecking] = useState<boolean>(false)

  // Function to check and refresh token if needed
  const checkAndRefreshToken = async () => {
    try {
      setIsChecking(true)

      // Get current token
      const token = localStorage.getItem('access-token')

      if (!token) {
        setIsValid(false)
        return
      }

      // Check if token is valid
      const { isValid: tokenIsValid } = await validateToken(token)

      if (tokenIsValid) {
        setIsValid(true)
      } else {
        // If token is invalid, try to refresh it
        try {
          await refreshToken(token)
          setIsValid(true)
        } catch (error) {
          setIsValid(false)
          window.location.href = '/login'
        }
      }
    } catch (error) {
      console.error('Token validation error:', error)
      setIsValid(false)
    } finally {
      setIsChecking(false)
    }
  }

  // Check token validity on mount and periodically
  useEffect(() => {
    // Initial check
    checkAndRefreshToken()

    // Set up periodic check
    const interval = setInterval(
      () => {
        checkAndRefreshToken()
      },
      intervalMinutes * 60 * 1000
    )

    return () => clearInterval(interval)
  }, [intervalMinutes])

  return { isValid, isChecking, checkAndRefreshToken }
}
