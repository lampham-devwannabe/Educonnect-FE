import { useState, useEffect } from 'react'
export const useCourseSalesHooks = () => {
  const [salesSummeryData, setSalesSummeryData] = useState(null)

  const fetchCourseSalesSummery = async () => {
    try {
      const formData = new FormData()
      const res = await fetch('/api/course/sales-summery', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      console.log('Sales data:', data)
      setSalesSummeryData(data)
    } catch (error) {
      console.error('Error fetching notification data:', error)
    }
  }

  useEffect(() => {
    fetchCourseSalesSummery()
  }, [])

  return { salesSummeryData, fetchCourseSalesSummery }
}
