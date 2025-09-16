import { useState, useEffect } from 'react'

// Define interface for the checkout data
interface CheckoutItem {
  // Add properties based on your actual checkout data structure
  [key: string]: never
}

export const usePlanCheckoutHooks = (
  currentPage: number,
  searchQuery: string,
  setSelectedOrder: (order: CheckoutItem) => void
): {
  checkoutData: CheckoutItem[]
  totalPages: number | undefined
} => {
  const [checkoutData, setcheckoutData] = useState<CheckoutItem[]>([])
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined)

  useEffect(() => {
    const fetchPlanCheckout = async (): Promise<void> => {
      try {
        const formdata = new FormData()
        formdata.set('page', currentPage.toString())
        formdata.set('pagination', '5')
        formdata.set('search', searchQuery)

        const res = await fetch('/api/mentorship-plan/checkout/list', {
          cache: 'no-store',
          method: 'POST',
          body: formdata,
        })
        const data = await res.json()
        setcheckoutData(data.data)
        setSelectedOrder(data.data[0])
        setTotalPages(Math.ceil(data.total / 5)) // Assuming total items count is returned in the response
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchPlanCheckout()
  }, [currentPage, searchQuery, setSelectedOrder])

  return {
    checkoutData,
    totalPages,
  }
}
