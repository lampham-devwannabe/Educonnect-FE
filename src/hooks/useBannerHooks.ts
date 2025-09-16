import { useState, useEffect } from 'react'

// Define interfaces for the banner data
interface Banner {
  id: string
  // Add other banner properties as needed
  // For example: title: string; imageUrl: string; etc.
}

interface BannerResponse {
  banners: Banner[]
  totalPages: number
  page: number
  message?: string
}

export const useBannerHooks = (): {
  banners: Banner[]
  loading: boolean
  error: string | null
  currentPage: number
  totalPages: number
  setCurrentPage: (page: number) => void
  fetchBanners: (page?: number, limit?: number) => Promise<void>
} => {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Current page of the pagination
  const [currentPage, setCurrentPage] = useState<number>(1)

  // Total number of pages
  const [totalPages, setTotalPages] = useState<number>(1)

  const fetchBanners = async (page = 1, limit = 5): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/banners?page=${page}&limit=${limit}`)
      const data: BannerResponse = await res.json()

      if (res.ok) {
        setBanners(data.banners)
        setTotalPages(data.totalPages)
        setCurrentPage(data.page)
      } else {
        throw new Error(data.message || 'Failed to fetch banners')
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Fetch banners when the hook is mounted or the currentPage changes
    fetchBanners(currentPage)
  }, [currentPage])

  return {
    banners,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    fetchBanners,
  }
}
