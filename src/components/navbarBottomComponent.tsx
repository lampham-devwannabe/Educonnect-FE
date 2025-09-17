import React, { useEffect, useState } from 'react'
import NavbarBottom from './navbarBottom'

interface UserInfo {
  token?: string
  user_id?: string
  name?: string
  image?: string
  role?: string
}

const NavbarBottomComponent: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({})

  useEffect(() => {
    // In React, we use localStorage instead of cookies from Next.js
    const getUserInfo = () => {
      const token = localStorage.getItem('access-token') || undefined
      const user_id = localStorage.getItem('user_id') || undefined
      const name = localStorage.getItem('name') || undefined
      const image = localStorage.getItem('image') || undefined
      const role = localStorage.getItem('role') || undefined

      setUserInfo({
        token,
        user_id,
        name,
        image,
        role,
      })
    }

    getUserInfo()
  }, [])

  return (
    <div className="container">
      <NavbarBottom user={userInfo} />
    </div>
  )
}

export default NavbarBottomComponent
