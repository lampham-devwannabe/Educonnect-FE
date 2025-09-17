import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import {
  Star,
  Clock,
  ArrowRight,
  ArrowLeft,
  Users,
  BookText,
} from 'lucide-react'
import InfoTitle from './infoTitle'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader } from './ui/card'

const FreeCourse = () => {
  const sliderRef = useRef<Slider | null>(null)

  const settings = {
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

  const [courses, setCourses] = useState<any[]>([])

  useEffect(() => {
    const getCourses = async () => {
      try {
        const formData = new FormData()
        formData.set('page', '1')
        formData.set('pagination', '4')

        const res = await fetch('http://localhost:5000/api/course', {
          method: 'POST',
          body: formData,
        })
        const courseData = await res.json()
        setCourses(courseData.data || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    getCourses()
  }, [])

  const RatingStars = ({ rating }: { rating: number }) => (
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

  return (
    <div className="w-full">
      <div className="container mx-auto px-8 py-8">
        <div className="lg:flex justify-between items-center pb-10">
          <div className="relative w-full lg:w-1/2 lg:pr-20">
            <h5 className="text-sm bg-purple-50 px-5 py-1 inline-block text-[--primary] uppercase rounded-full mb-2">
              Free Courses
            </h5>
            <div className="lg:block hidden absolute top-10 right-40">
              <img
                className="w-32 h-10"
                src="/assets/custom-image/textCircle.png"
                alt="text circle"
              />
            </div>
            <InfoTitle heading="Get Started with These Free Courses" />
          </div>
          <div className="flex items-center gap-3">
            <Link to="/courselist">
              <button className="text-white bg-[--primary] lg:px-5 lg:py-2 px-2 py-1 rounded-full">
                Explore courses
              </button>
            </Link>
            <div className="flex gap-2 items-center">
              <ArrowLeft
                className="cursor-pointer text-[--primary] w-8 h-8 p-1 border-2 border-[--primary] rounded-full"
                onClick={() => sliderRef.current?.slickPrev()}
              />
              <ArrowRight
                className="cursor-pointer text-[--primary] w-8 h-8 p-1 border-2 border-[--primary] rounded-full"
                onClick={() => sliderRef.current?.slickNext()}
              />
            </div>
          </div>
        </div>

        <Slider ref={sliderRef} {...settings}>
          {courses.map(course => (
            <Card
              key={course._id}
              className="w-full bg-blue-50/25 border-dashed border-[#c5b5ff] rounded-xl p-5 hover:shadow-xl"
            >
              <Link to={`/course/details/${course._id}`}>
                <CardHeader className="p-0 relative w-full h-[200px]">
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
                    <h5 className="text-[--primary] font-semibold">
                      {course.discount ? (
                        <>
                          <del className="mr-2">${course.discount}</del>$
                          {course.price}
                        </>
                      ) : (
                        <>${course.price}</>
                      )}
                    </h5>
                  </div>
                  <h3 className="text-lg font-bold truncate">{course.title}</h3>
                  <div className="flex justify-between items-center px-2 py-1 bg-white rounded-sm shadow-sm mt-2">
                    <div className="flex items-center gap-1">
                      <BookText className="w-4 h-4" />
                      <span className="text-xs text-gray-600">Lesson 10</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">10:30m</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span className="text-xs">20+ Students</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-5">
                    <div className="flex gap-3 items-center">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={course.instructor?.image || '/assets/default.png'}
                        alt={course.instructor?.name}
                      />
                      <h3>{course.instructor?.name}</h3>
                    </div>
                    <Button className="text-sm h-8 bg-[--primary] px-3 rounded-full text-white">
                      Enroll <ArrowRight className="w-4 h-4 ml-1" />
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

export default FreeCourse
