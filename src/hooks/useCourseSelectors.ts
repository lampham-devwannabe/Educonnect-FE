import React, { useState, useEffect } from 'react'

// Define interfaces for the data structures
interface SubCategory {
  _id: string
  name: string
  // Add other properties as needed
}

interface Category {
  _id: string
  name: string
  subCategory: SubCategory[]
  // Add other properties as needed
}

interface CourseType {
  _id: string
  name: string
  // Add other properties as needed
}

interface UseCourseDataProps {
  categoryID?: string
}

interface UseCourseDataReturn {
  categoryData: Category[]
  subCategoryData: SubCategory[]
  courseTypeData: CourseType[]
  levelData: string[]
  sessionType: string[]
  setSubCategoryData: React.Dispatch<React.SetStateAction<SubCategory[]>>
}

const useCourseData = ({
  categoryID,
}: UseCourseDataProps): UseCourseDataReturn => {
  const [categoryData, setCategoryData] = useState<Category[]>([])
  const [subCategoryData, setSubCategoryData] = useState<SubCategory[]>([])
  const [courseTypeData, setCourseTypeData] = useState<CourseType[]>([])
  const [levelData] = useState<string[]>([
    'beginner',
    'intermediate',
    'advanced',
    'all level',
  ])
  const [sessionType] = useState<string[]>(['Live', 'Pre Recorded'])

  useEffect(() => {
    const fetchCategoryData = async (): Promise<void> => {
      try {
        const res = await fetch('/api/category/all')
        const data = await res.json()
        setCategoryData(data.data)
        console.log('Category Data:', data.data)

        // Set sub category data
        if (categoryID) {
          const category = data.data.find((c: Category) => c._id === categoryID)
          if (category) {
            setSubCategoryData(category.subCategory)
          }
        } else if (data.data.length > 0) {
          setSubCategoryData(data.data[0].subCategory)
        }
      } catch (error) {
        console.error('Error fetching category data:', error)
      }
    }

    const fetchCourseTypeData = async (): Promise<void> => {
      try {
        const formData = new FormData()
        formData.append('page', '1')
        formData.append('pagination', '25')
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
  }, [categoryID])

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
