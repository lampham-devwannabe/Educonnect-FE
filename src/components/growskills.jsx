import React from 'react'
import InfoTitle from './infoTitle'
import Image from 'next/image'
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import skillImg1 from '../../public/assets/custom-image/skillImg.png';
import starImg from '../../public/assets/custom-image/starImg.png';
import textCircle from '../../public/assets/custom-image/textCircle.png';
import Link from 'next/link';

const GrowSkills = () => {
    return (
        <div className='container flex flex-col lg:flex-row items-center mt-5 lg:mt-20 mb-16 lg:mb-20'>
            <Image className='w-full' alt='' width={500} height={400} src={skillImg1}></Image>

            <div className='relative lg:pl-16 lg:mt-0 mt-5'>
                <h5 className=" text-xs lg:text-sm bg-purple-100 px-5 py-1 inline-block text-[--primary] uppercase rounded-full mb-2">
                    Our about us
                </h5>
                <div className="absolute  top-6 right-52">
                    <Image className='hidden lg:block lg:w-28 w-36 lg:h-16 h-10' alt='' width={300} height={300} src={textCircle}></Image>
                </div>
                <InfoTitle
                    heading={"Learn & Grow your skills From anywhere"}
                    description={"Are you interested to be a part of our community? You can be a part of our community by signing up as an instructor or organization.You can be a part of our community by signing up as an instructor or organization."}
                >
                </InfoTitle>
                <div className="flex mt-3 gap-4 lg:mt-5">
                    <div>
                        <h5 className='text-md text-gray-600 font-bold uppercase'>Flexible classNamees</h5>
                        <p className='lg:text-md text-sm mt-3 lg:leading-7 md:leading-7'>Suspendisse ultrice gravida dictum
                            fusce placerat ultricies integer quis
                            auctor elit sed vulputate mi sit.</p>
                    </div>
                    <div>
                        <h5 className='text-md text-gray-600 font-bold uppercase'>Flexible classNamees</h5>
                        <p className='lg:text-md text-sm mt-3 lg:leading-7 md:leading-7'>Suspendisse ultrice gravida dictum
                            fusce placerat ultricies integer quis
                            auctor elit sed vulputate mi sit.</p>
                    </div>
                </div>
                <div className='flex flex-col w-fit h-0 lg:h-fit lg:flex-row gap-5 lg:mt-10 mt-5'>
                    <Link href='/about'>
                        <Button className='bg-[--primary] p-0 rounded-full hover:bg-[--primary]  hover:text-white  text-white '><span className='py-1 lg:py-2 pl-3 lg:pl-5 text-sm lg:text-md'>Load More </span><ArrowRight className=' lg:w-full w-7  h-7 lg:h-full text-sm p-1.5 lg:p-2.5 bg-[#644BFF] rounded-full ml-3' /></Button>
                    </Link>

                </div>
                <div className="absolute -bottom-10 right-0">
                    <Image className='w-8 lg:w-16 h-8 lg:h-16' alt='' src={starImg}></Image>
                </div>
            </div>
        </div>
    )
}

export default GrowSkills;