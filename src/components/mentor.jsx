"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CircleArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "./ui/card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// function RatingStars({ rating }) {
// 	return (
// 		<div className="flex items-center justify-center mt-2">
// 			{[1, 2, 3, 4, 5].map((star) => (
// 				<Star
// 					key={star}
// 					className={`w-4 h-4 ${
// 						star <= Math.round(rating)
// 							? "text-yellow-400 fill-current"
// 							: "text-gray-300"
// 					}`}
// 				/>
// 			))}
// 			<span className="ml-1 text-sm px-2 bg-cyan-400 rounded-md text-white">{rating.toFixed(1)}</span>
// 		</div>
// 	);
// }

const RatingStars = ({ rating }) => {
	return (
	  <div className="flex items-center justify-center mt-2">
		{[1, 2, 3, 4, 5].map((star) => (
		  <Star
			key={star}
			className={`w-5 h-5 mr-1 ${
			  star <= Math.round(rating)
				? "text-yellow-400 fill-current"
				: "text-gray-300"
			}`}
		  />
		))}
		<span className="ml-1 text-sm px-2 bg-cyan-400 rounded-md text-white">
		  {rating.toFixed(1)}
		</span>
	  </div>
	);
  };

const TopMentors = () => {
	var settings = {
		autoplay: true, 
		autoplaySpeed: 2000, 
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
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
			}
		  },
		  {
			breakpoint: 600,
			settings: {
			  slidesToShow: 2,
			  slidesToScroll: 2,
			  initialSlide: 2
			}
		  },
		  {
			breakpoint: 480,
			settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1
			}
		  }
		]
	  };
	const [mentors, setMentors] = useState([]);
	const [hoveredId, setHoveredId] = useState(null);

	useEffect(() => {
		const getMentors = async () => {
			try {
				const formdata = new FormData();
				formdata.set("page", "1");
				formdata.set("pagination", "5");
				formdata.set("role", "instructor");
				const res = await fetch("/api/user", {
					method: "POST",
					body: formdata,
				});

				const data = await res.json();
				setMentors(data.data);
			} catch (error) {
				console.error("Error fetching mentor data:", error);
			}
		};

		getMentors();
	}, []);

	return (
		<section className="w-full  py-8 sm:py-12">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
					<h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
						<span className="border-b-2 border-indigo-600 pb-1">
							TOP MENTORS
						</span>
					</h2>
					<Link
						href="/mentorlist"
						className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300 flex items-center text-sm sm:text-base">
						See All
						<CircleArrowRight className="ml-1 w-4 h-4 sm:w-5 sm:h-5" />
					</Link>
				</div>


				<div className="slider-container">
					<Slider {...settings}>
							{
								mentors.length === 0
								? Array(5)
										.fill(0)
										.map((_, index) => (
											<Skeleton
												key={index}
												className="h-[300px] w-full rounded-lg"
											/>
										))
								: mentors.map((mentor) => ( <>
									<Card className="w-full rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl">
							<Link href="">
								<CardHeader className=" items-center ">
									<div className="">
										<Image
										src={mentor.image}
										alt=""
										className=" w-28 h-28   object-cover rounded-full"
										width={300}
										height={450}
									/>
									</div>
								</CardHeader>
								<CardContent className=" pb-4 px-4 text-center">
								<h3 className="text-lg font-bold text-primary truncate">
									{mentor.name}
								</h3>
								<div className="mt-2">
									<h3 className="text-center">{mentor.profession}</h3>
								</div>
								<div className="items-center mt-3">
									<RatingStars rating={5.3}></RatingStars>
								</div>
								
								<div className=" mt-4 text-gray-600 ">
									<button className=" w-fit px-4 text-md py-1 mt-3 mb-4 bg-cyan-400 rounded-full text-white font-semibold hover:scale-105 duration-200">Reserve a live meeting</button>
								</div>
								</CardContent>
							</Link>
						</Card>
								</> ))
							}

						{/*  */}
					</Slider>
				</div>





				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-6">

					{/* {mentors.length === 0
						? Array(5)
								.fill(0)
								.map((_, index) => (
									<Skeleton
										key={index}
										className="h-[300px] w-full rounded-lg"
									/>
								))
						: mentors.map((mentor) => (
								<motion.div
									key={mentor._id}
									className="bg-white rounded-lg shadow-md overflow-hidden"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3 }}
									whilehover={{ scale: 1.03 }}
									onHoverStart={() => setHoveredId(mentor._id)}
									onHoverEnd={() => setHoveredId(null)}>
									<Link
										href={`/mentor/details?id=${mentor._id}`}
										className="block h-full">
										<div className="p-4 flex flex-col h-full">
											<div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4">
												<Image
													src={mentor.image}
													alt={mentor.name}
													layout="fill"
													objectFit="cover"
													className="rounded-full"
												/>
											</div>
											<h3 className="font-semibold text-base sm:text-lg text-center mb-1 truncate">
												{mentor.name}
											</h3>
											<p className="text-gray-600 text-xs sm:text-sm text-center mb-2">
												{mentor.profession || "Profession"}
											</p>
											<RatingStars rating={mentor.rating || 4.5} />
											<div className="flex flex-wrap justify-center gap-2 mt-3">
												{["Web", "UI/UX", "Design"].map((skill, index) => (
													<motion.span
														key={index}
														className="px-2 py-1 bg-gray-100 text-teal-900 text-xs font-semibold rounded-full"
														initial={{ opacity: 0, scale: 0.8 }}
														animate={{
															opacity: hoveredId === mentor._id ? 1 : 0.8,
															scale: 1,
														}}
														transition={{ duration: 0.2, delay: index * 0.1 }}>
														{skill}
													</motion.span>
												))}
											</div>
										</div>
									</Link>
								</motion.div>
						  ))} */}


							
									
						
						
						

							 
				</div> 
				
			</div>
	
		</section>
	);
};

export default TopMentors;
