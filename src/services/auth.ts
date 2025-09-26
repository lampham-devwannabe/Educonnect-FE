import axios from '@/services/axios'

export const validateToken = async (
  token = localStorage.getItem('access-token')
) => {
  try {
    if (!token) {
      return { isValid: false }
    }

    const response = await axios.post('/auth/introspect', { token })

    return {
      isValid: response.data.result?.valid === true,
      tokenData: response.data.result,
    }
  } catch (error) {
    console.error('Token validation error:', error)
    return { isValid: false }
  }
}

// Get a new token using the existing token
export const refreshToken = async (
  token = localStorage.getItem('access-token')
) => {
  try {
    if (!token) {
      throw new Error('No token available')
    }

    const response = await axios.post('/auth/refresh', { token })

    if (response.data.code === 1000 && response.data.result?.token) {
      // Update token in storage
      localStorage.setItem('access-token', response.data.result.token)
      return response.data.result.token
    } else {
      throw new Error('Failed to refresh token')
    }
  } catch (error) {
    console.error('Token refresh error:', error)
    throw error
  }
}

// Logout function
export const logout = async () => {
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

  // Redirect to login
  window.location.href = '/login'
}
