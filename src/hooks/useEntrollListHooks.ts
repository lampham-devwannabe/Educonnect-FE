import { useState, useEffect } from 'react'

// Define interface for the enrollment data
interface EnrollItem {
  // Add properties based on your actual enrollment data structure
  [key: string]: never // This allows for any properties until you define them specifically
}

export const useEnrollListHooks = (): {
  enrollListData: EnrollItem[]
  fetchEnrollList: () => Promise<void>
} => {
  const [enrollListData, setEnrollListData] = useState<EnrollItem[]>([])

  const fetchEnrollList = async (): Promise<void> => {
    try {
      const formData = new FormData()
      const res = await fetch('/api/course/enroll-list', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      console.log('Sales data:', data.enrollListData)
      setEnrollListData(data.enrollList)
    } catch (error) {
      console.error('Error fetching notification data:', error)
    }
  }

  useEffect(() => {
    fetchEnrollList()
  }, [])

  return { enrollListData, fetchEnrollList }
}
