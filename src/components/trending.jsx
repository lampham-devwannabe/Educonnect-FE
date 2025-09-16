'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import {
  Brain,
  BriefcaseBusiness,
  HeartPulse,
  Lightbulb,
  LucideTvMinimalPlay,
  Users2,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const Trending = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCategory = async () => {
      try {
        const formdata = new FormData()
        formdata.set('page', 1)
        formdata.set('pagination', 5)
        const res = await fetch('api/category', {
          method: 'POST',
          body: formdata,
        })
        const data = await res.json()
        console.log(data.data)
        setCategories(data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    getCategory()
  }, [])
  return (
    <div className="w-full ">
      <div
        className="lg:mt-16 mt-0 container mx-auto px-8 py-8"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="lg:flex justify-between items-center text-left  lg:pt-10 pt-0 pb-10">
          <div>
            <h1 className="font-bold text-4xl text-primary">Categories</h1>
            <h5 className="text-lg mt-2 text-gray-600">
              #Browse trending & popular learning topics
            </h5>
          </div>
        </div>
        <div className=" rounded-lg  sm:py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map(category => (
            <div key={category._id} category={category}>
              <motion.div
                className="flex flex-col cursor-pointer bg-white items-center text-center p-6 rounded-2xl transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.3)',
                }}
              >
                <div className={`hexagon-wrapper  rounded-2xl`}>
                  <div className="hexagon items-center ">
                    {
                      <Image
                        src={category.image}
                        alt=""
                        width={300}
                        height={300}
                        className="z-50 rounded-md"
                      ></Image>
                    }
                  </div>
                </div>
                <h4 className="font-bold text-4xl mb-2"></h4>
                <h3 className="font-semibold text-base sm:text-lg mb-2">
                  {category.categoryName}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {category.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Trending

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
// 	BookOpen,
// 	GraduationCap,
// 	LucideTvMinimalPlay,
// 	PenTool,
// 	SquareUser,
// 	UsersIcon,
// } from "lucide-react";
// import Image from "next/image";
// import heroImg1 from "../../public/assets/hero-image/hero-img.png";

// const HeroSection = () => {
// 	const [categories, setCategories] = useState([]);

// 	useEffect(()=>{
// 		const getCategory = async ()=>{
// 			try{
// 				const formData = new FormData();
// 			formData.set("page", 1);
// 			formData.set("page", 5);
// 			const res = await fetch("api/category",{
// 				method:"POST",
// 				body: formData
// 			});
// 			const data = await res.json();
// 			console.log("Category data", data);
// 			setCategories(data.data);
// 			} catch (error) {
// 				console.error("Error fetching category data:", error)
// 			}
// 		};
// 		getCategory();
// 	},[])

// 	const fadeInUp = {
// 		initial: { opacity: 0, y: 60 },
// 		animate: { opacity: 1, y: 0 },
// 		transition: { duration: 0.6 },
// 	};

// 	const stagger = {
// 		animate: {
// 			transition: {
// 				staggerChildren: 0.1,
// 			},
// 		},
// 	};

// 	return (
// 		<div className="relative overflow-hidden w-full">
// 			<div className="container mx-auto sm:px-8 lg:px-8 py-12">
// 				<motion.div
// 					className="flex flex-col lg:flex-row items-center justify-between"
// 					initial="initial"
// 					animate="animate"
// 					variants={stagger}>
// 					<motion.div className="w-full lg:w-1/2 lg:pr-12" variants={fadeInUp}>
// 						<h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6">
// 							Joy of learning & teaching...
// 						</h1>
// 						<p className="text-base sm:text-lg text-gray-600 mb-6 mt-10 ">
// 							Rocket LMS is a fully-featured educational platform that helps
// 							instructors to create and publish videoe courses, live classes,
// 							and text courses and earnee money, and helps students to learn in
// 							the easiest learn in way.
// 						</p>
// 						{/* <motion.div className="flex items-center mb-8" variants={fadeInUp}>
// 							<div className="flex -space-x-2 mr-4">
// 								{[...Array(4)].map((_, i) => (
// 									<motion.img
// 										key={i}
// 										className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white"
// 										// src={`/placeholder.svg?height=40&width=40&text=${i + 1}`}
// 										src="https://avatars.githubusercontent.com/u/37795928?v=4"
// 										alt={`User ${i + 1}`}
// 										whileHover={{ scale: 1.1 }}
// 									/>
// 								))}
// 							</div>
// 							<div>
// 								<span className="font-bold text-xl sm:text-2xl">18k+</span>
// 								<p className="text-xs sm:text-sm text-gray-600">
// 									Individual User
// 								</p>
// 							</div>
// 						</motion.div> */}
// 						<motion.div
// 							className="flex flex-col flex-end rounded-full bg-white p-1.5 sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-24"
// 							variants={fadeInUp}>
// 							<input
// 								className="w-full py-2 px-2 text-gray-500 text-md rounded-full bg-white focus-visible:outline-none "
// 								type="text"
// 								placeholder="Search courses, instructors and organizations..."
// 							/>
// 							<motion.button
// 								className="px-8 py-2 bg-teal-400  text-white rounded-full hover:bg-teal-500 transition duration-300 text-sm sm:text-base"
// 								whileHover={{ scale: 1.05 }}
// 								whileTap={{ scale: 0.95 }}>
// 								Search
// 							</motion.button>
// 						</motion.div>
// 					</motion.div>
// 					<motion.div
// 						className="w-full lg:w-1/2 mt-10 lg:mt-0"
// 						variants={fadeInUp}>
// 						<Image
// 							className="w-full cursor-pointer max-w-lg mx-auto rounded-md hover:scale-105 duration-150" alt=""
// 							src={heroImg1}></Image>
// 					</motion.div>
// 				</motion.div>
// 				<motion.div
// 					className="mt-16"
// 					initial={{ opacity: 0, y: 60 }}
// 					animate={{ opacity: 1, y: 0 }}
// 					transition={{ delay: 0.4, duration: 0.6 }}>
// 					<div className=" rounded-lg  sm:py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
// 						{/* {[
// 							{
// 								title: "Skillful Instructors",
// 								number: 25,
// 								desciption: "Start learning from experienced instructors",
// 								icon: UsersIcon,
// 								color: "white",
// 								background: "orange",
// 							},
// 							{
// 								title: "Happy Students",
// 								number: 45,
// 								desciption:
// 									"Enrolled in our courses and improved their skills.",
// 								icon: GraduationCap,
// 								color: "white",
// 								background: "orange",
// 							},
// 							{
// 								title: "Live Classes",
// 								number: 50,
// 								desciption: "Improve your skills using live knowledge flow.",
// 								icon: SquareUser,
// 								color: "white",
// 								background: "orange",
// 							},
// 							{
// 								title: "Video Courses",
// 								number: 20,
// 								desciption:
// 									"Learn without any geographical & time limitations.",
// 								icon: LucideTvMinimalPlay,
// 								color: "white",
// 								background: "orange",
// 							},
// 						].map((item, index) => (
// 							<motion.div
// 								key={item.title}
// 								className="flex flex-col cursor-pointer bg-white items-center text-center p-6 rounded-2xl transition-all duration-300"
// 								whileHover={{
// 									scale: 1.05,
// 									boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)",
// 									// backgroundColor: `var(--${item.color}-100)`,
// 								}}>
// 								<div className={`hexagon-wrapper  rounded-2xl`}>
// 									<div className="hexagon">
// 										<item.icon
// 											className={`h-8 w-8 sm:h-20 sm:w-20  text-white`}></item.icon>
// 									</div>
// 								</div>
// 								<h4 className="font-bold text-4xl mb-2">{item.number}</h4>
// 								<h3 className="font-semibold text-base sm:text-lg mb-2">
// 									{item.title}
// 								</h3>
// 								<p className="text-xs sm:text-sm text-gray-600">
// 									{item.desciption}
// 								</p>
// 							</motion.div>
// 						))} */

// 						categories.map( category =>(
// 							<div key={category._id} category = {category}>
// 								<motion.div

// 								className="flex flex-col cursor-pointer bg-white items-center text-center p-6 rounded-2xl transition-all duration-300"
// 								whileHover={{
// 									scale: 1.05,
// 									boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)",
// 									// backgroundColor: `var(--${item.color}-100)`,
// 								}}>
// 								<div className={`hexagon-wrapper  rounded-2xl`}>
// 									<div className="hexagon">
// 										<category.image
// 											className={`h-8 w-8 sm:h-20 sm:w-20  text-white`}></category.image>
// 									</div>
// 								</div>
// 								<h4 className="font-bold text-4xl mb-2"></h4>
// 								<h3 className="font-semibold text-base sm:text-lg mb-2">
// 									{category.categoryName}
// 								</h3>
// 								<p className="text-xs sm:text-sm text-gray-600">
// 									{/* {item.desciption} */}
// 									description
// 								</p>
// 							</motion.div>
// 							</div>
// 						))

// 						}
// 					</div>
// 				</motion.div>
// 			</div>
// 		</div>
// 	);
// };

// export default HeroSection;
