import { useState, useEffect } from 'react'

export const useUserHooks = (
  currentPage,
  userType,
  searchQuery,
  reloadFlag,
  seletedStatus
) => {
  const [userData, setUserData] = useState([])
  const [totalPages, setTotalPages] = useState()
  const [loading, setloading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const formdata = new FormData()
        formdata.set('page', currentPage)
        formdata.set('pagination', 5)
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

// get user Details

export const useUserDetailsHooks = () => {
  const [userDetails, setUserDetails] = useState({})

  useEffect(() => {
    const fetchUserDetails = async () => {
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
