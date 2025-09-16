import { useState, useEffect } from 'react'

export const useWithdrawGetwayHooks = status => {
  const [withdrawGetway, setWithdrawGetway] = useState([])

  const getWithdrawGetway = async () => {
    try {
      const formData = new FormData()
      formData.append('status', status || '')
      const res = await fetch('/api/withdraw-getway', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      setWithdrawGetway(data.withdrawGateways)
    } catch (error) {
      console.error('Error fetching withdraw gateway data:', error)
    }
  }

  useEffect(() => {
    getWithdrawGetway()
  }, [])

  return {
    withdrawGetway,
    getWithdrawGetway, // Expose this function for manual refresh
  }
}
