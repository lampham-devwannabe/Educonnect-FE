import { useState, useEffect } from 'react'

// Define interface for withdraw gateway data
interface WithdrawGateway {
  // Add specific properties based on your actual withdraw gateway structure
  [key: string]: any
}

interface UseWithdrawGetwayHooksReturn {
  withdrawGetway: WithdrawGateway[]
  getWithdrawGetway: () => Promise<void>
}

export const useWithdrawGetwayHooks = (
  status?: string
): UseWithdrawGetwayHooksReturn => {
  const [withdrawGetway, setWithdrawGetway] = useState<WithdrawGateway[]>([])

  const getWithdrawGetway = async (): Promise<void> => {
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
  }, [status])

  return {
    withdrawGetway,
    getWithdrawGetway, // Expose this function for manual refresh
  }
}
