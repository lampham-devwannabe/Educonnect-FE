'use client'

import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { BookOpen } from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import InfoTitle from './infoTitle'
import { Button } from './ui/button'

const NewCategory = () => {
  const [categoryData, setCategoryData] = useState([])

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await fetch('/api/category?page=1&limit=9', {
          method: 'GET',
        })

        const data = await res.json()
        // console.log("Category data:", data);
        setCategoryData(data.data)
      } catch (error) {
        console.error('Error fetching category data:', error)
      }
    }

    getCategory()
  }, [])

  const bgGradients = [
    'bg-gradient-to-br from-yellow-50 to-amber-100',
    'bg-gradient-to-br from-amber-50 to-yellow-100',
    'bg-gradient-to-br from-cyan-50 to-blue-100',
    'bg-gradient-to-br from-blue-50 to-sky-100',
    'bg-gradient-to-br from-pink-50 to-rose-100',
    'bg-gradient-to-br from-emerald-50 to-green-100',
    'bg-gradient-to-br from-purple-50 to-fuchsia-100',
    'bg-gradient-to-br from-red-50 to-orange-100',
    'bg-gradient-to-br from-lime-50 to-green-100',
    'bg-gradient-to-br from-indigo-50 to-violet-100',
  ]

  return (
    <section className="w-full py-12 lg:py-20 pb-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto text-center w-full lg:w-1/2 mb-12 ">
          <h5 className="text-xs whitespace-nowrap lg:text-sm bg-purple-50 px-5 py-1 inline-block text-[--primary] uppercase rounded-full mb-2">
            Categories
          </h5>
          <InfoTitle heading={'Browse By Categories'}></InfoTitle>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categoryData.length === 0
            ? Array(9)
                .fill(0)
                .map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-[125px] w-full rounded-xl"
                  />
                ))
            : categoryData.map((category, index) => {
                return (
                  <Link
                    key={category._id}
                    href={`/courselist?category=${category._id}`}
                    className={`${
                      bgGradients[index % bgGradients.length]
                    } rounded-xl overflow-hidden transition-all hover:shadow-lg group`}
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-100 mr-4 shadow-sm">
                          <span className="text-2xl">
                            <Image
                              src={category.image || '/assets/placeholder.jpg'}
                              alt={category.name || 'Category image'}
                              width={40}
                              height={40}
                              className="w-10 h-10 rounded-lg"
                            />
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold group-hover:text-purple-700 transition-colors">
                            {category.categoryName}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center text-gray-600">
                          <BookOpen className="w-4 h-4 mr-1.5" />
                          <span className="text-sm">
                            ${category.courseCount} courses
                          </span>
                        </div>
                        <div className="bg-white/70 py-1 px-3 rounded-full text-sm font-medium text-purple-700 shadow-sm">
                          Explore
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
        </div>
        <div className="mt-10 text-center">
          <Link href="/categorylist">
            <Button variant="outline">All Categories</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NewCategory
