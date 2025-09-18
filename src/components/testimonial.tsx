import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Link } from 'react-router-dom'
import quatImg1 from '@assets/custom-image/quat.png'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

interface Testimonial {
  id: number
  quote: string
  name: string
  position: string
}

const Testimonial: React.FC = () => {
  const settings = {
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

  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote:
        '"Lorem ipsum dolor sit amet, elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci nulla pellentesque dignissim enim. Amet consectetur adipiscing"',
      name: 'Ashikur Efty',
      position: 'Frontend Software Engineer',
    },
    {
      id: 2,
      quote:
        '"dignissim enim. Amet consectetur sed eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci nulla pellentesque dignissim enim. Amet consectetur bdipssci"',
      name: 'RZ tutul',
      position: 'Senior Software Engineer',
    },
    {
      id: 3,
      quote:
        '"incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, elit, sed eiusmod tempor, Orci nulla pellentesque dignissim enim. Amet consectetur adipiscing"',
      name: 'John Doe',
      position: 'Architecture Engineer',
    },
    {
      id: 4,
      quote:
        '" Orci nulla pellentesque dignissim enim Lorem ipsum dolor sit amet, elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua.Amet consectetur adipiscing"',
      name: 'Chase Gilmore',
      position: 'SQA Engineer',
    },
  ]

  return (
    <div className="w-full py-2 lg:py-16 testimonial-bg">
      <div className="container mx-auto px-8 py-8">
        <div className="lg:pt-10 pt-0 pb-12">
          <div className="text-center lg:mx-80">
            <h5 className="text-xs lg:text-sm bg-purple-100 px-5 py-1 inline-block text-[--primary] uppercase rounded-full mb-2">
              Testimonial
            </h5>
            <h4 className="text-gray-700 text-2xl lg:text-4xl font-bold">
              Creating A Community Of Life Long Learners.
            </h4>
          </div>
        </div>
        <div className="slider-container">
          <Slider {...settings}>
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="mt-5">
                <div className="relative group">
                  <CardHeader className="items-center absolute -top-12 -left-10 z-50">
                    <div className="p-3">
                      <img src={quatImg1} alt="Quote" className="w-8 h-8" />
                    </div>
                  </CardHeader>
                  <Card className="w-full relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl">
                    <Link to="">
                      <CardContent className="pb-4 px-5">
                        <div className="mt-6 pb-3 text-gray-600">
                          <p>{testimonial.quote}</p>
                        </div>
                        <h3 className="text-lg font-bold text-primary truncate">
                          {testimonial.name}
                        </h3>
                        <div className="mt-2">
                          <h3 className="text-[--primary]">
                            {testimonial.position}
                          </h3>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default Testimonial
