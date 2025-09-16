import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader } from './ui/card'
import { Star } from 'lucide-react'
import blogImg1 from '../assets/blog-image/blog1.png'
import blogImg2 from '../assets/blog-image/blog2.png'
import blogImg3 from '../assets/blog-image/blog3.png'

type RatingStarsProps = {
  rating: number
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => (
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

const Blog: React.FC = () => {
  return (
    <div className="container mx-auto px-8 py-8 ">
      <div className="lg:flex justify-between items-center text-left lg:pt-10 pt-0 pb-10">
        <div>
          <h1 className="font-bold text-xl lg:text-4xl text-primary">Blog</h1>
          <h5 className="text-xs lg:text-lg mt-2 text-gray-600">
            #Explore latest news and articles
          </h5>
        </div>
        <div>
          <button className="text-gray-600 hover:bg-cyan-400 lg:text-lg text-sm hover:text-white duration-100 border-[1px] lg:px-10 lg:py-3 px-2 py-1 border-gray-300 rounded-md">
            Blog Posts
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[blogImg1, blogImg2, blogImg3].map((img, i) => (
          <Card
            key={i}
            className="w-full rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            <Link to="">
              <CardHeader className="p-0 relative">
                <img
                  src={img}
                  alt={`Blog ${i + 1}`}
                  className="w-full object-cover rounded-tl-2xl rounded-tr-2xl"
                />
                <h4 className="text-md px-4 py-2 bg-yellow-400 text-black font-bold absolute -bottom-4 right-0 object-cover rounded-bl-2xl rounded-tl-2xl">
                  29 Oct 2024
                </h4>
              </CardHeader>
              <CardContent className="mt-5 pb-2 px-5">
                <h3 className="text-xl font-bold text-primary truncate">
                  New Learning Page
                </h3>
                <p className="mt-3 mb-3 leading-7 text-gray-500 text-md">
                  In this article, I’ll explain the two rules I followed to
                  become a straight-A student. If you take my advice, you’ll get
                  better grades and lead a more ...
                </p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Blog
