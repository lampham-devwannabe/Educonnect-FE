import React, { useEffect, useState } from 'react'
import NavbarBottom from './navbarBottom'
import type { User } from '@/models/user'

const NavbarBottomComponent: React.FC = () => {
  const [userInfo, setUserInfo] = useState<User>()

  useEffect(() => {
    const getUserInfo = () => {
      const token = localStorage.getItem('access-token') ?? ''
      const _id = localStorage.getItem('user_id') ?? ''
      const firstName = localStorage.getItem('firstName') ?? ''
      const lastName = localStorage.getItem('lastName') ?? ''
      const image = localStorage.getItem('image') ?? ''
      const role = localStorage.getItem('role') ?? ''
      const email = localStorage.getItem('email') ?? ''

      setUserInfo({
        id: _id,
        firstName,
        lastName,
        image,
        token,
        role,
        email,
      })
    }

    getUserInfo()
  }, [])

  return (
    <div className="container">
      {userInfo && <NavbarBottom user={userInfo} />}
    </div>
  )
}

export default NavbarBottomComponent
