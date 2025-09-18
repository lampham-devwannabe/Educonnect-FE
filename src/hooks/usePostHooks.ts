import { useState, useEffect } from 'react'

// Define interface for post data
interface Post {
  // Add specific properties based on your actual post structure
  [key: string]: any
}

interface UsePostHooksReturn {
  posts: Post[]
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
  fetchPosts: (
    page?: number,
    search?: string,
    statusFilter?: string
  ) => Promise<void>
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  totalPages: number
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  filter: string
  setFilter: React.Dispatch<React.SetStateAction<string>>
  loading: boolean
}

export const usePostHooks = (): UsePostHooksReturn => {
  const [posts, setPosts] = useState<Post[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filter, setFilter] = useState<string>('all')
  const [loading, setLoading] = useState<boolean>(false)

  const fetchPosts = async (
    page = 1,
    search = '',
    statusFilter = 'all'
  ): Promise<void> => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('page', page.toString())
      formData.append('pagination', '5')
      formData.append('search', search)
      formData.append('type', statusFilter)

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
