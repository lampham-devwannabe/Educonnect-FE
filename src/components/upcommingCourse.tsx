import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Star, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

// Define TypeScript interfaces
interface Instructor {
  _id: string
  name: string
  image?: string
  profession?: string
}

interface Course {
  _id: string
  title: string
  price: number
  discount?: number
  thumbnail: string
  duration: string
  instructor: Instructor
}

interface RatingStarsProps {
  rating: number
}

const UpcomingCourse: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    const getCourses = async () => {
      try {
        const formdata = new FormData()
        formdata.set('page', '1') // FormData values must be strings
        formdata.set('pagination', '4')

        const res = await fetch('api/course', {
          method: 'POST',
          body: formdata,
        })

        const courseData = await res.json()
        const data = courseData?.data || []
        console.log(courseData.data)
        setCourses(data)
      } catch (error) {
        console.error('Error fetching course data:', error)
      }
    }

    getCourses()
  }, [])

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

  return (
    <div className="container mx-auto px-8 py-8 ">
      <div className="lg:flex justify-between items-center text-left lg:pt-10 pt-0 pb-10">
        <div>
          <h1 className="font-bold text-xl lg:text-4xl text-primary">
            Upcoming Courses
          </h1>
          <h5 className="text-xs lg:text-lg mt-2 text-gray-600">
            Courses that will be published soon
          </h5>
        </div>
        <div>
          <button className="text-gray-600 hover:bg-cyan-400 lg:text-lg text-sm hover:text-white duration-100 border-[1px] lg:px-10 lg:py-3 px-2 py-1 border-gray-300 rounded-md">
            View All
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {courses.map(course => (
          <Card
            className="w-full rounded-2xl overflow-hidden pt-5 bg-cyan-400 transition-all duration-300 hover:shadow-xl"
            key={course._id}
          >
            <Link to={`/course/details/${course._id}`}>
              <CardHeader className="p-0 relative w-[100%] h-[200px]">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </CardHeader>
              <CardContent className="p-4 bg-white">
                <h3 className="text-lg font-bold text-primary truncate">
                  {course.title}
                </h3>
                <div className="flex gap-3 mt-4">
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={
                      course.instructor.image ||
                      '/assets/custom-image/default-author.jpg'
                    }
                    alt={`${course.instructor.name} avatar`}
                  />
                  <h3>{course.instructor.name}</h3>
                </div>
                <p className="mt-3 mb-3 text-gray-500 text-md">
                  {course.instructor.profession}
                </p>
                <RatingStars rating={5.3} />
                <div className="flex flex-row justify-between mt-8 text-gray-600 ">
                  <h5 className="flex items-center">
                    <span className="mr-2">
                      <Clock className="w-5 h-5" />
                    </span>{' '}
                    {course.duration}
                  </h5>
                </div>
              </CardContent>
              <button className="w-full text-2xl py-1 bg-cyan-400 rounded-md text-white font-semibold hover:scale-105 duration-200">
                {course.discount ? (
                  <h5>
                    <del className="font-normal text-xl mr-2 text-white ">
                      ${course.discount}
                    </del>
                    ${course.price}
                  </h5>
                ) : (
                  <h5>${course.price}</h5>
                )}
              </button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default UpcomingCourse
