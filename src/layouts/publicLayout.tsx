import React from 'react'
import NavbarTop from '@/components/navbarTop'
import Footer from '@/components/footer'
import NavbarComponent from '@/components/navbarComponent'
import { CartProvider } from '@/utils/CartContext'
import { Toaster } from 'react-hot-toast'
import NavbarBottomComponent from '@/components/navbarBottomComponent'

interface LayoutProps {
  children: React.ReactNode
}

const PublicLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <CartProvider>
      <NavbarTop />
      <NavbarComponent />

      <main>{children}</main>
      <Toaster />
      <NavbarBottomComponent />
      <Footer />
    </CartProvider>
  )
}

export default PublicLayout
