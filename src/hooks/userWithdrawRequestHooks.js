import { useState, useEffect } from 'react'

export const useWithdrawRequestHooks = (
  currentPage,
  endpoint,
  searchQuery,
  status
) => {
  const [withdrawRequestData, setWithdrawRequestData] = useState([])
  const [total, setTotal] = useState(0)

  const fetchWithdrawRequest = async (page = 1) => {
    try {
      const formData = new FormData()
      formData.append('page', page)
      formData.append('pagination', 5)
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
  }, [currentPage])

  return { withdrawRequestData, total, fetchWithdrawRequest }
}
