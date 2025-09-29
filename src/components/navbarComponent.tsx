import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import type { User } from '@/models/user'

// Utility function to get user from local storage
const getUserFromLocalStorage = (): User => {
  if (typeof window === 'undefined')
    return {
      token: '',
      id: '',
      firstName: '',
      lastName: '',
      image: '',
      role: '',
      email: '',
    }

  return {
    token: localStorage.getItem('access-token') ?? '',
    id: localStorage.getItem('user_id') ?? '',
    firstName: localStorage.getItem('firstName') ?? '',
    lastName: localStorage.getItem('lastName') ?? '',
    image: localStorage.getItem('image') ?? '',
    role: localStorage.getItem('role') ?? '',
    email: localStorage.getItem('email') ?? '',
  }
}

const NavbarComponent: React.FC = () => {
  const [userInfo, setUserInfo] = useState<User>()

  useEffect(() => {
    const userData = getUserFromLocalStorage()
    setUserInfo(userData)

    // Optional: Log user info for debugging
    console.log('User Info:', userData)
  }, [])

  return (
    <div className="sticky top-0 z-[999]">
      {userInfo && <Navbar user={userInfo} />}
    </div>
  )
}

export default NavbarComponent
