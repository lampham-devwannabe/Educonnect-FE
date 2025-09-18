import { useState, useEffect } from 'react'

// Define interface for withdraw request data
interface WithdrawRequest {
  // Add specific properties based on your actual withdraw request structure
  [key: string]: any
}

interface UseWithdrawRequestHooksProps {
  currentPage: number
  endpoint: string
  searchQuery?: string
  status?: string
}

interface UseWithdrawRequestHooksReturn {
  withdrawRequestData: WithdrawRequest[]
  total: number
  fetchWithdrawRequest: (page?: number) => Promise<void>
}

export const useWithdrawRequestHooks = ({
  currentPage,
  endpoint,
  searchQuery,
  status,
}: UseWithdrawRequestHooksProps): UseWithdrawRequestHooksReturn => {
  const [withdrawRequestData, setWithdrawRequestData] = useState<
    WithdrawRequest[]
  >([])
  const [total, setTotal] = useState<number>(0)

  const fetchWithdrawRequest = async (page = 1): Promise<void> => {
    try {
      const formData = new FormData()
      formData.append('page', page.toString())
      formData.append('pagination', '5')
      if (searchQuery) formData.append('transactionId', searchQuery)
      if (status) formData.append('status', status)

      const res = await fetch(`/api/withdraw-request/${endpoint}`, {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      console.log('Withdraw Request data:', data)

      setWithdrawRequestData(data.withdrawRequest || [])
      setTotal(data.total || 0)
    } catch (error) {
      console.error('Error fetching withdraw request data:', error)
    }
  }

  useEffect(() => {
    fetchWithdrawRequest(currentPage)
  }, [currentPage, endpoint, searchQuery, status])

  return { withdrawRequestData, total, fetchWithdrawRequest }
}
