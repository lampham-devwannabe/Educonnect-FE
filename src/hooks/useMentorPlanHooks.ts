import { useState, useEffect } from 'react'

// Define interface for the mentor plan data
interface MentorPlan {
  // Add properties based on your actual mentor plan data structure
  [key: string]: any
}

export const useMentorPlanHooks = (): {
  mentorPlan: MentorPlan | undefined
  fetchMentorPlan: () => Promise<void>
} => {
  const [mentorPlan, setmentorPlan] = useState<MentorPlan | undefined>(
    undefined
  )

  const fetchMentorPlan = async (): Promise<void> => {
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

  return { mentorPlan, fetchMentorPlan }
}
