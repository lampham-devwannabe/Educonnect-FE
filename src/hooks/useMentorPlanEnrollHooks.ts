import { useState, useEffect } from 'react'
import type { Enrollment } from '@/models/user'

export const useEnrollPlanHooks = (): {
  enrollPlan: Enrollment[]
  total: number | undefined
  fetchEnrollPlan: () => Promise<void>
} => {
  const [enrollPlan, setenrollPlan] = useState<Enrollment[]>([])
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
  enrollPlan: Enrollment[]
  total: number | undefined
  fetchEnrollPlan: () => Promise<void>
} => {
  const [enrollPlan, setenrollPlan] = useState<Enrollment[]>([])
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
