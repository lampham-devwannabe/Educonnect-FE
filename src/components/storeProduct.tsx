import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { ShoppingCartIcon, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

import storeImg1 from '../assets/storeImage/store1.png'
import storeImg2 from '../assets/storeImage/store2.png'
import storeImg3 from '../assets/storeImage/store3.png'
import storeImg4 from '../assets/storeImage/store4.png'
import efty1 from '../assets/custom-image/Eftyoffice.jpg'

interface RatingStarsProps {
  rating: number
}

const StoreProduct: React.FC = () => {
  const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
    return (
      <div className="flex items-center justify-left mt-2">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`w-5 h-5 mr-1 ${
              star <= Math.round(rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm px-2 bg-cyan-400 rounded-md text-white">
          {rating.toFixed(1)}
        </span>
      </div>
    )
  }

  // Store product item interface
  interface StoreItem {
    id: number
    image: string
    title: string
    author: string
    authorImage: string
    category: string
    rating: number
    price: number
  }

  // Create store items array
  const storeItems: StoreItem[] = [
    {
      id: 1,
      image: storeImg1,
      title: 'New Learning Page',
      author: 'Ashikur Efty',
      authorImage: efty1,
      category: 'LifeStyle',
      rating: 5.3,
      price: 29,
    },
    {
      id: 2,
      image: storeImg2,
      title: 'New Learning Page',
      author: 'Ashikur Efty',
      authorImage: efty1,
      category: 'LifeStyle',
      rating: 5.3,
      price: 29,
    },
    {
      id: 3,
      image: storeImg3,
      title: 'New Learning Page',
      author: 'Ashikur Efty',
      authorImage: efty1,
      category: 'LifeStyle',
      rating: 5.3,
      price: 29,
    },
    {
      id: 4,
      image: storeImg4,
      title: 'New Learning Page',
      author: 'Ashikur Efty',
      authorImage: efty1,
      category: 'LifeStyle',
      rating: 5.3,
      price: 29,
    },
  ]

  return (
    <div className="container mx-auto px-8 py-8 ">
      <div className="lg:flex justify-between items-center text-left lg:pt-10 pt-0 pb-10">
        <div>
          <h1 className="font-bold text-xl lg:text-4xl text-primary">
            Store Products
          </h1>
          <h5 className="text-xs lg:text-lg mt-2 text-gray-600">
            Explore physical & virtual products
          </h5>
        </div>
        <div>
          <button className="text-gray-600 hover:bg-cyan-400 lg:text-lg text-sm hover:text-white duration-100 border-[1px] lg:px-10 lg:py-3 px-2 py-1 border-gray-300 rounded-md">
            All Products
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {storeItems.map(item => (
          <Card
            key={item.id}
            className="w-full rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            <Link to="">
              <CardHeader className="p-0 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full object-cover rounded-tl-2xl rounded-tr-2xl"
                />
              </CardHeader>
              <CardContent className="mt-3 pb-4 px-5">
                <h3 className="text-lg font-bold text-primary truncate">
                  {item.title}
                </h3>
                <div className="flex gap-3 mt-4">
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={
                      item.authorImage ||
                      '/assets/custom-image/default-author.jpg'
                    }
                    alt="Author Image"
                  />
                  <h3>{item.author}</h3>
                </div>
                <p className="mt-3 mb-3 text-gray-500 text-md">
                  In {item.category}
                </p>
                <RatingStars rating={item.rating} />
                <div className="flex flex-row justify-between mt-3 text-gray-600">
                  <h5 className="flex items-center text-3xl text-cyan-400 font-bold">
                    ${item.price}
                  </h5>
                  <h5 className="flex items-center">
                    <span className="mr-2">
                      <ShoppingCartIcon className="w-6 h-6 p-1 bg-cyan-400 text-white rounded-full font-bold" />
                    </span>
                  </h5>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default StoreProduct
