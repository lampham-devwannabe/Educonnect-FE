import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

// Define interface for cart item
interface CartItem {
  id: string
  cartId: string
  name: string
  price: string
  // Add other cart item properties as needed
  // Examples: productId: string; quantity: number; price: number; etc.
}

export const useCartHooks = (
  watch = true
): {
  cartData: CartItem[]
  fetchCart: () => Promise<void>
} => {
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
      console.error('Error fetching cart data:', error)
      toast.error('Failed to fetch cart data')
    }
  }

  useEffect(() => {
    if (watch) fetchCart()
  }, [watch])

  return { cartData, fetchCart }
}
