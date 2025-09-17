import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Skeleton } from './ui/skeleton'
import { Clock, Star } from 'lucide-react'

// Kiểu dữ liệu
interface Instructor {
  name: string
  image: string
  profession: string
}

interface Category {
  categoryName: string
}

interface Course {
  _id: string
  title: string
  thumbnail: string
  instructor: Instructor
  category?: Category
  duration: string
  price: number
  discount?: number
}

const EnhancedCourse: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const navigate = useNavigate()

  useEffect(() => {
    const getCourses = async () => {
      try {
        const formdata = new FormData()
        formdata.set('page', '1')
        formdata.set('pagination', '8')

        const res = await fetch('/api/course', {
          method: 'POST',
          body: formdata,
        })

        const data = await res.json()
        setCourses(data.data || [])
      } catch (error) {
        console.error('Error fetching course data:', error)
      }
    }
    getCourses()
  }, [])

  const handleProfileClick = (course: Course) => {
    navigate(`/course/${course._id}?name=${encodeURIComponent(course.title)}`)
  }

  const categories: string[] = [
    'All',
    ...Array.from(
      new Set(
        courses
          .map(c => c.category?.categoryName)
          .filter((name): name is string => Boolean(name)) // ép TS hiểu chỉ còn string
      )
    ),
  ]

  const filteredCourses =
    activeCategory === 'All'
      ? courses
      : courses.filter(c => c.category?.categoryName === activeCategory)

  const RatingStars: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center mt-2">
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

  return (
    <div className="container mx-auto px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center text-left lg:pt-20 pb-10">
        <div>
          <h1 className="font-bold text-xl lg:text-4xl text-primary">
            Newest Courses
          </h1>
          <h5 className="text-xs lg:text-lg mt-2 text-gray-600">
            #Recently published courses
          </h5>
        </div>
        <div>
          <Link to="/courselist">
            <button className="text-gray-600 hover:bg-cyan-400 lg:text-lg text-sm hover:text-white duration-100 border lg:px-10 lg:py-3 px-2 py-1 border-gray-300 rounded-md">
              View All
            </button>
          </Link>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {courses.length === 0
          ? Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="w-full">
                <CardHeader className="p-0">
                  <Skeleton className="h-80 w-full rounded-t-xl" />
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-8 w-24" />
                </CardFooter>
              </Card>
            ))
          : filteredCourses.map(course => (
              <Card
                key={course._id}
                className="w-full rounded-2xl overflow-hidden p-5 transition-all duration-300 hover:shadow-xl"
                onClick={() => handleProfileClick(course)}
              >
                <CardHeader className="p-0 relative w-full h-[200px]">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </CardHeader>
                <CardContent className="mt-3 pb-2 px-0">
                  <h3 className="text-lg font-bold text-primary truncate">
                    {course.title}
                  </h3>
                  <div className="flex gap-3 mt-4">
                    <img
                      src={course.instructor?.image}
                      alt={course.instructor?.name || 'Instructor'}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <h3>{course.instructor?.name}</h3>
                  </div>
                  <p className="mt-3 mb-3 text-gray-500 text-md">
                    {course.instructor?.profession}
                  </p>
                  <RatingStars rating={5.0} />
                  <div className="flex justify-between mt-8 text-gray-600">
                    <h5 className="flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      {course.duration}
                    </h5>
                  </div>

                  <button className="w-full text-2xl py-1 mt-3 bg-cyan-400 rounded-md text-white font-semibold hover:scale-105 duration-200">
                    {course.discount ? (
                      <h5>
                        <del className="font-normal text-xl mr-2 text-white">
                          ${course.discount}
                        </del>
                        ${course.price}
                      </h5>
                    ) : (
                      <h5>${course.price}</h5>
                    )}
                  </button>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  )
}

export default EnhancedCourse
