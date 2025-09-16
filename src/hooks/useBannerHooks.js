import { useState, useEffect } from 'react'

export const useBannerHooks = () => {
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Current page of the pagination
  const [currentPage, setCurrentPage] = useState(1)

  // Total number of pages
  const [totalPages, setTotalPages] = useState(1)

  const fetchBanners = async (page = 1, limit = 5) => {
    setLoading(true)
    setError(null)
    try {
      // const res = await fetch(`/api/banners?page=${page}&limit=${limit}`);
      const res = await fetch(`/api/banners`)
      const data = await res.json()

      if (res.ok) {
        setBanners(data.banners)
        setTotalPages(data.totalPages)
        setCurrentPage(data.page)
      } else {
        throw new Error(data.message || 'Failed to fetch banners')
      }
    } catch (error) {
      setError(error.message)
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
