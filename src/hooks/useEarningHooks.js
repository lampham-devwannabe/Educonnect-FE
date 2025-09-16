import { useState, useEffect } from 'react'

export const useEarningHooks = () => {
  const [earning, setEarning] = useState()
  const fetchEarning = async () => {
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
