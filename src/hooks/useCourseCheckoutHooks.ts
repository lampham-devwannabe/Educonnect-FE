import { useState, useEffect } from 'react'

// Define interfaces for the checkout data
interface CheckoutItem {
  // Add properties based on your actual data structure
  id: string
  // Examples: userId: string; courseId: string; amount: number; etc.
  [key: string]: string // This allows for additional properties
}

interface CheckoutResponse {
  data: CheckoutItem[]
  total: number
}

export const useCourseCheckoutHooks = (
  currentPage: number,
  searchQuery: string,
  setSelectedOrder: (order: CheckoutItem) => void
): {
  checkoutData: CheckoutItem[]
  totalPages: number
} => {
  const [checkoutData, setCheckoutData] = useState<CheckoutItem[]>([])
  const [totalPages, setTotalPages] = useState<number>(1)

  useEffect(() => {
    const fetchCourseCheckout = async (): Promise<void> => {
      try {
        const formdata = new FormData()
        formdata.set('page', currentPage.toString())
        formdata.set('pagination', '5')
        formdata.set('search', searchQuery)

        const res = await fetch('/api/course/checkout/list', {
          cache: 'no-store',
          method: 'POST',
          body: formdata,
        })
        const data: CheckoutResponse = await res.json()
        setCheckoutData(data.data)

        if (data.data.length > 0) {
          setSelectedOrder(data.data[0])
        }

        setTotalPages(Math.ceil(data.total / 5))
      } catch (error) {
        console.error('Error fetching checkout data:', error)
      }
    }

    fetchCourseCheckout()
  }, [currentPage, searchQuery, setSelectedOrder])

  return {
    checkoutData,
    totalPages,
  }
}
