import React from 'react'
import { CalendarDays, Clock, Star } from 'lucide-react'

import featureImg1 from '../@assets/feature-image/feature1.png'
import efty1 from '../@assets/custom-image/Eftyoffice.jpg'

interface RatingStarsProps {
  rating: number
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
  return (
    <div className="flex items-center justify-left mt-2">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          className={`w-6 h-6 mr-1 ${
            star <= Math.round(rating)
              ? 'text-yellow-400 fill-current'
              : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-1 text-md px-2 bg-cyan-400 rounded-md text-white">
        {rating.toFixed(1)}
      </span>
    </div>
  )
}

const features: React.FC = () => {
  return (
    <div className="container mx-auto px-8 py-8 ">
      <div className="lg:mt-16 mt-0">
        <div className="text-left">
          <h2 className="font-bold text-3xl lg:text-4xl">Featured Courses</h2>
          <p className="max-w-md mt-2 text-gray-500">
            A responsive documentation template.
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-10 mt-10">
          <div className="relative ">
            <img
              className="w-full rounded-lg"
              src={featureImg1}
              alt="Feature"
            />
            <div className="lg:absolute bg-white py-8 px-5 w-full lg:w-80 rounded-br-2xl rounded-bl-2xl lg:rounded-2xl right-12 -top-10 shadow-md">
              <h3 className="font-semibold text-2xl">Wide Range of Courses</h3>
              <div className="flex gap-3 mt-5 lg:mt-10">
                <img
                  className="w-8 h-8 rounded-full"
                  src={efty1}
                  alt="Author"
                />
                <h3 className="text-gray-800 font-medium">Ashikur Efty</h3>
              </div>
              <p className="mt-3 mb-5 text-gray-500 leading-7">
                Learn step-by-step tips that help you get things done with your
                virtual team by increasing trust and accountability.
              </p>
              <RatingStars rating={5.0} />
              <div className="flex flex-row justify-between mt-10 lg:mt-20 text-gray-600 ">
                <h5 className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Watch
                </h5>
                <h5 className="flex items-center">
                  <CalendarDays className="w-5 h-5 mr-2" />
                  10-11-2024
                </h5>
              </div>
              <button className="w-full text-2xl py-1 mt-7 bg-cyan-400 rounded-md text-white font-semibold hover:scale-105 duration-200">
                $45
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default features
