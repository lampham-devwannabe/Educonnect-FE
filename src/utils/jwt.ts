import { SignJWT, jwtVerify } from 'jose'
import type { User } from '@/models/user'

// Make sure to provide a fallback for the secret in case environment variable is not available
const getSecret = (): Uint8Array => {
  const secretKey =
    process.env.REACT_APP_JWT_SECRET ||
    'fallback-secret-key-for-development-only'
  return new TextEncoder().encode(secretKey)
}

interface TokenPayload {
  id: string
  email: string
  role: string
  iat?: number // Issued at
  exp?: number // Expiration time
}

/**
 * Generates a JWT token for a user
 * @param user The user object containing id, email, and role
 * @param expiresIn Token expiration time in seconds (default: 1 day)
 * @returns The generated JWT token
 */
export const generateToken = async (
  user: User,
  expiresIn: number = 86400
): Promise<string> => {
  try {
    const secret = getSecret()

    const jwt = await new SignJWT({
      id: user.id,
      email: user.email,
      role: user.role,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(Math.floor(Date.now() / 1000) + expiresIn)
      .sign(secret)

    return jwt
  } catch (error) {
    console.error('Error generating token:', error)
    throw new Error('Token generation failed')
  }
}

/**
 * Verifies a JWT token and returns the payload
 * @param token The JWT token to verify
 * @returns The token payload if valid, null otherwise
 */
export const verifyToken = async (
  token: string
): Promise<TokenPayload | null> => {
  try {
    const secret = getSecret()
    const { payload } = await jwtVerify(token, secret)
    return payload as unknown as TokenPayload
  } catch (error) {
    console.error('Error verifying token:', error)
    return null
  }
}

/**
 * Decodes a JWT token without verification (useful for reading expired tokens)
 * @param token The JWT token to decode
 * @returns The decoded token payload
 */
export const decodeToken = (token: string): TokenPayload | null => {
  try {
    // Split the token into parts
    const parts = token.split('.')
    if (parts.length !== 3) return null

    // Decode the payload (middle part)
    const payload = JSON.parse(atob(parts[1]))
    return payload as TokenPayload
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}

/**
 * Checks if a token is expired
 * @param token The JWT token to check
 * @returns True if the token is expired, false otherwise
 */
export const isTokenExpired = (token: string): boolean => {
  const payload = decodeToken(token)
  if (!payload || !payload.exp) return true

  const currentTime = Math.floor(Date.now() / 1000)
  return payload.exp < currentTime
}
