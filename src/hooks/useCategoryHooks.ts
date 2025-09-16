import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

// Define interfaces for the category data
interface Category {
  _id: string
  status: 'active' | 'inactive'
  // Add other category properties as needed
  // Examples: name: string; description: string; etc.
}

interface CategoryResponse {
  data: Category[]
  total: number
}

export const useCategoryData = (
  currentPage: number
): {
  categoryData: Category[]
  totalPages: number
  fetchCategories: () => Promise<void>
  loading: boolean
} => {
  const [categoryData, setCategoryData] = useState<Category[]>([])
  const [totalPages, setTotalPages] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchCategories = async (): Promise<void> => {
    try {
      const formData = new FormData()
      formData.set('page', currentPage.toString())
      formData.set('pagination', '5')
      const res = await fetch('/api/category', {
        cache: 'no-store',
        method: 'POST',
        body: formData,
      })

      const data: CategoryResponse = await res.json()
      setCategoryData(data.data)
      setTotalPages(Math.ceil(data.total / 5)) // Assuming total items count is returned in the response
      setLoading(false)
    } catch (error) {
      console.error('Error fetching category data:', error)
      toast.error('Failed to fetch category data')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [currentPage])

  return { categoryData, totalPages, fetchCategories, loading }
}

export const useUpdateCategoryStatus = (
  fetchCategories: () => Promise<void>
): {
  updateCategoryStatus: (category: Category) => Promise<void>
} => {
  const updateCategoryStatus = async (category: Category): Promise<void> => {
    const formData = new FormData()
    formData.set('id', category._id)
    formData.set('status', category.status === 'active' ? 'inactive' : 'active')

    const toastId = toast.loading('Updating category status...')
    try {
      const res = await fetch('/api/category/update-status', {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) {
        throw new Error(res.status.toString())
      } else {
        toast.dismiss(toastId)
        toast.success('Category status updated successfully')
        fetchCategories()
      }
    } catch (error) {
      console.error('Error updating category status:', error)
      toast.dismiss(toastId)
      toast.error('Failed to update category status')
    }
  }

  return { updateCategoryStatus }
}
