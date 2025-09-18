import React from 'react'
import InfoTitle from './infoTitle'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'

import skillImg1 from '@assets/custom-image/skillImg.png'
import starImg from '@assets/custom-image/starImg.png'
import textCircle from '@assets/custom-image/textCircle.png'

const GrowSkills: React.FC = () => {
  const features = [
    {
      title: 'Flexible Classes',
      description:
        'Suspendisse ultrice gravida dictum fusce placerat ultricies integer quis auctor elit sed vulputate mi sit.',
    },
    {
      title: 'Expert Instructors',
      description:
        'Suspendisse ultrice gravida dictum fusce placerat ultricies integer quis auctor elit sed vulputate mi sit.',
    },
  ]

  return (
    <div className="container flex flex-col lg:flex-row items-center mt-5 lg:mt-20 mb-16 lg:mb-20">
      {/* Left Image */}
      <img className="w-full" src={skillImg1} alt="Skill Illustration" />

      {/* Right Content */}
      <div className="relative lg:pl-16 lg:mt-0 mt-5">
        <h5 className="text-xs lg:text-sm bg-purple-100 px-5 py-1 inline-block text-[--primary] uppercase rounded-full mb-2">
          Our About Us
        </h5>

        {/* Circle Decoration */}
        <div className="absolute top-6 right-52">
          <img
            className="hidden lg:block lg:w-28 w-36 lg:h-16 h-10"
            src={textCircle}
            alt="Decoration"
          />
        </div>

        {/* Title + Description */}
        <InfoTitle
          heading="Learn & Grow your skills From anywhere"
          description="Are you interested to be a part of our community? You can be a part of our community by signing up as an instructor or organization. You can be a part of our community by signing up as an instructor or organization."
        />

        {/* Features List */}
        <div className="flex mt-3 gap-4 lg:mt-5">
          {features.map((item, i) => (
            <div key={i}>
              <h5 className="text-md text-gray-600 font-bold uppercase">
                {item.title}
              </h5>
              <p className="lg:text-md text-sm mt-3 lg:leading-7 md:leading-7">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="flex flex-col w-fit h-0 lg:h-fit lg:flex-row gap-5 lg:mt-10 mt-5">
          <a href="/about">
            <Button className="bg-[--primary] flex items-center rounded-full text-white hover:bg-[--primary]/90">
              <span className="py-1 lg:py-2 pl-3 lg:pl-5 text-sm lg:text-md">
                Load More
              </span>
              <ArrowRight className="lg:w-full w-7 h-7 p-1.5 lg:p-2.5 bg-[#644BFF] rounded-full ml-3" />
            </Button>
          </a>
        </div>

        {/* Star Decoration */}
        <div className="absolute -bottom-10 right-0">
          <img
            className="w-8 lg:w-16 h-8 lg:h-16"
            src={starImg}
            alt="Star Icon"
          />
        </div>
      </div>
    </div>
  )
}

export default GrowSkills
