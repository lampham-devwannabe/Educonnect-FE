import { useState, useEffect } from 'react'

// Define interface for sales summary data
interface SalesSummaryData {
  // Add properties based on your actual data structure
  // Examples: totalSales: number; monthlySales: number[]; etc.
  [key: string]: string // This allows for any properties until you define them specifically
}

export const useCourseSalesHooks = (): {
  salesSummeryData: SalesSummaryData | null
  fetchCourseSalesSummery: () => Promise<void>
} => {
  const [salesSummeryData, setSalesSummeryData] =
    useState<SalesSummaryData | null>(null)

  const fetchCourseSalesSummery = async (): Promise<void> => {
    try {
      const formData = new FormData()
      const res = await fetch('/api/course/sales-summery', {
        method: 'POST',
        body: formData,
      })

      const data: SalesSummaryData = await res.json()
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
