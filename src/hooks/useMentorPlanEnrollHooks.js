import { useState, useEffect } from 'react'
export const useEnrollPlanHooks = () => {
  const [enrollPlan, setenrollPlan] = useState([])
  const [total, setTotal] = useState()
  const fetchEnrollPlan = async () => {
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
  return { enrollPlan, total }
}

export const useBookedPlanHooks = () => {
  const [enrollPlan, setenrollPlan] = useState([])
  const [total, setTotal] = useState()
  const fetchEnrollPlan = async () => {
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
  return { enrollPlan, total }
}
