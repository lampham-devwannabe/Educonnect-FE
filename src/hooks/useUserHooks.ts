import { useState, useEffect } from 'react'

// Define interface for user data
interface User {
  // Add specific properties based on your actual user structure
  [key: string]: never
}

interface UseUserHooksReturn {
  userData: User[]
  totalPages: number | undefined
  loading: boolean
}

export const useUserHooks = (
  currentPage: number,
  userType: string,
  searchQuery: string,
  reloadFlag: boolean,
  seletedStatus: string
): UseUserHooksReturn => {
  const [userData, setUserData] = useState<User[]>([])
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined)
  const [loading, setloading] = useState<boolean>(true)

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        const formdata = new FormData()
        formdata.set('page', currentPage.toString())
        formdata.set('pagination', '5')
        formdata.set('search', searchQuery)
        formdata.set('role', userType)
        formdata.set('status', seletedStatus)
        const res = await fetch('/api/user', {
          cache: 'no-store',
          method: 'POST',
          body: formdata,
        })
        const data = await res.json()
        setUserData(data.data)
        setTotalPages(Math.ceil(data.total / 5)) // Assuming total items count is returned in the response
        setloading(false)
      } catch (error) {
        setloading(false)
        console.error('Error fetching user data:', error)
      }
    }

    fetchUsers()
  }, [currentPage, userType, searchQuery, reloadFlag, loading])

  return {
    userData,
    totalPages,
    loading,
  }
}

// Define interface for user details
interface UserDetails {
  // Add specific properties based on your actual user details structure
  [key: string]: never
}

interface UseUserDetailsHooksReturn {
  userDetails: UserDetails
}

export const useUserDetailsHooks = (): UseUserDetailsHooksReturn => {
  const [userDetails, setUserDetails] = useState<UserDetails>({})

  useEffect(() => {
    const fetchUserDetails = async (): Promise<void> => {
      try {
        const formdata = new FormData()
        const res = await fetch('/api/user/details', {
          method: 'POST',
          body: formdata,
        })
        const data = await res.json()
        setUserDetails(data.data)
      } catch (error) {
        console.error('Error fetching user details:', error)
      }
    }

    fetchUserDetails()
  }, [])

  return {
    userDetails,
  }
}
