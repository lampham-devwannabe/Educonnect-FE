'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Star,
  ArrowRight,
  ArrowLeft,
  Calendar,
  MessagesSquare,
} from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import InfoTitle from './infoTitle'
import { Button } from './ui/button'
import Slider from 'react-slick'

interface Post {
  _id: string
  title: string
  image: string[]
  createdAt: string
}

interface RatingStarsProps {
  rating: number
}

interface MostPopularPostProps {
  user?: any
}

const MostPopularPost: React.FC<MostPopularPostProps> = () => {
  const sliderRef = useRef<Slider>(null)

  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    arrows: false,
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

  const [post, setPost] = useState<Post[]>([])

  useEffect(() => {
    const getPosts = async (): Promise<void> => {
      try {
        const formData = new FormData()
        formData.set('page', '1')
        formData.set('pagination', '4')
        const res = await fetch('api/post-feed/list', {
          method: 'POST',
          body: formData,
        })
        const postData = await res.json()
        console.log(postData.data)
        setPost(postData.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    getPosts()
  }, [])

  const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
    return (
      <div className="flex items-center justify-left mt-2">
        {[1, 2, 3, 4, 5].map((star: number) => (
          <Star
            key={star}
            className={`w-4 h-4 mr-1 ${
              star <= Math.round(rating)
                ? 'text-[#FC6441] fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className=" text-sm px-2  text-gray-700">
          {rating.toFixed(1)}k
        </span>
      </div>
    )
  }

  return (
    <div className=" w-full ">
      <div className="container mx-auto px-8 py-8 ">
        <div className="lg:flex justify-between items-center text-left  lg:pt-10 pt-0 pb-10">
          <div className="relative w-full lg:w-1/2 lg:pr-20">
            <h5 className="text-sm bg-purple-50 px-5 py-1 inline-block text-[--primary] uppercase rounded-full mb-2">
              BLOG POST
            </h5>
            <InfoTitle heading={'Most Popular Post.'}></InfoTitle>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/popular-post">
              <button className="text-white bg-[--primary] lg:text-lg text-sm  hover:text-white duration-100 lg:px-5 lg:py-2 px-2 py-1 rounded-full">
                All Blog Post
              </button>
            </Link>
            <div className="flex gap-2 items-center">
              <ArrowLeft
                className=" cursor-pointer text-[--primary] w-7 h-7 lg:w-10 lg:h-10 p-1 border-2 border-[--primary] rounded-full"
                onClick={() => sliderRef.current?.slickPrev()}
              ></ArrowLeft>
              <ArrowRight
                className="cursor-pointer text-[--primary] w-7 h-7 lg:w-10 lg:h-10 p-1 border-2 border-[--primary] rounded-full"
                onClick={() => sliderRef.current?.slickNext()}
              ></ArrowRight>
            </div>
          </div>
        </div>
        <div className="slider-container">
          <Slider ref={sliderRef} {...settings}>
            {post.map((postItem: Post) => (
              <Card
                className="w-full bg-blue-50/25 border-dashed border-[#c5b5ff] rounded-xl overflow-hidden p-5 transition-all duration-300 hover:shadow-xl"
                key={postItem._id}
              >
                <Link
                  href={`/popular-post/page?id=${postItem._id}`}
                  className="flex flex-col justify-between h-full"
                >
                  <CardHeader className="p-0 relative w-[100%] h-[200px]">
                    <Image
                      src={postItem.image[0] || '/assets/placeholder.jpg'}
                      alt="post image"
                      className=" w-full h-full object-cover rounded-lg"
                      width={300}
                      height={450}
                    />
                  </CardHeader>
                  <CardContent className="mt-3 pb-2 px-0">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 mr-1 text-[--primary]"></Calendar>
                        <span>
                          {new Date(postItem.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MessagesSquare className="w-4 mr-1 text-[--primary]"></MessagesSquare>{' '}
                        Comment (06)
                      </div>
                    </div>
                    <h3 className="text-md text-primary mt-3 h-12">
                      {postItem.title?.length > 50
                        ? postItem.title.slice(0, 50) + '...'
                        : postItem.title}
                    </h3>
                    <div className="lg:mt-5 mt-5">
                      <Button className=" h-8 lg:h-full  bg-[#e7e0ff] p-0 rounded-full hover:bg-[#e7e0ff]  hover:text-[--primary]  text-[--primary] ">
                        <span className="py-2 pl-5">Read More</span>
                        <ArrowRight className=" w-full h-full text-sm p-2.5 bg-[#d9ceff] rounded-full ml-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default MostPopularPost
