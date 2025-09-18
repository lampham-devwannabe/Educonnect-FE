import React from 'react'
import Navbar from '@/components/navbar'
import NavbarTop from '@/components/navbarTop'
import NavbarBottom from '@/components/navbarBottom'
import Footer from '@/components/footer'
import NavbarComponent from '@/components/navbarComponent'
import { CartProvider } from '@/utils/CartContext'
import { Toaster } from 'react-hot-toast'
import NavbarBottomComponent from '@/components/navbarBottomComponent'

interface LayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: 'Smart Academy',
  description:
    'Smart Academy is a platform that connects students with tutors. Find the best tutors for your needs.',
  icons: {
    icon: '/favicon.ico',
  },
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <CartProvider>
        <NavbarTop />
        <NavbarComponent />

        <main>{children}</main>
        <Toaster />
        <NavbarBottomComponent />
        <Footer />
      </CartProvider>
    </>
  )
}

export default Layout
