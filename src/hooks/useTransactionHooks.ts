import { useState, useEffect } from 'react'
import type { Dispatch, SetStateAction } from 'react'

// Define interface for transaction data
interface Transaction {
  // Add specific properties based on your actual transaction structure
  [key: string]: never
}

interface TransactionSummary {
  today: number
  thisMonth: number
  all: number
}

interface UseTransactionHooksReturn {
  transactionData: Transaction[] | null
  fetchTransactionData: (
    page?: number,
    search?: string,
    filter?: string
  ) => Promise<void>
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  totalPages: number
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
  filter: string
  setFilter: Dispatch<SetStateAction<string>>
}

export const useTransactionHooks = (): UseTransactionHooksReturn => {
  const [transactionData, setTransactionData] = useState<Transaction[] | null>(
    null
  )
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filter, setFilter] = useState<string>('all')

  const fetchTransactionData = async (
    page = 1,
    search = '',
    statusFilter = 'all'
  ): Promise<void> => {
    try {
      const formData = new FormData()
      formData.append('page', page.toString())
      formData.append('pagination', '5')
      formData.append('search', search)
      formData.append('type', statusFilter)

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

interface UseTransactionSummaryReturn {
  summary: TransactionSummary
  loading: boolean
  error: string | null
}

export const useTransactionSummary = (): UseTransactionSummaryReturn => {
  const [summary, setSummary] = useState<TransactionSummary>({
    today: 0,
    thisMonth: 0,
    all: 0,
  })
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTransactionSummary = async (): Promise<void> => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/transaction', {
          method: 'GET',
        })
        if (!response.ok) {
          throw new Error('Failed to fetch transaction summary')
        }
        const data = await response.json()
        console.log('Transaction summary:', data)
        setSummary(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        setLoading(false)
      }
    }

    fetchTransactionSummary()
  }, [])

  return { summary, loading, error }
}
