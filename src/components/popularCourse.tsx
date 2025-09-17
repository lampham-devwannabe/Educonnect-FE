import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, ArrowRight, Users, LucideGavel, BookText } from 'lucide-react'
import InfoTitle from './infoTitle'
import { Button } from './ui/button'
import textCircleImg from '../assets/images/textCircle.png'

// Define TypeScript interfaces
interface Instructor {
  _id: string
  name: string
  image: string
}

interface Course {
  _id: string
  title: string
  price: number
  discount?: number
  thumbnail?: string
  courseBadge: string
  level: string
  totalSeat: number
  instructor?: Instructor
}

interface PopularCourseProps {
  user?: {
    id?: string
    name?: string
    email?: string
  }
}

// Simple Card components
const Card: React.FC<{
  className?: string
  children: React.ReactNode
}> = ({ className, children }) => {
  return <div className={className}>{children}</div>
}

const CardHeader: React.FC<{
  className?: string
  children: React.ReactNode
}> = ({ className, children }) => {
  return <div className={className}>{children}</div>
}

const CardContent: React.FC<{
  className?: string
  children: React.ReactNode
}> = ({ className, children }) => {
  return <div className={className}>{children}</div>
}

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center justify-left mt-2">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          className={`w-4 h-4 mr-1 ${
            star <= Math.round(rating)
              ? 'text-[#FC6441] fill-current'
              : 'text-gray-300'
          }`}
        />
      ))}
      <span className="text-sm px-2 text-gray-700">{rating.toFixed(1)}k</span>
    </div>
  )
}

const PopularCourse: React.FC<PopularCourseProps> = () => {
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    const getCourses = async () => {
      try {
        const formData = new FormData()
        formData.set('page', '1')
        formData.set('pagination', '8')
        formData.set('sortValue', 'popular')

        const res = await fetch('/api/course/list', {
          method: 'POST',
          body: formData,
        })

        const courseData = await res.json()
        setCourses(courseData.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    getCourses()
  }, [])

  return (
    <div className="popular-bg-img bg-purple-50 w-full pb-5 lg:pb-20">
      <div className="container mx-auto px-8 py-8 ">
        <div className="lg:flex justify-between items-center text-left lg:pt-10 pt-0 pb-10">
          <div className="relative lg:w-1/2 lg:pr-20">
            <h5 className="text-xs lg:text-sm bg-white px-5 py-1 inline-block text-[--primary] uppercase rounded-full mb-2">
              Top Popular Course
            </h5>
            <div className="absolute top-6 right-48">
              <img
                className="lg:block hidden w-36 h-16"
                alt=""
                src={textCircleImg}
              />
            </div>
            <InfoTitle
              heading={'Our popular Course student can join with us.'}
            />
          </div>
          <div className="lg:flex flex-col lg:flex-row gap-5 lg:mt-10 mt-5">
            <Link to="/courselist">
              <button className="text-white bg-[--primary] lg:text-lg text-sm hover:text-white duration-100 lg:px-5 lg:py-2 px-2 py-1 rounded-full">
                Explore courses
              </button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {courses.map(course => (
            <Card
              className="w-full bg-blue-50/25 border-dashed border-[#c5b5ff] rounded-xl overflow-hidden p-5 transition-all duration-300 hover:shadow-xl"
              key={course._id}
            >
              <Link to={`/course/details/${course._id}`}>
                <CardHeader className="p-0 relative w-[100%] h-[200px]">
                  <img
                    src={course?.thumbnail || '/placeholder.png'}
                    alt={course?.title || 'Course Thumbnail'}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <h5 className="py-2 px-3 text-gray-300 text-xs bg-[#17254E] absolute bottom-3 left-3 rounded-md">
                    Digital Marketing
                  </h5>
                </CardHeader>
                <CardContent className="mt-3 pb-2 px-0">
                  <div className="flex justify-between items-center">
                    <RatingStars rating={5.3} />
                    <h5 className="w-fit text-md py-1 mt-3 text-[--primary] font-semibold">
                      {course.discount ? (
                        <span>
                          <del className="font-normal text-md mr-2">
                            ${course.discount}
                          </del>
                          ${course.price}
                        </span>
                      ) : (
                        <span className="text-md">${course.price}</span>
                      )}
                    </h5>
                  </div>
                  <h3 className="text-lg font-bold text-primary truncate">
                    {course.title}
                  </h3>
                  <div className="flex lg:flex-row flex-col justify-between lg:items-center gap-1 px-2 py-1 bg-white rounded-sm shadow-sm max-w-md mt-2">
                    <div className="flex items-center gap-1">
                      <BookText className="w-4 h-4" />
                      <span className="font-normal text-xs capitalize text-gray-600">
                        {course.courseBadge}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-gray-600">
                      <LucideGavel className="w-4 h-4" />
                      <span className="text-xs capitalize">{course.level}</span>
                    </div>

                    <div className="flex items-center gap-1 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span className="text-xs">Seat {course.totalSeat}</span>
                    </div>
                  </div>
                  <div className="lg:flex justify-between items-center mt-5">
                    <div className="flex gap-3">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={course.instructor?.image}
                        alt="Author Image"
                      />
                      <h3>{course.instructor?.name}</h3>
                    </div>
                    <Button className="mt-2 text-sm font-normal h-8 bg-[--primary] px-3 py-0 rounded-full hover:bg-[--primary] hover:text-white text-white">
                      Enroll <ArrowRight className="text-xs w-5 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PopularCourse
