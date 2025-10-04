import React from 'react'
import InfoTitle from './infoTitle'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'

import skillImg1 from '@assets/custom-image/skillImg.png'
import starImg from '@assets/custom-image/starImg.png'
import textCircle from '@assets/custom-image/textCircle.png'
import { useTranslation } from 'react-i18next'

const GrowSkills: React.FC = () => {
  const { t } = useTranslation()
  const features = [
    {
      title: t('GrowSkills_intro1_title'),
      description: t('GrowSkills_intro1_desc'),
    },
    {
      title: t('GrowSkills_intro2_title'),
      description: t('GrowSkills_intro2_desc'),
    },
  ]

  return (
    <div className="container flex flex-col lg:flex-row items-center mt-5 lg:mt-20 mb-16 lg:mb-20">
      {/* Left Image */}
      <img className="w-full" alt="" width={500} height={400} src={skillImg1} />

      {/* Right Content */}
      <div className="relative lg:pl-16 lg:mt-0 mt-5">
        <h5 className="text-xs lg:text-sm bg-purple-100 px-5 py-1 inline-block text-[--primary] uppercase rounded-full mb-2">
          {t('aboutUs')}
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
          heading={t('GrowSkills_intro3_title')}
          description={t('GrowSkills_intro3_desc')}
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
            <Button className="bg-[--primary] p-0 rounded-full hover:bg-[--primary]  hover:text-white  text-white ">
              <span className="py-1 lg:py-2 pl-3 lg:pl-5 text-sm lg:text-md">
                {t('loadMore')}
              </span>
              <ArrowRight className="lg:w-full w-7  h-7 lg:h-full text-sm p-1.5 lg:p-2.5 bg-[#644BFF] rounded-full ml-3" />
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
