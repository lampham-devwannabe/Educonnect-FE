import { useState, useEffect } from 'react'
export const useMentorPlanHooks = () => {
  const [mentorPlan, setmentorPlan] = useState()
  const fetchMentorPlan = async () => {
    try {
      const formData = new FormData()
      const res = await fetch('/api/mentorship-plan/all', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      setmentorPlan(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMentorPlan()
  }, [])
  return { mentorPlan }
}
