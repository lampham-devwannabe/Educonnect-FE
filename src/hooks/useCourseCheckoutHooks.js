import { useState, useEffect } from 'react'

export const useCourseCheckoutHooks = (
  currentPage,
  searchQuery,
  setSelectedOrder
) => {
  const [checkoutData, setcheckoutData] = useState([])
  const [totalPages, setTotalPages] = useState()

  useEffect(() => {
    const fetchCourseCheckout = async () => {
      try {
        const formdata = new FormData()
        formdata.set('page', currentPage)
        formdata.set('pagination', 5)
        formdata.set('search', searchQuery)

        const res = await fetch('/api/course/checkout/list', {
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

    fetchCourseCheckout()
  }, [currentPage, searchQuery])

  return {
    checkoutData,
    totalPages,
  }
}
