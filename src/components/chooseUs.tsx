import React from 'react'
import InfoTitle from './infoTitle'
import { Button } from './ui/button'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import skillImg1 from '@assets/custom-image/skillImg.png'
import lineImg from '@assets/custom-image/line-bg.png'
import chooseImg from '@assets/custom-image/choose-img.png'
import textCircle from '@assets/custom-image/textCircle.png'

const ChooseUs: React.FC = () => {
  return (
    <div className="container flex flex-col lg:flex-row items-center mt-2 lg:mt-20 mb-10">
      <div className="relative lg:pr-24 lg:mt-0 mt-5">
        <h5 className="text-xs lg:text-sm bg-purple-100 px-5 py-1 inline-block text-[--primary] uppercase rounded-full mb-2">
          WHY CHOOSE US
        </h5>

        <div className="lg:block hidden absolute top-20 -left-3">
          {/* Nếu bỏ Next.js, đổi <Image> thành <img> */}
          <img
            className="w-40 h-12"
            alt=""
            width={400}
            height={300}
            src={textCircle}
          />
        </div>

        <InfoTitle
          heading={'Creating A Community Of Life Long Learners.'}
          description={
            'Are you interested to be a part of our community? You can be a part of our community by signing up as an instructor or organization.You can be a part of our community by signing up as an instructor or organization.'
          }
        />

        <div className="flex flex-wrap gap-4 lg:mt-7">
          {[
            {
              title: 'World Class Trainers',
              text: 'Suspendisse ultrice gravida dictum fusce placerat ultricies integer quis auctor elit sed vulputate mi sit.',
            },
            {
              title: 'Easy Learning',
              text: 'Suspendisse ultrice gravida dictum fusce placerat ultricies integer quis auctor elit sed vulputate mi sit.',
            },
            {
              title: 'Flexible',
              text: 'Suspendisse ultrice gravida dictum fusce placerat ultricies integer quis auctor elit sed vulputate mi sit.',
            },
            {
              title: 'Affordable Price',
              text: 'Suspendisse ultrice gravida dictum fusce placerat ultricies integer quis auctor elit sed vulputate mi sit.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-3 rounded-md w-full sm:w-[48%]"
            >
              <h5 className="text-md text-gray-600 font-bold flex items-center mb-3">
                <CheckCircle2 className="w-4 h-4 mr-1 text-[--primary]" />
                {item.title}
              </h5>
              <p className="text-sm text-gray-500">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="absolute top-1 lg:top-3 right-5 lg:right-20">
          <img className="w-20 h-5" alt="" src={lineImg} />
        </div>
      </div>

      <img className="w-fit" alt="" src={chooseImg} />
    </div>
  )
}

export default ChooseUs
