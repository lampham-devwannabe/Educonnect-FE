import React from 'react'
import { Toaster } from 'react-hot-toast'
import type Layout from './publicLayout'

interface LayoutProps {
  children: React.ReactNode
}

const AuthenLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
      <Toaster />
    </div>
  )
}

export default AuthenLayout
