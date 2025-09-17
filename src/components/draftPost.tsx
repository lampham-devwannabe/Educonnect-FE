import React from 'react'
import { Ellipsis } from 'lucide-react'

const DraftPost: React.FC = () => {
  return (
    <div>
      <h4 className="font-bold text-2xl pb-5">Draft Posts</h4>
      <div className="space-y-5">
        {/* Post item */}
        <div className="relative lg:flex lg:flex-row lg:justify-between lg:gap-10 items-center border p-2 rounded">
          <img
            className="lg:mt-0 rounded w-full lg:w-40 lg:h-30"
            src="/assets/custom-image/course1.png"
            width={200}
            height={200}
            alt="Draft Post"
          />
          <div className="p-2">
            <h5 className="font-semibold lg:text-xl text-lg pb-1">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Repellat, eos?
            </h5>
            <p className="lg:text-base text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
              aliquid quo perspiciatis dignissimos, ea facere modi alias cum non
              molestiae.
            </p>
          </div>
          <div className="absolute top-5 right-5 p-1 lg:static lg:top-auto lg:right-auto bg-white lg:bg-none rounded-sm">
            <Ellipsis className="w-4 h-4 lg:w-6 lg:h-6" />
          </div>
        </div>

        {/* Post item */}
        <div className="relative lg:flex lg:flex-row lg:justify-between lg:gap-10 items-center border p-2 rounded">
          <img
            className="lg:mt-0 rounded w-full lg:w-40 lg:h-30"
            src="/assets/custom-image/course2.png"
            width={200}
            height={200}
            alt="Draft Post"
          />
          <div className="p-2">
            <h5 className="font-semibold lg:text-xl text-lg pb-1">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Repellat, eos?
            </h5>
            <p className="lg:text-base text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
              aliquid quo perspiciatis dignissimos, ea facere modi alias cum non
              molestiae.
            </p>
          </div>
          <div className="absolute top-5 right-5 p-1 lg:static lg:top-auto lg:right-auto bg-white lg:bg-none rounded-sm">
            <Ellipsis className="w-4 h-4 lg:w-6 lg:h-6" />
          </div>
        </div>

        {/* Post item */}
        <div className="relative lg:flex lg:flex-row lg:justify-between lg:gap-10 items-center border p-2 rounded">
          <img
            className="lg:mt-0 rounded w-full lg:w-40 lg:h-30"
            src="/assets/custom-image/course1.png"
            width={200}
            height={200}
            alt="Draft Post"
          />
          <div className="p-2">
            <h5 className="font-semibold lg:text-xl text-lg pb-1">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Repellat, eos?
            </h5>
            <p className="lg:text-base text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
              aliquid quo perspiciatis dignissimos, ea facere modi alias cum non
              molestiae.
            </p>
          </div>
          <div className="absolute top-5 right-5 p-1 lg:static lg:top-auto lg:right-auto bg-white lg:bg-none rounded-sm">
            <Ellipsis className="w-4 h-4 lg:w-6 lg:h-6" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DraftPost
