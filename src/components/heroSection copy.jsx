'use client'
import React from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  GraduationCap,
  LucideTvMinimalPlay,
  PenTool,
  SquareUser,
  UsersIcon,
} from 'lucide-react'
import Image from 'next/image'
import heroImg1 from '@assets/hero-image/hero-img.png'
import instructorImg1 from '@assets/instructor-image/instructor1.png'
import instructorImg2 from '@assets/instructor-image/Eftyoffice.jpg'
import instructorImg3 from '@assets/instructor-image/instructor3.png'
import instructorImg4 from '@assets/instructor-image/instructor4.png'
import bgImg1 from '@assets/bg-image/bg-img1.png'
import arrowImg from '@assets/bg-image/arrow.png'

const HeroSection = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className=" hero-img-bg bg-purple-50 relative overflow-hidden w-full mt-[0px] z-0 ">
      <div className="container mx-auto sm:px-8 lg:px-8">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.div
            className="w-full order-2 lg:order-1 lg:w-1/2 lg:pr-36 relative"
            variants={fadeInUp}
          >
            <h5 className=" uppercase text-xs lg:text-sm text-[--primary] ">
              Welcome Smart academy online courses
            </h5>
            <h1 className="text-2xl sm:text-2xl lg:text-4xl xl:text-5xl font-bold text-gray-900">
              Achieving Your Dreams Through Education
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-6 lg:mt-5 mt-5 ">
              We are experienced in educationl platform and skilled strategies
              for the success of our online learning.
            </p>
            <div className="p-5 pr-10  absolute rounded-md bottom-0 lg:-top-10 lg:-right-60 -z-10">
              <Image className="w-72" src={bgImg1} alt="instructorImg" />
            </div>

            <div className="p-3 lg:p-5 pr-4 lg:pr-10 bg-white lg:absolute rounded-md -bottom-12 lg:-right-24">
              <h5 className="text-xl mb-2">
                <span className="text-[--primary]">200+</span> Instructor
              </h5>
              <div className="flex -space-x-3 ">
                <Image
                  className="w-8 h-8 rounded-full"
                  src={instructorImg1}
                  alt="instructorImg"
                />
                <Image
                  className="w-8 h-8 rounded-full"
                  src={instructorImg2}
                  alt="instructorImg"
                />
                <Image
                  className="w-8 h-8 rounded-full"
                  src={instructorImg3}
                  alt="instructorImg"
                />
                <Image
                  className="w-8 h-8 rounded-full"
                  src={instructorImg4}
                  alt="instructorImg"
                />
                <Image
                  className="w-8 h-8 rounded-full"
                  src={instructorImg1}
                  alt="instructorImg"
                />
              </div>
            </div>

            <motion.div
              className="flex flex-row  flex-end relative rounded-full bg-white p-1 lg:p-1.5 sm:flex-row sm:space-y-0 sm:space-x-4 mt-2 lg:mt-24"
              variants={fadeInUp}
            >
              <input
                className="w-full py-1 lg:py-2 px-2  text-gray-500 text-md rounded-full bg-white focus-visible:outline-none "
                type="text"
                placeholder="Search courses, instructors and organizations..."
              />
              <motion.button
                className="px-2 lg:px-8 text-nowrap py-1 lg:py-2 bg-[--primary] text-white rounded-full transition duration-300 text-sm sm:text-base"
                // whilehover={{ scale: 1.05 }}
                // whileTap={{ scale: 0.95 }}
              >
                Search Now
              </motion.button>
              <div className="absolute rounded-md top-5 -right-6 -z-10">
                <Image
                  className="w-52 lg:w-72"
                  src={arrowImg}
                  alt="instructorImg"
                />
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            className="w-full order-1 lg:order-2 lg:w-1/2 mb-8 lg:mb-0 "
            variants={fadeInUp}
          >
            <Image
              className="w-full cursor-pointer  mx-auto duration-150"
              alt=""
              src={heroImg1}
            ></Image>
          </motion.div>
        </motion.div>
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* <div className=" rounded-lg  sm:py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                title: "Skillful Instructors",
                number: 100,
                desciption: "Start learning from experienced instructors",
                icon: UsersIcon,
                color: "white",
                background: "orange",
              },
              {
                title: "Happy Students",
                number: 5000,
                desciption:
                  "Enrolled in our courses and improved their skills.",
                icon: GraduationCap,
                color: "white",
                background: "orange",
              },
              {
                title: "Live Classes",
                number: 200,
                desciption: "Improve your skills using live knowledge flow.",
                icon: SquareUser,
                color: "white",
                background: "orange",
              },
              {
                title: "Video Courses",
                number: 300,
                desciption:
                  "Learn without any geographical & time limitations.",
                icon: LucideTvMinimalPlay,
                color: "white",
                background: "orange",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="flex flex-col cursor-pointer bg-white items-center text-center p-6 rounded-2xl transition-all duration-300"
                whilehover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)",
                  // backgroundColor: `var(--${item.color}-100)`,
                }}
              >
                <div className={`hexagon-wrapper  rounded-2xl`}>
                  <div className="hexagon">
                    <item.icon
                      className={`h-8 w-8 sm:h-20 sm:w-20  text-white`}
                    ></item.icon>
                  </div>
                </div>
                <h4 className="font-bold text-4xl mb-2">{item.number}</h4>
                <h3 className="font-semibold text-base sm:text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {item.desciption}
                </p>
              </motion.div>
            ))}
          </div> */}
        </motion.div>
      </div>
    </div>
  )
}

export default HeroSection
