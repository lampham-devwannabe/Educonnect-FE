import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { Badge } from './ui/badge'
import Slider from 'react-slick'
import { Link } from 'react-router-dom' // thay cho next/link
import starImg from '@assets/custom-image/starImg.png'
import type { Instructor } from '@/models/user'

const Instructor: React.FC = () => {
  const [userData, setUserData] = useState<Instructor[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchUsers = useCallback(async () => {
    try {
      const formdata = new FormData()
      formdata.set('page', currentPage.toString())
      formdata.set('pagination', '12')
      formdata.set('role', 'instructor')

      const res = await fetch('/api/user', {
        method: 'POST',
        body: formdata,
      })

      const data = await res.json()
      setUserData(data.data)
      setTotalPages(Math.ceil(data.total / 5))
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }, [currentPage])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  // Slider settings
  const sliderRef = useRef<Slider>(null)
  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    rows: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, slidesToScroll: 2, initialSlide: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  }

  return (
    <div className="bg-gradient-to-br from-indigo-300 to-orange-200 w-full">
      <div className="container grid grid-cols-1 lg:grid-cols-2 items-center mt-0 lg:mt-16 mb-10 lg:mb-16">
        {/* Left Text Section */}
        <div className="relative lg:pr-24 lg:mt-0 mt-10">
          <h5 className="text-xs lg:text-sm bg-purple-100 px-5 py-1 inline-block text-[--primary] uppercase rounded-full mb-2">
            OUR INSTRUCTOR
          </h5>
          <h4 className="text-gray-700 lg:pr-40 text-2xl lg:text-4xl font-bold">
            Meet Our Expert Instructor
          </h4>
          <p className="text-gray-700 lg:pr-40 lg:text-lg text-sm mt-3 lg:leading-7 md:leading-7">
            This includes offering personalized feedback, fostering a sense of
            community through discussion forums and group projects, and
            providing continuous support to address challenges and improve.
          </p>

          <div className="flex flex-col w-fit lg:flex-row gap-5 lg:mt-10 mt-5">
            <Link to="/mentorlist">
              <Button className="h-8 lg:h-full bg-[--primary] rounded-full text-white hover:bg-[--primary]">
                <span className="lg:py-2 pl-5"> All Instructors </span>
                <ArrowRight className="w-7 h-7 p-1.5 bg-[#644BFF] rounded-full ml-3" />
              </Button>
            </Link>
            <Link to="/courselist">
              <Button className="h-8 lg:h-full bg-[--secondary] rounded-full text-white hover:bg-[--secondary]">
                <span className="py-2 pl-5">Find Courses </span>
                <ArrowRight className="w-7 h-7 p-1.5 bg-[--secondary-foreground] rounded-full ml-3" />
              </Button>
            </Link>
          </div>

          <div className="absolute bottom-52 right-10">
            <img className="w-10 h-10" alt="star" src={starImg} />
          </div>
        </div>

        {/* Right Slider Section */}
        <div className="grid gap-4 grid-cols-1">
          <div className="slider-container">
            <Slider ref={sliderRef} {...settings}>
              {userData.map((mentor, index) => (
                <Link
                  key={index}
                  to={`/mentor?id=${mentor.id}`}
                  className="block group"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={mentor.image || '/placeholder.svg'}
                        alt={`${mentor.name} - ${mentor.profession}`}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                      <div className="space-y-1">
                        <h3 className="font-bold leading-tight">
                          {mentor.name}
                        </h3>
                        <p className="text-sm text-gray-200">
                          {mentor.profession}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {mentor.expertise?.[0] && (
                            <Badge className="bg-white/20 text-white font-thin hover:bg-white/30 px-3 py-1 text-xs rounded-full">
                              {mentor.expertise[0]}
                            </Badge>
                          )}
                          {mentor.expertise && mentor.expertise.length > 1 && (
                            <Badge className="bg-white/20 text-white font-thin hover:bg-white/30 px-3 py-1 text-xs rounded-full">
                              +{mentor.expertise.length - 1}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Instructor
