import { useState, useEffect } from 'react'

// Define interfaces for the data structures
interface DashboardSummaryData {
  // Add properties based on your actual data structure
  [key: string]: any
}

interface ChartDataBar {
  // Add properties based on your chart data structure
  [key: string]: any
}

interface TopCategoryData {
  // Add properties based on your category data structure
  [key: string]: any
}

interface ChartConfig {
  // Add properties based on your chart config structure
  [key: string]: any
}

interface LastWeekCheckoutData {
  // Add properties based on your checkout data structure
  [key: string]: any
}

export const useDashboardSummryHooks = (): {
  dashboardSummryData: DashboardSummaryData | null
  fetchDashboardSummry: () => Promise<void>
} => {
  const [dashboardSummryData, setDashboardSummryData] =
    useState<DashboardSummaryData | null>(null)

  const fetchDashboardSummry = async (): Promise<void> => {
    try {
      const res = await fetch('/api/dashboard-summary', {
        method: 'GET',
      })

      const data = await res.json()
      console.log('Dashboard data:', data)
      setDashboardSummryData(data)
    } catch (error) {
      console.error('Error fetching notification data:', error)
    }
  }

  useEffect(() => {
    fetchDashboardSummry()
  }, [])

  return { dashboardSummryData, fetchDashboardSummry }
}

export const useCoursPlanChartHooks = (): {
  coursePlanChartData: ChartDataBar | null
  fetchCoursePlanChartData: () => Promise<void>
} => {
  const [coursePlanChartData, setCoursePlanChartData] =
    useState<ChartDataBar | null>(null)

  const fetchCoursePlanChartData = async (): Promise<void> => {
    try {
      const res = await fetch('/api/dashboard-summary/checkout-chart', {
        method: 'GET',
      })

      const data = await res.json()
      console.log('Course Plan Chart data:', data)
      setCoursePlanChartData(data.chartDataBar)
    } catch (error) {
      console.error('Error fetching notification data:', error)
    }
  }

  useEffect(() => {
    fetchCoursePlanChartData()
  }, [])

  return { coursePlanChartData, fetchCoursePlanChartData }
}

export const useTopCategoryHooks = (): {
  topCategoryData: TopCategoryData | null
  chartConfig: ChartConfig | null
  fetchTopCategoryData: () => Promise<void>
} => {
  const [topCategoryData, setTopCategoryData] =
    useState<TopCategoryData | null>(null)
  const [chartConfig, setChartConfig] = useState<ChartConfig | null>(null)

  const fetchTopCategoryData = async (): Promise<void> => {
    try {
      const res = await fetch('/api/dashboard-summary/top-category', {
        method: 'GET',
      })

      const data = await res.json()
      console.log('Top Category data:', data)
      setTopCategoryData(data.chartData)
      setChartConfig(data.chartConfig)
    } catch (error) {
      console.error('Error fetching notification data:', error)
    }
  }

  useEffect(() => {
    fetchTopCategoryData()
  }, [])

  return { topCategoryData, chartConfig, fetchTopCategoryData }
}

export const useLastWeekCheckoutHooks = (): {
  lastWeekCheckoutData: LastWeekCheckoutData | null
  fetchLastWeekCheckoutData: () => Promise<void>
} => {
  const [lastWeekCheckoutData, setLastWeekCheckoutData] =
    useState<LastWeekCheckoutData | null>(null)

  const fetchLastWeekCheckoutData = async (): Promise<void> => {
    try {
      const res = await fetch('/api/dashboard-summary/lastweek-checkout', {
        method: 'GET',
      })

      const data = await res.json()
      console.log('Last Week Checkout data:', data)
      setLastWeekCheckoutData(data.data)
    } catch (error) {
      console.error('Error fetching notification data:', error)
    }
  }

  useEffect(() => {
    fetchLastWeekCheckoutData()
  }, [])

  return { lastWeekCheckoutData, fetchLastWeekCheckoutData }
}
