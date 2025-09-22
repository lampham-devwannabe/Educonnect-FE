import React from 'react'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import joinImg from '../assets/custom-image/join-img.png'
import starImg from '../assets/custom-image/starImg.png'
const JoinUs = () => {
  return (
    <div className=" bg-gradient-to-r from-cyan-600 to-blue-900 w-full">
      <div className="container flex flex-col lg:flex-row items-center mt-16 mb-16">
        {/* Join Image */}
        <img className="w-fit rounded-md" src={joinImg} alt="Join Us" />

        {/* Content */}
        <div className="relative lg:pl-16 lg:pr-16 lg:mt-0 mt-10">
          <h5 className="text-xs lg:text-sm bg-purple-100 px-5 py-1 inline-block text-[--primary] uppercase rounded-full mb-2">
            Let’s Join With Us
          </h5>
          <h4 className="text-white text-2xl lg:text-4xl font-bold">
            Become an Instructor and Join With Us
          </h4>
          <p className="text-gray-200 lg:text-lg text-sm mt-3 lg:leading-7 md:leading-7">
            This includes offering personalized feedback, fostering a sense of
            community through discussion forums and group projects, and
            providing continuous support to address challenges and improve.
          </p>

          {/* Button */}
          <div className="flex flex-col h-8 lg:h-fit lg:flex-row gap-5 lg:mt-10 mt-5">
            <a href="/contact">
              <Button className="w-fit bg-[--primary] p-0 rounded-full hover:bg-[--primary] hover:text-white text-white">
                <span className="py-0 lg:py-2 pl-5">Start Teaching Today</span>
                <ArrowRight className="w-8 h-8 lg:w-full lg:h-full text-sm p-1.5 lg:p-2.5 bg-[#644BFF] rounded-full ml-3" />
              </Button>
            </a>
          </div>

          {/* Star Icon */}
          <div className="absolute -bottom-10 right-0">
            <img
              className="w-10 lg:w-20 h-10 lg:h-20"
              src={starImg}
              alt="Star Icon"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default JoinUs
