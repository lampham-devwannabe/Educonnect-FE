import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  LucideTvMinimalPlay,
  SquareUser,
  Users as UsersIcon,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// Import ảnh bình thường trong React
import heroImg1 from '@assets/hero-image/hero-img.png'
import instructorImg1 from '@assets/instructor-image/instructor1.png'
import instructorImg2 from '@assets/instructor-image/Eftyoffice.jpg'
import instructorImg3 from '@assets/instructor-image/instructor3.png'
import instructorImg4 from '@assets/instructor-image/instructor4.png'
import bgImg1 from '@assets/bg-image/bg-img1.png'
import arrowImg from '@assets/bg-image/arrow.png'

const HeroSection: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const stagger = {
    animate: { transition: { staggerChildren: 0.1 } },
  }

  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/courselist?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="hero-img-bg bg-purple-50 relative overflow-hidden w-full mt-0 z-0">
      <div className="container mx-auto sm:px-8 lg:px-8">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          {/* Left Content */}
          <motion.div
            className="w-full order-2 lg:order-1 lg:w-1/2 lg:pr-36 relative"
            variants={fadeInUp}
          >
            <h5 className="uppercase text-xs lg:text-sm text-[--primary]">
              Welcome Smart academy online courses
            </h5>
            <h1 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-gray-900">
              Achieving Your Dreams Through Education
            </h1>
            <p className="text-base text-gray-600 mb-6 mt-5">
              We are experienced in educational platform and skilled strategies
              for the success of our online learning.
            </p>

            <div className="absolute bottom-0 lg:-top-10 lg:-right-60 -z-10">
              <img className="w-72" src={bgImg1} alt="bg" />
            </div>

            {/* Instructor block */}
            <div className="p-3 lg:p-5 bg-white lg:absolute rounded-md -bottom-12 lg:-right-24">
              <h5 className="text-xl mb-2">
                <span className="text-[--primary]">200+</span> Instructor
              </h5>
              <div className="flex -space-x-3">
                {[
                  instructorImg1,
                  instructorImg2,
                  instructorImg3,
                  instructorImg4,
                ].map((img, i) => (
                  <img
                    key={i}
                    className="w-8 h-8 rounded-full"
                    src={img}
                    alt="instructor"
                  />
                ))}
              </div>
            </div>

            {/* Search */}
            <motion.div
              className="flex flex-row relative rounded-full bg-white p-1 mt-2 lg:mt-24"
              variants={fadeInUp}
            >
              <input
                className="w-full py-2 px-3 text-gray-500 rounded-full focus:outline-none"
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <motion.button
                className="px-4 lg:px-8 py-2 bg-[--primary] text-white rounded-full text-sm"
                onClick={handleSearch}
              >
                Search Now
              </motion.button>
              <div className="absolute top-5 -right-6 -z-10">
                <img className="w-52 lg:w-72" src={arrowImg} alt="arrow" />
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="w-full order-1 lg:order-2 lg:w-1/2 mb-8 lg:mb-0"
            variants={fadeInUp}
          >
            <img
              className="w-full mx-auto cursor-pointer"
              src={heroImg1}
              alt="Hero"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default HeroSection
