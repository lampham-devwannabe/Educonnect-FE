import Cookies from 'js-cookie';

/**
 * Clears all cookies in the browser
 * For client-side usage in React applications
 */
export function clearCookies(): void {
  // Get all cookies
  const allCookies = Object.keys(Cookies.get());

  // Delete each cookie
  allCookies.forEach(cookieName => {
    Cookies.remove(cookieName);
  });
}

/**
 * Clears only authentication-related cookies
 * Useful for logout functionality
 */
export function clearAuthCookies(): void {
  // List of authentication-related cookies
  const authCookies = [
    'access-token',
    'refresh-token',
    'user_id',
    'name',
    'email',
    'role',
    'image'
  ];

  // Delete each auth cookie
  authCookies.forEach(cookieName => {
    Cookies.remove(cookieName);
  });
}

/**
 * Logs out the user by clearing auth cookies and redirecting
 * @param redirectUrl - URL to redirect to after logout
 */
export function logout(redirectUrl: string = '/'): void {
  clearAuthCookies();
  window.location.href = redirectUrl;
}