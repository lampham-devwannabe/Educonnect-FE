import React from 'react'
import InfoTitle from './infoTitle'
import Image from 'next/image'
import { Button } from './ui/button'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import skillImg1 from '../../public/assets/custom-image/skillImg.png'
import lineImg from '../../public/assets/custom-image/line-bg.png'
import chooseImg from '../../public/assets/custom-image/choose-img.png'
import textCircle from '../../public/assets/custom-image/textCircle.png'

const ChooseUs = () => {
  return (
    <div className="container flex flex-col lg:flex-row items-center mt-2 lg:mt-20 mb-10">
      <div className="relative lg:pr-24 lg:mt-0 mt-5">
        <h5 className="text-xs lg:text-sm bg-purple-100 px-5 py-1 inline-block text-[--primary] uppercase rounded-full mb-2">
          WHY CHOOSE US
        </h5>
        <div className="lg:block hidden absolute top-20 -left-3">
          <Image
            className="w-40 h-12"
            alt=""
            width={400}
            height={300}
            src={textCircle}
          ></Image>
        </div>
        <InfoTitle
          heading={'Creating A Community Of Life Long Learners.'}
          description={
            'Are you interested to be a part of our community? You can be a part of our community by signing up as an instructor or organization.You can be a part of our community by signing up as an instructor or organization.'
          }
        ></InfoTitle>
        <div className="flex flex-wrap gap-4 lg:mt-7">
          <div className="bg-gray-50 p-3 rounded-md w-full sm:w-[48%]">
            <h5 className="text-md text-gray-600 font-bold flex items-center mb-3">
              <CheckCircle2 className="w-4 h-4 mr-1 text-[--primary] "></CheckCircle2>{' '}
              World className Trainers
            </h5>
            <p className="text-sm text-gray-500">
              Suspendisse ultrice gravida dictum fusce placerat ultricies
              integer quis auctor elit sed vulputate mi sit.
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md w-full sm:w-[48%]">
            <h5 className="text-md text-gray-600 font-bold flex items-center mb-3">
              <CheckCircle2 className="w-4 h-4 mr-1 text-[--primary] "></CheckCircle2>{' '}
              Easy Learning
            </h5>
            <p className="text-sm text-gray-500">
              Suspendisse ultrice gravida dictum fusce placerat ultricies
              integer quis auctor elit sed vulputate mi sit.
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md w-full sm:w-[48%]">
            <h5 className="text-md text-gray-600 font-bold flex items-center mb-3">
              <CheckCircle2 className="w-4 h-4 mr-1 text-[--primary] "></CheckCircle2>{' '}
              Flexible
            </h5>
            <p className="text-sm text-gray-500">
              Suspendisse ultrice gravida dictum fusce placerat ultricies
              integer quis auctor elit sed vulputate mi sit.
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md w-full sm:w-[48%]">
            <h5 className="text-md text-gray-600 font-bold flex items-center mb-3">
              <CheckCircle2 className="w-4 h-4 mr-1 text-[--primary] "></CheckCircle2>{' '}
              Affordable Price
            </h5>
            <p className="text-sm text-gray-500">
              Suspendisse ultrice gravida dictum fusce placerat ultricies
              integer quis auctor elit sed vulputate mi sit.
            </p>
          </div>
        </div>
        <div className="absolute top-1 lg:top-3 right-5 lg:right-20">
          <Image className="w-20 h-5" alt="" src={lineImg}></Image>
        </div>
      </div>
      <Image className="w-fit" alt="" src={chooseImg}></Image>
    </div>
  )
}

export default ChooseUs
