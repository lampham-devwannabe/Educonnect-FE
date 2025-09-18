import Cookies from 'js-cookie'

interface User {
  token: string | undefined
  user_id: string | undefined
  name: string
  image: string
  email: string
  role: string
}

/**
 * Gets user information from browser cookies
 */
export function getUserFromCookies(): User {
  return {
    token: Cookies.get('access-token'),
    user_id: Cookies.get('user_id'),
    name: Cookies.get('name') || 'Guest',
    image: Cookies.get('image') || '/default-avatar.png',
    email: Cookies.get('email') || 'Not Provided',
    role: Cookies.get('role') || 'User',
  }
}

/**
 * Sets user cookies in the browser
 */
export function setCookies(name: string, email: string, image: string): void {
  const options = {
    sameSite: 'strict' as const,
    secure: true,
    expires: 7, // 7 days expiration
  }

  Cookies.set('name', name, options)
  Cookies.set('email', email, options)
  Cookies.set('image', image, options)
}

/**
 * Sets a specific cookie with the provided options
 */
export function setCookie(
  name: string,
  value: string,
  options?: Cookies.CookieAttributes
): void {
  Cookies.set(name, value, options)
}

/**
 * Removes a cookie by name
 */
export function removeCookie(name: string): void {
  Cookies.remove(name)
}

/**
 * Clears all user related cookies (logout)
 */
export function clearUserCookies(): void {
  const cookiesToClear = [
    'access-token',
    'user_id',
    'name',
    'image',
    'email',
    'role',
  ]

  cookiesToClear.forEach(cookieName => {
    Cookies.remove(cookieName)
  })
}
