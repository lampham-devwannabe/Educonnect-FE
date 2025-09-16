import { useState, useEffect } from 'react'
export const useMentorSalesHooks = () => {
  const [salesMentorData, setSalesMentorData] = useState(null)

  const fetchMenorSalesSummery = async () => {
    try {
      const formData = new FormData()
      const res = await fetch('/api/mentorship-plan/sales-summery', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      console.log('Sales data:', data)
      setSalesMentorData(data)
    } catch (error) {
      console.error('Error fetching notification data:', error)
    }
  }

  useEffect(() => {
    fetchMenorSalesSummery()
  }, [])

  return { salesMentorData, fetchMenorSalesSummery }
}
