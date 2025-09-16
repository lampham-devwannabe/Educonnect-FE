import { useState, useEffect } from 'react'
export const useEnrollListHooks = () => {
  const [enrollListData, setEnrollListData] = useState([])

  const fetchEnrollList = async () => {
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
