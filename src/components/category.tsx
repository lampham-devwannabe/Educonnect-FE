import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Skeleton } from './ui/skeleton'
import { ChevronRight } from 'lucide-react'
import { Button } from './ui/button'
import { createHttp } from '../services/httpFactory'
import type { Category } from '@/models/category'

const Category = () => {
  const [categoryData, setCategoryData] = useState<Category[]>([])

  useEffect(() => {
    const getCategory = async () => {
      try {
        const http = createHttp(import.meta.env.VITE_API_BASE_URL)
        const res = await http.get<{ data: Category[] }>('/category')
        setCategoryData(res.data.data)
      } catch (error) {
        console.error('Error fetching category data:', error)
      }
    }

    getCategory()
  }, [])

  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-baseline mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
            <span className="inline-block border-b-2 border-indigo-600 pb-1">
              TOP CATEGORIES
            </span>
          </h2>
          <Link
            to="/categorylist"
            className="group inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            See All
            <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {categoryData.length === 0
            ? Array(5)
                .fill(0)
                .map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-[125px] w-full rounded-xl"
                  />
                ))
            : categoryData.map(category => (
                <Link
                  to={`/courselist?category=${category.categoryName}`}
                  key={category.id}
                  className="block w-full"
                >
                  <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer h-full">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-indigo-600"
                        >
                          <path
                            d="M0.85 1.75C0.85 1.25 1.25 0.85 1.75 0.85H3.25C3.75 0.85 4.15 1.25 4.15 1.75V2.05H10.85V1.75C10.85 1.25 11.25 0.85 11.75 0.85H13.25C13.75 0.85 14.15 1.25 14.15 1.75V3.25C14.15 3.75 13.75 4.15 13.25 4.15H12.95V10.85H13.25C13.75 10.85 14.15 11.25 14.15 11.75V13.25C14.15 13.75 13.75 14.15 13.25 14.15H11.75C11.25 14.15 10.85 13.75 10.85 13.25V12.95H4.15V13.25C4.15 13.75 3.75 14.15 3.25 14.15H1.75C1.25 14.15 0.85 13.75 0.85 13.25V11.75C0.85 11.25 1.25 10.85 1.75 10.85H2.05V4.15H1.75C1.25 4.15 0.85 3.75 0.85 3.25V1.75Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {category.categoryName}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {category.courseCount || 0} courses
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/courselist">
            <Button variant="outline">See More</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Category
