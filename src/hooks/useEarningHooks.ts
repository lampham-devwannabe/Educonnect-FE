import { useState, useEffect } from 'react'

// Define interface for the earnings data
interface Earning {
  // Add properties based on your actual earnings data structure
  [key: string]: never // This allows for any properties until you define them specifically
}

export const useEarningHooks = (): {
  earning: Earning | undefined
  fetchEarning: () => Promise<void>
} => {
  const [earning, setEarning] = useState<Earning | undefined>(undefined)

  const fetchEarning = async (): Promise<void> => {
    try {
      const formData = new FormData()
      const res = await fetch('/api/earning', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      console.log(data)
      setEarning(data.earnings)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchEarning()
  }, [])

  return { earning, fetchEarning }
}
