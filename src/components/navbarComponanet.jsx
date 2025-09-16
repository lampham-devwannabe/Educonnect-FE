import React from 'react'
import { cookies } from 'next/headers'
import Navbar from './navbar.js'
import { getUserFromCookies } from '@/utils/cookies'

const NavbarComponent = async () => {
  const userinfo = await getUserFromCookies()

  console.log('User Info:', userinfo)

  return (
    <div className="sticky top-0 z-[999]">
      <Navbar className="container" user={userinfo} />
    </div>
  )
}

export default NavbarComponent
