'use client'
import { Card, CardContent, CardHeader } from './ui/card'
import { ShoppingCartIcon, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import quatImg1 from '../../public/assets/custom-image/quat.png'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

const Testimonial = () => {
  var settings = {
    autoplay: false,
    autoplaySpeed: 2000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
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
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  const RatingStars = ({ rating }) => {
    return (
      <div className="flex items-center justify-center mt-2">
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
    <div className="w-full py-2 lg:py-16  testimonial-bg">
      <div className="container mx-auto px-8 py-8 ">
        <div className=" lg:pt-10 pt-0 pb-12">
          <div className=" text-center lg:mx-80">
            <h5 className="text-xs lg:text-sm bg-purple-100 px-5 py-1 inline-block text-[--primary] uppercase rounded-full mb-2">
              Testimonial
            </h5>
            <h4 className="text-gray-700  text-2xl lg:text-4xl font-bold">
              Creating A Community Of Life Long Learners.
            </h4>
          </div>
        </div>
        <div className="slider-container">
          <Slider {...settings}>
            <div className="mt-5">
              <div className="relative group">
                <CardHeader className=" items-center absolute -top-12 -left-10  z-50">
                  <div className="p-3 ">
                    <Image
                      src={quatImg1}
                      alt=""
                      className="w-8 h-8 "
                      width={100}
                      height={100}
                    />
                  </div>
                </CardHeader>
                <Card className="w-full relative rounded-2xl overflow-hidden  transition-all duration-300 hover:shadow-xl">
                  <Link href="">
                    <CardContent className=" pb-4 px-5">
                      <div className=" mt-6 pb-3 text-gray-600 ">
                        <p className="">
                          {
                            '“Lorem ipsum dolor sit amet, elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci nulla pellentesque dignissim enim. Amet consectetur adipiscing”'
                          }
                        </p>
                      </div>
                      <h3 className="text-lg font-bold text-primary truncate">
                        Ashikur Efty
                      </h3>
                      <div className="mt-2">
                        <h3 className="text-[--primary]">
                          Frontend Software Engineer
                        </h3>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </div>
            </div>
            <div className="mt-5">
              <div className="relative group">
                <CardHeader className=" items-center absolute -top-12 -left-10  z-50">
                  <div className="p-3 ">
                    <Image
                      src={quatImg1}
                      alt=""
                      className="w-8 h-8 "
                      width={100}
                      height={100}
                    />
                  </div>
                </CardHeader>
                <Card className="w-full relative rounded-2xl overflow-hidden  transition-all duration-300 hover:shadow-xl">
                  <Link href="">
                    <CardContent className=" pb-4 px-5">
                      <div className=" mt-6 pb-3 text-gray-600 ">
                        <p className="">
                          {
                            '“dignissim enim. Amet consectetur sed eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci nulla pellentesque dignissim enim. Amet consectetur bdipssci”'
                          }
                        </p>
                      </div>
                      <h3 className="text-lg font-bold text-primary truncate">
                        RZ tutul
                      </h3>
                      <div className="mt-2">
                        <h3 className="text-[--primary]">
                          Senior Software Engineer
                        </h3>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </div>
            </div>
            <div className="mt-5">
              <div className="relative group">
                <CardHeader className=" items-center absolute -top-12 -left-10  z-50">
                  <div className="p-3 ">
                    <Image
                      src={quatImg1}
                      alt=""
                      className="w-8 h-8 "
                      width={100}
                      height={100}
                    />
                  </div>
                </CardHeader>
                <Card className="w-full relative rounded-2xl overflow-hidden  transition-all duration-300 hover:shadow-xl">
                  <Link href="">
                    <CardContent className=" pb-4 px-5">
                      <div className=" mt-6 pb-3 text-gray-600 ">
                        <p className="">
                          {
                            '“incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, elit, sed eiusmod tempor, Orci nulla pellentesque dignissim enim. Amet consectetur adipiscing”'
                          }
                        </p>
                      </div>
                      <h3 className="text-lg font-bold text-primary truncate">
                        John Doe
                      </h3>
                      <div className="mt-2">
                        <h3 className="text-[--primary]">
                          Architecture Engineer
                        </h3>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </div>
            </div>
            <div className="mt-5">
              <div className="relative group">
                <CardHeader className=" items-center absolute -top-12 -left-10  z-50">
                  <div className="p-3 ">
                    <Image
                      src={quatImg1}
                      alt=""
                      className="w-8 h-8 "
                      width={100}
                      height={100}
                    />
                  </div>
                </CardHeader>
                <Card className="w-full relative rounded-2xl overflow-hidden  transition-all duration-300 hover:shadow-xl">
                  <Link href="">
                    <CardContent className=" pb-4 px-5">
                      <div className=" mt-6 pb-3 text-gray-600 ">
                        <p className="">
                          {
                            '“ Orci nulla pellentesque dignissim enim Lorem ipsum dolor sit amet, elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua.Amet consectetur adipiscing”'
                          }
                        </p>
                      </div>
                      <h3 className="text-lg font-bold text-primary truncate">
                        Chase Gilmore
                      </h3>
                      <div className="mt-2">
                        <h3 className="text-[--primary]">SQA Engineer</h3>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default Testimonial
