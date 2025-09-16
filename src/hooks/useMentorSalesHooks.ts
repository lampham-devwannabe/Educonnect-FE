import { useState, useEffect } from 'react'

// Define interface for the mentor sales data
interface MentorSalesData {
  // Add properties based on your actual mentor sales data structure
  [key: string]: never
}

export const useMentorSalesHooks = (): {
  salesMentorData: MentorSalesData | null
  fetchMenorSalesSummery: () => Promise<void>
} => {
  const [salesMentorData, setSalesMentorData] =
    useState<MentorSalesData | null>(null)

  const fetchMenorSalesSummery = async (): Promise<void> => {
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
