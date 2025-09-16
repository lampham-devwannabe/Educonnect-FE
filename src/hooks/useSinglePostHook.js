import { useState, useEffect } from 'react'

export const useSinglePostHooks = userId => {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')

  const fetchSinglePosts = async (
    page = 1,
    search = '',
    statusFilter = 'all'
  ) => {
    try {
      const formData = new FormData()
      formData.append('page', page)
      formData.append('pagination', 5)
      formData.append('search', search)
      //formData.append("type", statusFilter);

      formData.append('userId', userId)

      const response = await fetch('/api/post-feed/my-post', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      setPosts(data.data || [])
      setTotalPages(Math.ceil(data.total / 5)) // Assuming total items count is returned in the response
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  useEffect(() => {
    if (!userId) return
    fetchSinglePosts(currentPage, searchTerm, filter)
  }, [currentPage, searchTerm, filter, userId])

  return {
    posts,
    setPosts,
    fetchSinglePosts,
    currentPage,
    setCurrentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
  }
}
