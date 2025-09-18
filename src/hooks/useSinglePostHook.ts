import { useState, useEffect } from 'react'
import type { Dispatch, SetStateAction } from 'react'

// Define interface for post data
interface Post {
  // Add specific properties based on your actual post structure
  [key: string]: any
}

interface UseSinglePostHooksReturn {
  posts: Post[]
  setPosts: Dispatch<SetStateAction<Post[]>>
  fetchSinglePosts: (
    page?: number,
    search?: string,
    statusFilter?: string
  ) => Promise<void>
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  totalPages: number
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
  filter: string
  setFilter: Dispatch<SetStateAction<string>>
}

export const useSinglePostHooks = (
  userId: string
): UseSinglePostHooksReturn => {
  const [posts, setPosts] = useState<Post[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filter, setFilter] = useState<string>('all')

  const fetchSinglePosts = async (
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
