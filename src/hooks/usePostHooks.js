import { useState, useEffect } from 'react'

export const usePostHooks = () => {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(false)

  const fetchPosts = async (page = 1, search = '', statusFilter = 'all') => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('page', page)
      formData.append('pagination', 5)
      formData.append('search', search)
      //formData.append("type", statusFilter);

      const response = await fetch('/api/post-feed/list', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      setPosts(data.data || [])
      setTotalPages(Math.ceil(data.total / 5)) // Assuming total items count is returned in the response
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts(currentPage, searchTerm, filter)
  }, [currentPage, searchTerm, filter])

  return {
    posts,
    setPosts,
    fetchPosts,
    currentPage,
    setCurrentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    loading,
  }
}
