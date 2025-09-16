import { useState, useEffect } from 'react'

export const useWithdrawRequestStatsHooks = () => {
  const [withdrawRequestStats, setWithdrawRequestStats] = useState([])

  const fetchWithdrawRequestStats = async () => {
    try {
      const res = await fetch('/api/withdraw-request/stats')
      const data = await res.json()
      console.log('Withdraw Request Stats:', data)
      setWithdrawRequestStats(data.data || [])
    } catch (error) {
      console.error('Error fetching withdraw request stats:', error)
    }
  }

  useEffect(() => {
    fetchWithdrawRequestStats()
  }, [])

  return { withdrawRequestStats, fetchWithdrawRequestStats }
}
