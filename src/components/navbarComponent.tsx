import React, { useEffect, useState } from 'react'
import Navbar from './navbar'

interface UserInfo {
  token?: string
  user_id?: string
  name?: string
  image?: string
  role?: string
}

// Utility function to get user from local storage
const getUserFromLocalStorage = (): UserInfo => {
  if (typeof window === 'undefined') return {}

  return {
    token: localStorage.getItem('access-token') || undefined,
    user_id: localStorage.getItem('user_id') || undefined,
    name: localStorage.getItem('name') || undefined,
    image: localStorage.getItem('image') || undefined,
    role: localStorage.getItem('role') || undefined,
  }
}

const NavbarComponent: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({})

  useEffect(() => {
    const userData = getUserFromLocalStorage()
    setUserInfo(userData)

    // Optional: Log user info for debugging
    console.log('User Info:', userData)
  }, [])

  return (
    <div className="sticky top-0 z-[999]">
      <Navbar user={userInfo} />
    </div>
  )
}

export default NavbarComponent
