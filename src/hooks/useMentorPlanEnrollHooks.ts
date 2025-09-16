import { useState, useEffect } from 'react'

// Define interface for the enrollment plan data
interface EnrollPlan {
  // Add properties based on your actual enrollment plan data structure
  [key: string]: never
}

export const useEnrollPlanHooks = (): {
  enrollPlan: EnrollPlan[]
  total: number | undefined
  fetchEnrollPlan: () => Promise<void>
} => {
  const [enrollPlan, setenrollPlan] = useState<EnrollPlan[]>([])
  const [total, setTotal] = useState<number | undefined>(undefined)

  const fetchEnrollPlan = async (): Promise<void> => {
    try {
      const formData = new FormData()
      const res = await fetch('/api/mentorship-plan/enroll-list', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      setenrollPlan(data.enrollList)
      setTotal(data.total)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchEnrollPlan()
  }, [])

  return { enrollPlan, total, fetchEnrollPlan }
}

export const useBookedPlanHooks = (): {
  enrollPlan: EnrollPlan[]
  total: number | undefined
  fetchEnrollPlan: () => Promise<void>
} => {
  const [enrollPlan, setenrollPlan] = useState<EnrollPlan[]>([])
  const [total, setTotal] = useState<number | undefined>(undefined)

  const fetchEnrollPlan = async (): Promise<void> => {
    try {
      const formData = new FormData()
      const res = await fetch('/api/mentorship-plan/booked-plan', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      setenrollPlan(data.enrollList)
      setTotal(data.total)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchEnrollPlan()
  }, [])

  return { enrollPlan, total, fetchEnrollPlan }
}
