import React, { useState } from 'react'
import { ArrowRight, Play, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import ReactPlayer from 'react-player'

const VideoSection: React.FC = () => {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <div className="video-img-bg">
      <div className="w-full h-full bg-[#0E2A46] bg-opacity-[80%] z-10 mb-8 lg:mb-44">
        <div className="container mx-auto h-full">
          <div className="lg:grid lg:grid-flow-col lg:grid-cols-2 items-center h-full">
            <div className="relative lg:pl-16 lg:mt-0 lg:pt-0 pt-10">
              <h5 className="text-xs lg:text-sm bg-purple-100 px-5 py-1 inline-block text-[--primary] uppercase rounded-full mb-2">
                Our about us
              </h5>
              <h4 className="text-white text-xl lg:text-3xl font-bold">
                🎉 40% OFF for the First 100 Customers!
              </h4>
              <p className="text-gray-300 lg:text-lg text-sm mt-3 lg:leading-7 md:leading-7">
                Be among the first 100 to grab this exclusive deal and save 40%
                on your purchase. Don't miss out—once the slots are gone, the
                offer ends! 🚀
              </p>

              <div className="flex flex-col w-fit lg:flex-row gap-5 lg:mt-10 mt-5">
                <Link to="/about">
                  <Button className="h-8 lg:h-full bg-[--primary] p-0 rounded-full hover:bg-[--primary] hover:text-white text-white">
                    <span className="lg:py-2 pl-5">Join With Us </span>
                    <ArrowRight className="w-fit lg:w-full h-7 lg:h-full text-sm p-1.5 lg:p-2.5 bg-[#644BFF] rounded-full ml-3" />
                  </Button>
                </Link>
                <Link to="/courselist">
                  <Button className="h-8 lg:h-full bg-[--secondary] p-0 rounded-full hover:bg-[--secondary] hover:text-white text-white">
                    <span className="py-2 pl-5">Our Courses </span>
                    <ArrowRight className="w-fit lg:w-full h-7 lg:h-full text-sm p-1.5 lg:p-2.5 bg-[--secondary-foreground] rounded-full ml-3" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="absolute lg:right-[30%] right-[50%] bottom-[16%] lg:bottom-[44%]">
              <button
                onClick={() => setShowVideo(true)}
                className="focus:outline-none"
              >
                <div className="relative p-2 lg:p-4 bg-gray-300 bg-opacity-20 rounded-full group">
                  <div className="bg-white p-2 lg:p-4 rounded-full group-hover:bg-[--secondary]">
                    <Play className="w-5 h-5 fill-[--secondary] text-[--secondary] group-hover:text-white"></Play>
                    <div className="absolute bg-gray-300 bg-opacity-20 w-8 h-8 lg:w-10 lg:h-10 rounded-full -bottom-3 right-0"></div>
                    <div className="absolute border-[1px] border-gray-300 border-opacity-20 w-6 h-6 lg:w-10 lg:h-10 rounded-full -bottom-7 lg:-bottom-10 right-0"></div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative pt-[56.25%]">
              <ReactPlayer
                src="https://youtu.be/6lwh_jfLn2g"
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: 0, left: 0 }}
                playing
                controls
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoSection
