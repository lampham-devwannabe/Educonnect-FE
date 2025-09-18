import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { Category } from '@/models/category'

const Trending: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const getCategory = async () => {
      try {
        const formdata = new FormData()
        formdata.set('page', '1') // FormData values must be strings
        formdata.set('pagination', '5')

        const res = await fetch('api/category', {
          method: 'POST',
          body: formdata,
        })

        const data = await res.json()
        console.log(data.data)
        setCategories(data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    getCategory()
  }, [])

  return (
    <div className="w-full">
      <div className="lg:mt-16 mt-0 container mx-auto px-8 py-8">
        <div className="lg:flex justify-between items-center text-left lg:pt-10 pt-0 pb-10">
          <div>
            <h1 className="font-bold text-4xl text-primary">Categories</h1>
            <h5 className="text-lg mt-2 text-gray-600">
              #Browse trending & popular learning topics
            </h5>
          </div>
        </div>
        <div className="rounded-lg sm:py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map(category => (
            <div key={category.id}>
              <motion.div
                className="flex flex-col cursor-pointer bg-white items-center text-center p-6 rounded-2xl transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.3)',
                }}
              >
                <div className="hexagon-wrapper rounded-2xl">
                  <div className="hexagon items-center">
                    <img
                      src={category.image}
                      alt={category.categoryName}
                      className="z-50 rounded-md w-[300px] h-[300px] object-cover"
                    />
                  </div>
                </div>
                <h4 className="font-bold text-4xl mb-2"></h4>
                <h3 className="font-semibold text-base sm:text-lg mb-2">
                  {category.categoryName}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {category.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Trending
