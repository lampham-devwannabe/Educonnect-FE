import { useState, useEffect } from 'react'

export const useTransactionHooks = () => {
  const [transactionData, setTransactionData] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')

  const fetchTransactionData = async () => {
    try {
      const formData = new FormData()

      const res = await fetch('/api/transaction/all', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      console.log('Transaction data:', data)
      setTransactionData(data.data)
      setTotalPages(Math.ceil(data.total / 5)) // Assuming total items count is returned in the response
    } catch (error) {
      console.error('Error fetching notification data:', error)
    }
  }

  useEffect(() => {
    fetchTransactionData(currentPage, searchTerm, filter)
  }, [currentPage, searchTerm, filter])

  return {
    transactionData,
    fetchTransactionData,
    currentPage,
    setCurrentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
  }
}

export const useTransactionSummary = () => {
  const [summary, setSummary] = useState({
    today: 0,
    thisMonth: 0,
    all: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTransactionSummary = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(
          '/api/transaction',

          {
            method: 'GET',
          }
        )
        if (!response.ok) {
          throw new Error('Failed to fetch transaction summary')
        }
        const data = await response.json()
        console.log('Transaction summary:', data)
        setSummary(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactionSummary()
  }, [])

  return { summary, loading, error }
}
