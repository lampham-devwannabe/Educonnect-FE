'use client'
import { createContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export interface CartItem {
  _id: string
  name: string
  price: number
  quantity: number
  image?: string
}

export interface CartContextType {
  cartData: CartItem[]
  fetchCart: () => Promise<void>
}

interface CartProviderProps {
  children: ReactNode
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartData, setCartData] = useState<CartItem[]>([])

  const fetchCart = async (): Promise<void> => {
    try {
      const formData = new FormData()
      const res = await fetch('/api/cart/all', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      setCartData(data)
    } catch (error) {
      console.error('Error fetching cart:', error)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  return (
    <CartContext.Provider value={{ cartData, fetchCart }}>
      {children}
    </CartContext.Provider>
  )
}

export { CartContext }
