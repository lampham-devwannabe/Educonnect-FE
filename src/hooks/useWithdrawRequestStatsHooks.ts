import { useState, useEffect } from 'react'

// Define interface for withdraw request stats
interface WithdrawRequestStat {
  // Add specific properties based on your actual stats structure
  [key: string]: never
}

interface UseWithdrawRequestStatsHooksReturn {
  withdrawRequestStats: WithdrawRequestStat[]
  fetchWithdrawRequestStats: () => Promise<void>
}

export const useWithdrawRequestStatsHooks =
  (): UseWithdrawRequestStatsHooksReturn => {
    const [withdrawRequestStats, setWithdrawRequestStats] = useState<
      WithdrawRequestStat[]
    >([])

    const fetchWithdrawRequestStats = async (): Promise<void> => {
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
