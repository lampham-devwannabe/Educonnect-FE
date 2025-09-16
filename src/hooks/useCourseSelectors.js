import { useState, useEffect } from 'react'

const useCourseData = ({ categoryID }) => {
  const [categoryData, setCategoryData] = useState([])
  const [subCategoryData, setSubCategoryData] = useState([])
  const [courseTypeData, setCourseTypeData] = useState([])
  const [levelData, setLevelData] = useState([
    'beginner',
    'intermediate',
    'advanced',
    'all level',
  ])
  const [sessionType, setsessionType] = useState(['Live', 'Pre Recorded'])

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const res = await fetch('/api/category/all')
        const data = await res.json()
        setCategoryData(data.data)
        console.log('Category Data:', data.data)

        // Set sub category data
        if (categoryID) {
          setSubCategoryData(
            data.data.find(c => c._id === categoryID).subCategory
          )
        } else {
          setSubCategoryData(data.data[0].subCategory)
        }
      } catch (error) {
        console.error('Error fetching category data:', error)
      }
    }

    const fetchCourseTypeData = async () => {
      try {
        const formData = new FormData()
        formData.append('page', 1)
        formData.append('pagination', 25)
        const res = await fetch('/api/course-type/all', {
          method: 'POST',
          body: formData,
        })

        const data = await res.json()
        setCourseTypeData(data.data)
      } catch (error) {
        console.error('Error fetching course type data:', error)
      }
    }

    fetchCategoryData()
    fetchCourseTypeData()
  }, [])

  return {
    categoryData,
    subCategoryData,
    courseTypeData,
    levelData,
    sessionType,
    setSubCategoryData,
  }
}

export default useCourseData
