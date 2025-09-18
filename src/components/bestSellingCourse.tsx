import { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import {
  Star,
  LucideGavel,
  ArrowRight,
  ArrowLeft,
  Users,
  BookText,
} from 'lucide-react'
import { Button } from './ui/button'
import InfoTitle from './infoTitle'
import Slider from 'react-slick'
import type { Settings } from 'react-slick'
import { Link } from 'react-router-dom'
import type { Course } from '@/models/course'

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center mt-2">
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

const BestSellingCourse: React.FC = () => {
  const sliderRef = useRef<Slider>(null)
  const [courses, setCourses] = useState<Course[]>([])

  const settings: Settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  }

  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await fetch('/api/course/list', {
          method: 'POST',
          body: JSON.stringify({ page: 1, pagination: 4, sortValue: 'newest' }),
          headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json()
        setCourses(data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    getCourses()
  }, [])

  return (
    <div className="bg-purple-50 w-full pb-20">
      <div className="container mx-auto px-8 py-8">
        <div className="flex justify-between items-center pb-10">
          <div className="relative lg:w-1/2 lg:pr-20">
            <h5 className="text-sm bg-white px-5 py-1 inline-block text-[--primary] uppercase rounded-full mb-2">
              Bestselling Courses
            </h5>
            <InfoTitle
              heading="Creating A Community Of Life Long Learners."
              description=""
            />
          </div>
          <div className="flex items-center gap-3">
            <Link to="/courselist">
              <Button className="bg-[--primary] text-white rounded-full">
                Explore courses
              </Button>
            </Link>
            <ArrowLeft
              className="cursor-pointer text-[--primary] w-8 h-8 border-2 border-[--primary] rounded-full"
              onClick={() => sliderRef.current?.slickPrev()}
            />
            <ArrowRight
              className="cursor-pointer text-[--primary] w-8 h-8 border-2 border-[--primary] rounded-full"
              onClick={() => sliderRef.current?.slickNext()}
            />
          </div>
        </div>

        <Slider ref={sliderRef} {...settings}>
          {courses.map(course => (
            <Card
              key={course._id}
              className="w-full bg-blue-50/25 border-dashed border-[#c5b5ff] rounded-xl p-5 hover:shadow-xl"
            >
              <Link to={`/course/details/${course._id}`}>
                <CardHeader className="relative w-full h-[200px] p-0">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <h5 className="py-2 px-3 text-gray-300 text-xs bg-[#17254E] absolute bottom-3 left-3 rounded-md">
                    Digital Marketing
                  </h5>
                </CardHeader>
                <CardContent className="mt-3">
                  <div className="flex justify-between items-center">
                    <RatingStars rating={5.3} />
                    <h5 className="text-md mt-3 text-[--primary] font-semibold">
                      {course.discount ? (
                        <span>
                          <del className="font-normal mr-2">
                            ${course.discount}
                          </del>
                          ${course.price}
                        </span>
                      ) : (
                        <span>${course.price}</span>
                      )}
                    </h5>
                  </div>
                  <h3 className="text-lg font-bold truncate">{course.title}</h3>
                  <div className="flex flex-wrap justify-between items-center gap-2 px-2 py-1 bg-white rounded-sm shadow-sm mt-2">
                    <div className="flex items-center gap-1 text-gray-600">
                      <BookText className="w-4 h-4" />
                      <span className="text-xs">{course.courseBadge}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <LucideGavel className="w-4 h-4" />
                      <span className="text-xs">{course.level}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span className="text-xs">Seat {course.totalSeat}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-5">
                    <div className="flex gap-3">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={course.instructor?.image}
                        alt={course.instructor?.name}
                      />
                      <h3>{course.instructor?.name}</h3>
                    </div>
                    <Button className="text-sm h-8 bg-[--primary] px-3 rounded-full text-white">
                      Enroll <ArrowRight className="w-5 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default BestSellingCourse
