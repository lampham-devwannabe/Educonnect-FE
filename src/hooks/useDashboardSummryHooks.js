import { useState, useEffect } from 'react'

export const useDashboardSummryHooks = () => {
  const [dashboardSummryData, setDashboardSummryData] = useState(null)

  const fetchDashboardSummry = async () => {
    try {
      const formData = new FormData()
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

export const useCoursPlanChartHooks = () => {
  const [coursePlanChartData, setCoursePlanChartData] = useState(null)

  const fetchCoursePlanChartData = async () => {
    try {
      const formData = new FormData()
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

export const useTopCategoryHooks = () => {
  const [topCategoryData, setTopCategoryData] = useState(null)
  const [chartConfig, setChartConfig] = useState(null)

  const fetchTopCategoryData = async () => {
    try {
      const formData = new FormData()
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

export const useLastWeekCheckoutHooks = () => {
  const [lastWeekCheckoutData, setLastWeekCheckoutData] = useState(null)

  const fetchLastWeekCheckoutData = async () => {
    try {
      const formData = new FormData()
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
